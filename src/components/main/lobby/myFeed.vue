<script setup>
import {onMounted, reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";
import Post from "@/components/main/lobby/Post.vue";


let lastPosting = 0

let postList = reactive({
    posts: [
        {
            username: '',
            userIcon: '',
            uploadDate: '',
            title: '',
            content: '',
            id: '',
            contentIMG: '',
            isImgIn: '',
            visible: '',
            sharingCode:'',
            sharedWriter:'',
            writer_id: ''
        }

    ]
})
function initPosts() {
    RestApi.post("/post/listByFeedPage", {
        lastPosting: lastPosting
    }).then(({data}) => {
        if(data && data.length) {
            postList.posts = data
            lastPosting = postList.posts.at(-1).id
        }
    })
}

function morePost() {
    RestApi.post("/post/listByFeedPage", {
        lastPosting: lastPosting
    }).then(({data}) => {
        if(data && data.length) {
            for (const item of data) {
                postList.posts.push(item)
            }
            lastPosting = postList.posts.at(-1).id
        }
    })
}

onMounted(() => {
    initPosts()
})





</script>

<template>
    <div class="list-group">
        <div class="Box" v-for="(post,idx) in postList.posts" :key="idx">
            <post :post="post"/>
        </div>
        <div class="row my-2 mx-auto"  style="flex: 1; display: flex; justify-content: center; align-items: center;">
            <button type="button" class="btn btn-sm btn-primary" id="boardMoreButton" @click="morePost" ><span
                    class="material-symbols-outlined">more_horiz</span>
            </button>
        </div>
    </div>
</template>


<style>

img {
    max-width: 100%;
}

#boardMoreButton {
    width: 50px;
    height: 35px;
    border-radius: 10px;
    background-color: #1E1F22;
    --bs-btn-border-color: #1E1F22;
}


</style>
