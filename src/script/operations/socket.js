import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import { useUserStore } from "../store/userInfo";
import { useChatStore } from "@/script/operations/chat";
//소켓에 연결하는 기능
export const useSocketStore = defineStore("socketStore", () => {

    // 헤더 통과용 Email
    const userStore = useUserStore();
    const updateUserEmail = computed(() => {
        return userStore.user.username;
    });
    // 채팅 관련 Store
    const chatStore = useChatStore();

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

    function connectSuccess(frame) {
        console.log("호출성공", frame);
        wsConnected.value = true;
    }

    function connectFail() {
        alert("호출 실패");
        wsConnected.value = false;
    }

    // 이전 방 저장용
    let subscription;
    //구독 하는 기능
    async function subscribeToRoom(roomId) {
        await chatStore.clearMessageList();
        await chatStore.dbMessageList(roomId)
            .then((response) => {
                console.log("111111111111111  : " , response);
                response.data.forEach(message => {
                    receiveMessage(message);
                });
            });
        subscription = ws.subscribe(
            "/sub/chat/room/" + roomId,
            (message) => {
                console.log("구독으로 받은 메시지입니다.", message.body);
                const recv = JSON.parse(message.body);
                receiveMessage(recv);
            }
        );
    }
    // 구독을 취소하는 기능
    function unSubscribeToRoom(roomId) {
        if (subscription) {
            console.log("구독 취소  : "+roomId);
            subscription.unsubscribe(roomId);
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




    return {
        ws,
        wsConnected,
        connectSocket,
        subscribeToRoom,
        unSubscribeToRoom,
        sendMessage,
        messageList,
    };
});
