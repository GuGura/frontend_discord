import {defineStore} from "pinia";
import {reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";
import {useRouter} from "vue-router";

export const useChannelListStore = defineStore("channelListStore", () => {

    const buttons = reactive([
        {
            channel_UID: 0,
            user_UID: 3,
            channel_title: "lobby",
            channel_icon_url: "/img/channelList/discord_Icon.png",
            channel_type: 'lobby'
        },
    ])

    const router = useRouter();

    async function initBtn() {
        console.log("initBtn")
        await RestApi.post("/myInfo/channelList")
            .then(({data}) => {
                const resultArray = data.data;
                resultArray.forEach(btn => {
                    buttons.push(btn)
                })
            })
    }

//---------------------------------------------------------------
    async function leaveChannel() {
        let channelUID = router.currentRoute.value.path.split('/')[2]
        RestApi.delete(`/channel/leaveChannel/${channelUID}`)
            .then(res => {
                console.log(res)
                buttons.forEach((r, index) => {
                    if (r.channel_UID === Number(channelUID)) {
                        buttons.splice(index, 1)
                    }
                })
            })
            .catch(() => {
                console.log("fail")
            })
    }

    function updateBtn(btn) {
         this.buttons.splice(1, 0, btn)
    }

    return {
        buttons,
        leaveChannel,
        router,
        initBtn,
        updateBtn,
    }
})