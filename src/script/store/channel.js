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
        channel_VoiceRoom: []
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

    function createRoomInChannel(props) {
        if (props.room_name === '') {
            // eslint-disable-next-line no-undef
            Swal.fire('방이름을 입력해주세요')
            return
        }
        RestApi.post('/chatRoom/create', props)
            .then(({data}) => {
                const channel = data.data;
                if (channel.room_type === 'Text'){
                    this.channel.channel_TextRoom.splice(0,0, channel)
                    router.push(`/channel/${props.channel_UID}/${channel.room_uid}`).then()
                }
                else if(channel.room_type === 'Voice')
                    this.channel.channel_TextRoom.splice(0, 0, channel)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const router = useRouter()

    async function init(channelUID) {
        console.log("channelUID::")
        if (channelUID === undefined)
            channelUID = useChannelListStore().getPathEndPoint
        this.channel.channel_TextRoom.splice(0, channel.channel_TextRoom.length)
        this.channel.channel_VoiceRoom.splice(0, channel.channel_VoiceRoom.length)
        await RestApi.post(`/chatRoom/${channelUID}`)
            .then(({data}) => {
                data.data.textRoom.forEach(room => {
                    this.channel.channel_TextRoom.push(room)
                })
                data.data.voiceRoom.forEach(room => {
                    this.channel.channel_VoiceRoom.push(room)
                })
                if (router.currentRoute.value.path.split('/')[3] === undefined)
                    router.push(`/channel/${channelUID}/${channel.channel_TextRoom[0].room_uid}`).then(r => console.log(r))

            })
            .catch(err => {
                console.log(err)
            })
    }

    return {
        channel,
        getChannel_UID,
        getChannel_title,
        getChannel_icon_url,
        getChannel_TextRoom,
        getChannel_VoiceRoom,
        createRoomInChannel,
        init,
    }
})