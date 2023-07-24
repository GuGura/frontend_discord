<script setup>
import {onMounted, reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";
import Post from "@/components/main/lobby/Post.vue";
import {useFriendStore} from "@/script/store/friend";

let lastPosting = 0

let postList = reactive({
  posts: [
    {
      userName: '',
      userIcon: '',
      upload_date: '',
      post_title: '',
      post_content: '',
      id: '',
        post_owner_id:'',
      post_img_url: '',
      is_img_in: '',
      visible: '',
      is_post_scrapped:'',
      scrapping_id:'',
        original_writer:'',
        post_owner_name:'',
        is_post_mine:'',
        is_post_scrapped_int:''
    }

  ]
})
function initPosts() {
  RestApi.post("/post/listByPageFriend", {
    lastPosting: lastPosting, id:useFriendStore().user.id
  }).then(({data}) => {
      if(data && data.length) {
          postList.posts = data
          lastPosting = postList.posts.at(-1).id
      }
  })
}

function morePost() {
  RestApi.post("/post/listByPage", {
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
    <div class="row my-2 mx-auto" style="flex: 1; display: flex; justify-content: center; align-items: center;">
      <button type="button" class="btn btn-sm btn-primary" id="boardMoreButton" @click="morePost"><span
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
}


</style>
