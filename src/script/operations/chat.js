import {defineStore} from "pinia";
import RestApi from "@/script/axios/jwt/RestApi";
import {useSocketStore} from "@/script/operations/socket";


export const useChatStore = defineStore("chatStore", () => {

    const socketStore = useSocketStore();

    async function dbMessageList(roomId) {
        const response = await RestApi.get(`/chat/message/list/${roomId}`);
        return response
    }

    async function clearMessageList() {
        socketStore.messageList.splice(0, socketStore.messageList.length); // 모든 메시지를 삭제합니다.
    }

    return {
        dbMessageList,
        clearMessageList,

    };
});