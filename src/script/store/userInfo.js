import {defineStore} from "pinia";
import {reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";


//id 고유아이디
//state 상태 (현재코드에선 초기상태 0으로 리턴해줌)
export const useUserStore = defineStore("userStore", () => {

    let user = reactive({
        username: '',
        role: '',
        join_date: '',
        nickname:'',
        icon_url: '',
        description: ''
    })
    function updateMyInfo() {
       return RestApi.post('/myInfo/basic')
            .then(({data}) => {
                const userInfo = data.data
                user.username = userInfo.username
                user.role = userInfo.role
                user.join_date = userInfo.join_date
                user.nickname = userInfo.nickname
                user.description = userInfo.description

                if(userInfo.icon_url?.trim()){
                    user.icon_url = userInfo.icon_url
                }else {
                    user.icon_url = "data:image/png;base64,null"
                }
                localStorage.setItem('user',JSON.stringify(user))
            })
    }

    return {
        user,
        updateMyInfo
    }
});