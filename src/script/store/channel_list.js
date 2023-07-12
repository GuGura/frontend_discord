import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
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
    let path = reactive([]);



    const router = useRouter();

    const getPathEndPoint = (computed(() => {
        const path = router.currentRoute.value.href.split('/');
        let triumphant = null
        if (!(path[2] === 'lobby' || path[2] === 'public' || path[2] === 'addServer'))
            triumphant = Number(path[2]);
        else
            triumphant = path[2]
        return triumphant;
    }))

    const getEndPoint = computed(() => {
        const pathSegments = router.currentRoute.value.path.split('/');
        return pathSegments[2];
    });

    let btnResult = ref({
        endPoint: 'lobby',
    })

    async function initBtn() {
        console.log("initBtn")
        path.push("lobby")
        await RestApi.get("/myInfo/channelList")
            .then(({data}) => {
                const resultArray = data.data;
                resultArray.forEach(btn => {
                    buttons.push(btn)
                    if (btn.channel_UID === 0 )path.push(btn.channel_title)
                    else if (typeof btn.channel_UID === 'number') path.push(btn.channel_UID)
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

    async function updateBtn(btn) {
        this.buttons.splice(1, 0, btn)
        this.path.splice(1,0,btn.channel_UID)
    }

    return {
        buttons,
        path,
        btnResult,
        getPathEndPoint,
        getEndPoint,
        leaveChannel,
        router,
        initBtn,
        updateBtn,
    }
})