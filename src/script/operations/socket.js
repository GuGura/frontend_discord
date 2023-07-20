import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import { useUserStore } from "../store/userInfo";
import { useChatStore } from "@/script/operations/chat";
import { useUserListStore } from "@/script/operations/userList";
//소켓에 연결하는 기능
export const useSocketStore = defineStore("socketStore", () => {

    // 헤더 통과용 Email
    const userStore = useUserStore();
    const updateUserEmail = computed(() => {
        return userStore.user.username;
    });
    // 채팅 관련 Store
    const chatStore = useChatStore();
    // 알람 관련 Store
    const userListStore = useUserListStore();


    //소켓 연결
    let ws = reactive(null);    // WebSocket 변수
    let wsConnected = ref(false); // WebSocket 연결 상태 추가
    function connectSocket() {
        let socket = new SockJS("http://localhost:8080/ws");
        ws = Stomp.over(socket);
        const headers = {
            username: updateUserEmail.value,
        };
        ws.connect(headers, connectSuccess, connectFail);
    }

// 연결 성공 시 호출되는 함수
    async function connectSuccess(frame) {
        console.log("호출성공", frame);
        wsConnected.value = true;
        const result = await userListStore.getUserList();
        for (const user of result) {
            if (user.nickname === userStore.getNickname().value) {
                await subscribeToRoom(user.channel_uid);
                const message = {
                    nickname: user.nickname,
                    channel_uid: user.channel_uid,
                    type: user.state,
                };
                sendAlarm(user.nickname, user.channel_uid, user.state, JSON.stringify(message));
            }
        }
    }



    function connectFail() {
        alert("호출 실패");
        wsConnected.value = false;
    }



    let chatSubscription;
    let alarmSubscription;

    async function subscribeToRoom(roomId) {
        await chatStore.clearMessageList();
        await chatStore.dbMessageList(roomId)
            .then((response) => {
                response.data.forEach(message => {
                    receiveMessage(message);
                });
            });
        chatSubscription = ws.subscribe(
            "/sub/chat/room/" + roomId,
            (message) => {
                console.log("구독으로 받은 메시지입니다.", message.body);
                const recv = JSON.parse(message.body);
                receiveMessage(recv);
            },
        );

        alarmSubscription = ws.subscribe(
            "/sub/alarm/" + roomId,
            (alarm) => {
                console.log("알람으로 받은 메세지입니다.", alarm.body);
                const recv = JSON.parse(alarm.body);
                receiveAlarm(recv);
            }
        );
    }

    // 구독을 취소하는 기능
    function unSubscribeToRoom(roomId) {
        if (chatSubscription) {
            console.log("구독 취소  : "+roomId);
            console.log("ddd : ",alarmSubscription)
            chatSubscription.unsubscribe(roomId);
        }
    }
    // 메세지 리스트 저장
    const messageList = reactive([]);
    //메세지 받기
    function receiveMessage(recv) {
        messageList.push({
            type: recv.type,
            sender: recv.sender,
            message: recv.message,
            sendDate: recv.sendDate,
        });
    }
    //메세지 보내기
    function sendMessage(roomId, sender, message) {
        const msg = {
            type: "TALK",
            roomId: roomId,
            userName: updateUserEmail.value,
            sender: sender,
            message: message,
            sendDate: new Date(),
        };
        ws.send("/pub/chat/message", JSON.stringify(msg), {});
    }

    //알람 보내기
    function sendAlarm(nickname, channel_uid, type) {
        const msg = {
            nickname: nickname,
            channel_uid: channel_uid,
            state: type,
        };
        ws.send("/pub/alarm", JSON.stringify(msg), {});
    }
    const channelOnlineUserList = reactive([]);
    const channelOfflineUserList = reactive([]);
    //알람 받기
    function receiveAlarm(recv) {
        if (recv.state === "ENTER") {
            // 온라인 목록에 사용자가 없으면 추가
            const userCheck = channelOnlineUserList.find(user => user.nickname === recv.nickname);
            if (!userCheck) {
                channelOnlineUserList.push({
                    nickname: recv.nickname,
                })
            }
            // 오프라인 목록에서 사용자 삭제
            const offlineUserIndex = channelOfflineUserList.findIndex(user => user.nickname === recv.nickname);
            if (offlineUserIndex !== -1) {
                channelOfflineUserList.splice(offlineUserIndex, 1);
            }
        }
        if (recv.state === "QUIT") {
            // 오프라인 목록에 사용자가 없으면 추가
            const user = channelOfflineUserList.find(user => user.nickname === recv.nickname);
            if (!user) {
                channelOfflineUserList.push({
                    nickname: recv.nickname,
                });
            }
            // 온라인 목록에서 사용자 삭제
            const onlineUserIndex = channelOnlineUserList.findIndex(user => user.nickname === recv.nickname);
            if (onlineUserIndex !== -1) {
                channelOnlineUserList.splice(onlineUserIndex, 1);
            }
        }
    }






    return {
        ws,
        wsConnected,
        connectSocket,
        subscribeToRoom,
        unSubscribeToRoom,
        sendMessage,
        messageList,
        channelOnlineUserList,
        channelOfflineUserList
    };
});
