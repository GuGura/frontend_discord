import {defineStore} from "pinia";
import {reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";


//id 고유아이디
//state 상태 (현재코드에선 초기상태 0으로 리턴해줌)
export const useFriendStore = defineStore("friendStore", () => {

    let user = reactive({
        id: '',
        email: '',
        username: '',
        role: '',
        join_date: '',
        user_icon_url: '',
        user_description: ''
    })
    let friendList = reactive([])
    const RequestUser = reactive([]);
    let searchUsers = reactive([])
    function pushRequestUser(index){
        RequestUser.push(index);
    }
    function initFriendList(){
        RestApi.post('/myInfo/friendList')
            .then(({data})=>{
                if (data.data)
                    data.data.forEach(member =>{friendList.push(member)})
            })
            .catch(err=>{console.log(err)})
    }





    //----------------------------------------------------------------------------------------------------------
    function updateFriendInfo() {
        localStorage.removeItem('friend')
        RestApi.post('/myInfo/friend',{friendId:user.id})
            .then(({data}) => {
                const userInfo = data
                user.username = userInfo.nickname
                user.role = userInfo.role
                user.join_date = userInfo.join_date
                if(userInfo.icon_url?.trim()){
                    user.user_icon_url = userInfo.icon_url
                }else {
                    user.user_icon_url = ""
                }
                user.user_description = userInfo.description

                localStorage.setItem('friend',JSON.stringify(user))
            })
    }

    function init(){
        if(localStorage.getItem('friend')?.trim()) {
            user.id = JSON.parse(localStorage.getItem('friend')).id
            user.username = JSON.parse(localStorage.getItem('friend')).username
            user.user_icon_url = JSON.parse(localStorage.getItem('friend')).user_icon_url
            user.role = JSON.parse(localStorage.getItem('friend')).role
            user.email = JSON.parse(localStorage.getItem('friend')).email
            user.user_description = JSON.parse(localStorage.getItem('friend')).user_description
            user.join_date = JSON.parse(localStorage.getItem('friend')).join_date
        }
    }


    return {
        user,
        friendList,
        RequestUser,
        searchUsers,
        initFriendList,
        pushRequestUser,
        updateFriendInfo,
        init
    }
});