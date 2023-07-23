<script setup>
import {defineProps, reactive} from "vue";
import {useModalStore} from "@/script/store/modal";
import RestApi from "@/script/axios/jwt/RestApi";


const modalStore = useModalStore();

const props = defineProps({
    icon_url: String,
    nickname: String,
    description: String,
})

let postForm = reactive({
    username: props.nickname,
    upload_date: new Date(),
    post_title: "",
    post_content: '',
    post_img_url: 'none',
    is_img_in : false
})


function imgChange(e) {
    const img = e.target.files[0];
    if (img instanceof Blob) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img)
        fileReader.onload = function (e) {
            postForm.is_img_in = true;
            postForm.post_img_url = e.target.result;
        }
    }
}

async function fnAddProc() {
    if (!postForm.post_title) {
        alert("제목을 입력해 주세요");
        return;
    }
    if (!postForm.post_content) {
        alert("내용을 입력해 주세요");
        return;
    }
    postForm.upload_date = new Date()
    await RestApi.post("/post/savePost", postForm
    ).then(() => {
        modalStore.terminate('writingPost')
    })

}

function exitModal(){
    modalStore.terminate('writingPost')
}

</script>

<template>
    <div id="container">
        <div id="background" @click="exitModal"></div>
        <div id="modal">
            <div id="header">
                <div id="header_sumName">
                    <div>글 작성하기</div>
                    <img src="/img/channelList/exit.png" alt="" @click="exitModal">
                </div>
                <div id="description"></div>
            </div>
            <div id="body">
                <div id="img_upload">
                    <img id="Icon" class="IconURL" :src="postForm.post_img_url"
                         v-if="postForm.is_img_in">
                    <img v-else :src="'/img/sidebar/choose.png'">
                    <input class="file-input" type="file" tabindex="0" accept=".jpg,.jpeg,.png,.gif" aria-label="이미지 업로드하기"
                           @change="imgChange">
                </div>
                <div id="ChannelNameInputBox">
                    <div>제목</div>
                    <input type="text" id="nickName" v-model="postForm.post_title">
                    <div></div>
                    <textarea rows="5" cols="70" name="text" id="description"
                              v-model="postForm.post_content"></textarea>
                </div>
            </div>
            <div id="footer">
                <div id="btnAttend">
                    <button @click="fnAddProc">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#Icon {
    max-height: 300px;
}

.IconURL {
    background-position: center;
    background-size: contain;
}

#container {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    z-index: 90;
}

#background {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    background: black;
    filter: opacity(0.5);
    z-index: 1;
}

#modal {
    display: flex;
    width: 430px;
    padding-bottom: 100px;
    background: #fff;
    z-index: 2;
    border-radius: 10px;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding-top: 10px;
    gap: 20px;
}

#header {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}

#header_sumName {
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    padding: 10px;
}

#header_sumName > div:nth-of-type(1) {
    font-size: 22px;
    font-weight: 550;
    display: flex;
    color: #060607;
}

#header_sumName > img:nth-of-type(1) {
    position: absolute;
    height: 15px;
    right: 20px;
    cursor: pointer;
}

#description {
    font-size: 15px;
    padding: 0 10px;
    text-align: center;
    color: #4E5058;
}

/** */
#body {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
    gap: 20px;
}

#img_upload {
    display: flex;
    position: relative;
    overflow: hidden;
}

.file-input {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    font-size: 0;
}

#ChannelNameInputBox {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 90%;
}

#ChannelNameInputBox > div:nth-of-type(1) {
    font-size: 12px;
    font-weight: 600;
    color: #4E5058;
}

#ChannelNameInputBox > div:nth-of-type(2) {
    font-size: 12px;
    font-weight: 600;
    color: #4E5058;
}

#ChannelNameInputBox > input:nth-of-type(1) {
    height: 40px;
    background: #E3E5E8;
    outline: none;
    border: none;
    padding: 0 10px;
    border-radius: 3px;
    font-size: 15px;
    color: #313338;
}
#ChannelNameInputBox > textarea {
    height: 100px;
    background: #E3E5E8;
    outline: none;
    border: none;
    padding: 0 10px;
    border-radius: 3px;
    font-size: 15px;
    color: #313338;
    overflow:auto;
}



#box3 > div:nth-of-type(1) {
    color: #5C5E66;
    font-size: 12px;
}
#box3 > div:nth-of-type(2) {
    color: #5C5E66;
    font-size: 12px;
}

#btnCreate > button {
    height: 25px;
    font-size: 12px;
    width: 60px;
    border: none;
    background-color: #E3E5E8;
    color: #5C5E66;
    cursor: pointer;
    border-radius: 2px;
}

#btnCreate > button:hover {
    background-color: #CECECE;
}

#footer {
    display: flex;
    flex-direction: column;
    bottom: 0;
    background: #F2F3F5;
    position: absolute;
    width: 100%;
    align-items: center;
    height: 70px;
}


#btnAttend {
    width: 100%;
    padding: 0 10px;
    height: 34px;
}

#btnAttend > button {
    width: 100%;
    height: 100%;
    background: #6D6F78;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

#btnAttend > button:hover {
    background: #4E5058;
}

#btnAttend > button:active {
    background: #41434A;
}
</style>