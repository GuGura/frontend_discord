import {defineStore} from "pinia";
import {computed, reactive} from "vue";
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
    let getPathEndPoint = (computed(() => {
        const path = router.currentRoute.value.href.split('/');
        let triumphant = null
        if (!(path[2] === 'lobby' || path[2] === 'public' || path[2] === 'addServer'))
            triumphant = Number(path[2]);
        else
            triumphant = path[2]
        return triumphant;
    }));
    const router = useRouter();

    async function initBtn() {
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
            .then(() => {
                buttons.forEach((r, index) => {
                    if (r.channel_UID === Number(channelUID)) {
                        buttons.splice(index, 1)
                    }
                })
            })
            .catch((err) => {
                // eslint-disable-next-line no-undef
                Swal.fire('Fail!', err.response.data.message, 'error')
            })
    }

    function updateBtn(btn) {
         this.buttons.splice(1, 0, btn)
    }

    return {
        buttons,
        getPathEndPoint,
        leaveChannel,
        router,
        initBtn,
        updateBtn,
    }
})