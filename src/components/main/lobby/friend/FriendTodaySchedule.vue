<script setup>
import {onMounted, reactive} from "vue";
import RestApi from "@/script/axios/jwt/RestApi";
import {useFriendStore} from "@/script/store/friend";


const days = ["일", "월", "화", "수", "목", "금", "토"];
// eslint-disable-next-line no-unused-vars
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

async function addEvent(){
    // eslint-disable-next-line no-undef
    const title = await Swal.fire({
        title: '추가할 일정명을 입력해주세요.',
        html: '<input id="swal-input1" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('swal-input1').value
        }
    })
    if (title.value) {
        RestApi.post("/event/saveEvent",{
            title:title.value,
            start: today.setDate(today.getDate()),
            end: today.setDate(today.getDate()+1),
            allDay: true
        }).then(() => {
            today.setDate(today.getDate()-1),
                initEvents()
        })
    }

}
function initEvents() {
    RestApi.post("/event/listByDateFriend", {
        year: Dates.year,
        month: Dates.month,
        date: Dates.date,
        id: useFriendStore().user.id
    }).then(({data}) => {
        eventList.events = data
    })
}

function prevDate(){
    eventList.events = null
    today.setDate(today.getDate()-1)
    dateCalculating()
    initEvents();
}

function nextDate(){
    eventList.events = null
    today.setDate(today.getDate()+1)
    dateCalculating()
    initEvents();
}

onMounted(() => {
})

let today = new Date();

let Dates = reactive({
    year:today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    days: '',
    months: ''

})

function dateCalculating(){
    Dates.year = today.getFullYear();
    Dates.month = today.getMonth()+1;
    Dates.date = today.getDate();
    Dates.days = '';
    Dates.months = '';
}


let eventList = reactive({
    events: [
        {
            id: '',
            start: '',
            end: '',
            title: '',
            groupName: '',
            memberId: ''
        }

    ]
})

initEvents()
</script>

<template>
    <div class="container">
        <div class="card" id="wholeCard">
            <div class="card-header">
                <h4>
                    <button class="btnDate" @click="prevDate">&lt;</button>
                    {{ Dates.month }}월 {{ Dates.date }}일 {{ days[Dates.days] }}
                    <button class="btnDate" @click="nextDate">&gt;</button>
                </h4>

          </div>
          <div class="card-body">
              <ul class="list-group" style="list-style-type: none;">
                  <li v-for="(events) in eventList.events" :key="events.title" class="card">
                      <h2>
                          {{events.title}}
                      </h2>
                      <h5 class="fw-light">
                          By {{events.groupName}}
                      </h5>
                  </li>
              </ul>
              <button id="btnAdd" @click="addEvent">Add+</button>
          </div>
      </div>

  </div>

</template>

<style scoped>

.btnDate{
    border-radius: 10px;
    border: none;
    padding: 5px;
    background: #36373D;
    color: white;
}
.btnDate:hover{
    background: #41434A;
}

.card-header{
    text-align: center;
    background-color: transparent;
    padding: 20px;
    border-bottom: transparent;
}
#btnAdd{
    margin:auto;
    display:block;
    border-radius: 10px;
    border: none;
    padding: 10px;
    background-color: #36373D;
    color: white;
}

#btnAdd:hover{
    background: #41434A;
}
.card{
    background: #41434A;
    margin: 0px;
    padding: 20px;
    color: white;
    border:none;
    margin-bottom: 10px;
    border-radius: 5px;
}
.card:hover{
    background-color: #2b2d31;
}

#wholeCard{
    height: 600px;
    border: none;
    background: #36373D;
}

</style>