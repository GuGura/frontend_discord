import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";

export const useChannelStore = defineStore("channelStore", () => {

    const channel = reactive({
        channel_UID: -1,
        channel_title: '',
        channel_icon_url: '',
        channel_TextRoom:[],
        channel_VoiceRoom:[]
    })
    let getChannel_UID =()=>(computed(()=>{
        return channel.channel_UID;
    }))
    let getChannel_title =()=>(computed(()=>{
        return channel.channel_title;
    }))
    let getChannel_icon_url =()=>(computed(()=>{
        return channel.channel_icon_url;
    }))
    let getChannel_TextRoom =() =>(computed(()=>{
        return channel.channel_TextRoom;
    }))
    let getChannel_VoiceRoom =() =>(computed(()=>{
        return channel.channel_VoiceRoom;
    }))
    function createRoomInChannel(props){
        if (props.room_name === '') {
            // eslint-disable-next-line no-undef
            Swal.fire('방이름을 입력해주세요')
            return
        }
        RestApi.post('/chatRoom/create',props)
            .then(({data})=>{
                console.log(data)
            })
            .catch(err=>{
                console.log(err)
            })

    }
    return{
        channel,
        getChannel_UID,
        getChannel_title,
        getChannel_icon_url,
        getChannel_TextRoom,
        getChannel_VoiceRoom,
        createRoomInChannel
    }
})