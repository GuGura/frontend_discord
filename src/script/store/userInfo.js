import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";


//id 고유아이디
//state 상태 (현재코드에선 초기상태 0으로 리턴해줌)
export const useUserStore = defineStore("userStore", () => {

    let user = reactive({
        username: '',
        role: '',
        join_date: '',
        nickname: '',
        icon_url: '',
        description: ''
    })

    function updateMyInfo() {
        return RestApi.post('/myInfo/basic')
            .then(({data}) => {
                const userInfo = data.data
                console.log(data.data)
                user.username = userInfo.username
                user.role = userInfo.role
                user.join_date = userInfo.join_date
                user.nickname = userInfo.nickname
                user.description = userInfo.description
                user.icon_url = userInfo.icon_url

                localStorage.setItem('user', JSON.stringify(user))
            })
    }
    let getNickname =()=>(computed(()=>{
        return user.nickname;
    }))
    let getDescription =()=>(computed(()=>{
        return user.description;
    }))
    let getIconURL =()=>(computed(()=>{
        return user.icon_url;
    }))
    function uploadMyInfo(index){
        user.nickname = index.username;
        user.description = index.description;
        user.icon_url = index.icon_url
        localStorage.getItem('user').replace('nickname',index.nickname)
        localStorage.getItem('user').replace('description',index.description)
        localStorage.getItem('user').replace('icon_url',index.icon_url)
    }
    return {
        user,
        getNickname,
        getDescription,
        getIconURL,
        uploadMyInfo,
        updateMyInfo
    }
});