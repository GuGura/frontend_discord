import {defineStore} from "pinia";
import RestApi from "@/script/axios/jwt/RestApi";
import {useSocketStore} from "@/script/operations/socket";


export const useUserListStore = defineStore("userListStore", () => {

    const socketStore = useSocketStore();


    async function getUserList() {
        const resultUserList = await RestApi.get('/channel/subscription');
        const userList = resultUserList.data;

        const userListFormatted = userList.map(user => ({
            nickname: user.nickname,
            channel_uid: user.channel_uid,
            state: user.state
        }));

        return userListFormatted;
    }

    async function clearUserList() {
        socketStore.channelOnlineUserList.splice(0, socketStore.channelOnlineUserList.length); // 모든 메시지를 삭제합니다.
        socketStore.channelOfflineUserList.splice(0, socketStore.channelOfflineUserList.length); // 모든 메시지를 삭제합니다.
    }


    return{
        getUserList,
        clearUserList,
    };
})