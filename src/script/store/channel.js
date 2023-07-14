import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useChannelStore = defineStore("channelStore", () => {

    const channel = reactive({
        channel_UID: -1,
        channel_title: '',
        channel_icon_url: ''
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
    return{
        channel,
        getChannel_UID,
        getChannel_title,
        getChannel_icon_url
    }
})