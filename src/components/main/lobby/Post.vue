<template>
    <div class="card mb-3">
        <div v-if="props.post.visible" class="card-body container" :id="props.post.id">
            <div v-if="props.post.is_post_scrapped_int === 1">
                <h4 style="margin: 0; padding-left: 10px; padding-bottom: 10px" >{{props.post.post_owner_name}}님이 스크랩한 글입니다.</h4>
            </div>
            <div class="row" style="display: flex;flex: 1; margin-bottom: 10px">
                <div style="width: 120px;" v-if="!!props.post.userIcon?.trim()">
                    <img class="iconIMG" :src="props.post.userIcon">
                </div>
                <div style=" width: 120px; display: flex; justify-content: center; align-items: center;" v-else>
                    <img class="iconIMG" src="/img/channelList/bright_icon.png">
                </div>
                <div style="flex: 1;">
                    <div style="display: flex; position: relative;">
                        <h1 class="card-subtitle mb-2">{{ props.post.post_title }}</h1>
                        <div v-if="props.post.is_post_mine === 1" class="btnDelete col-1" @click="deletePost">
                            <span class="material-symbols-outlined">close</span>
                        </div>
                        <div v-else class="btnDelete col-1" @click="getFriendPost">
                            <span class="material-symbols-outlined">content_copy</span>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <h6 class="card-title">{{ props.post.userName }}</h6>


                    </div>
                    <div style="display: flex;">
                        <p class="card-text"><small class="card-text fw-lighter">{{ props.post.upload_date }}</small>
                        </p>
                    </div>

                </div>
            </div>
            <div class="btnDelete col-1">
            </div>
            <div v-if="props.post.post_img_url!=='none'" style="text-align: center">
                <img alt="Post Image" :src="props.post.post_img_url" style="flex: 1; border-radius: 5px;">
            </div>

            <p class="card-text contents fw-light" style="margin:0">{{ props.post.post_content }}</p>

        </div>
        <div v-else style="display: flex;flex: 1; justify-content: center; align-items: center;">
            <h4 class="card-text contents fw-light">포스트가 존재하지 않습니다</h4>
        </div>
    </div>
</template>

<script setup>

import {defineProps} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";


const props = defineProps({
    post: Object,
})

function getFriendPost(){
    // eslint-disable-next-line no-undef
    Swal.fire({
        title: `포스트를 스크랩하시겠습니까?`,
        confirmButtonText: "스크랩",
    }).then((result) => {
        if (result.isConfirmed) {
            RestApi.post("/post/scrappingPost", {id: props.post.id, scrapping_id:props.post.scrapping_id, scrapped:props.post.is_post_scrapped_int}
            ).then(() => {
                // eslint-disable-next-line no-undef
                Swal.fire("스크랩되었습니다.")
            })
        }
    })

}

function deletePost() {
    // eslint-disable-next-line no-undef
    Swal.fire({
        title: `포스트를 삭제하시겠습니까?`,
        confirmButtonText: "삭제",
    }).then((result) => {
        if (result.isConfirmed) {
            RestApi.post("/post/deletePost", {id: props.post.id,scrapping_id:props.post.scrapping_id}
            ).then(() => {
                // eslint-disable-next-line no-undef
                Swal.fire("삭제되었습니다.")
                // eslint-disable-next-line vue/no-mutating-props
                props.post.visible = false
            })
        }
    })
}
</script>

<style scoped>
.contents {
    padding: 20px;
}

.content {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.card-subtitle {
    margin: 0px;
}

.card-title {
    margin: 5px;
}

.card-text {
    margin: 3px;
}

.btnDelete {
    position: absolute;
    left: 93%;
    margin: 10px;
}

.btnDelete:focus {
    outline: none;
}

.material-symbols-outlined {
    display: flex;
}

.material-symbols-outlined.active {
    color: red;
}

.iconIMG {
    border-radius: 10px;
    height: 90px;
    width: 110px;
    margin: 10px;
}

.img-fluid {
    border-radius: 10px;
}

.contents {
    margin: 20px;
}

.card {
    background-color: #36373D;
    color: white;
    border-radius: 10px;
    margin: 10px;
    padding: 15px;
}

.card-text {
    color: white;
}

</style>
