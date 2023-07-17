import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";
import {useChannelListStore} from "@/script/store/channel_list";
import {useRouter} from "vue-router";

export const useChannelStore = defineStore("channelStore", () => {

    const channel = reactive({
        channel_UID: -1,
        channel_title: '',
        channel_icon_url: '',
        channel_TextRoom: [],
        channel_VoiceRoom: [],
        channel_roomName: '',
    })
    let getChannel_UID = () => (computed(() => {
        return channel.channel_UID;
    }))
    let getChannel_title = () => (computed(() => {
        return channel.channel_title;
    }))
    let getChannel_icon_url = () => (computed(() => {
        return channel.channel_icon_url;
    }))
    let getChannel_TextRoom = () => (computed(() => {
        return channel.channel_TextRoom;
    }))
    let getChannel_VoiceRoom = () => (computed(() => {
        return channel.channel_VoiceRoom;
    }))
    let getChannel_RoomName = () => (computed(() => {
        return channel.channel_roomName;
    }))

    function createRoomInChannel(props) {
        if (props.room_name === '') {
            // eslint-disable-next-line no-undef
            Swal.fire('방이름을 입력해주세요')
            return
        }
        RestApi.post('/chatRoom/create', props)
            .then(({data}) => {
                const channel = data.data;
                if (channel.room_type === 'Text') {
                    this.channel.channel_TextRoom.splice(0, 0, channel)
                    router.push(`/channel/${props.channel_UID}/${channel.room_uid}`).then()
                } else if (channel.room_type === 'Voice')
                    this.channel.channel_TextRoom.splice(0, 0, channel)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const router = useRouter()

    async function init(channelUID) {
        console.log("1: ",channelUID)
        channelUID = useChannelListStore().getPathEndPoint
        console.log("2: ",channelUID)
        await RestApi.post(`/chatRoom/${channelUID}`)
            .then(({data}) => {
                this.channel.channel_TextRoom.splice(0, channel.channel_TextRoom.length)
                this.channel.channel_VoiceRoom.splice(0, channel.channel_VoiceRoom.length)
                data.data.textRoom.forEach(room => {
                    this.channel.channel_TextRoom.push(room)
                })
                data.data.voiceRoom.forEach(room => {
                    this.channel.channel_VoiceRoom.push(room)
                })


            })
            .catch(err => {
                console.log(err)
            })
        if (router.currentRoute.value.path.split('/')[3] === undefined) {
            this.channel.channel_roomName = this.channel.channel_TextRoom[0].room_name;
            router.push(`/channel/${channelUID}/${channel.channel_TextRoom[0].room_uid}`).then(r => console.log(r))
        }
    }

    return {
        channel,
        getChannel_UID,
        getChannel_title,
        getChannel_icon_url,
        getChannel_TextRoom,
        getChannel_VoiceRoom,
        createRoomInChannel,
        getChannel_RoomName,
        init,
    }
})