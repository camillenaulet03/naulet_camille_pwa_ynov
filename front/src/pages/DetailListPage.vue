<template>
  <div class="opacity"></div>
  <div class="detail">
    <div class="menu">
      <router-link
        :to="{
              name: 'Home'
            }">
        <p>&#60;</p>
      </router-link>
      <div class="title"><p>{{list.title}}</p></div>
      <p class="right" @click="options">...</p>
    </div>
    <div>
      <p class="task">Task - {{numberTodo}}</p>
      <div v-for="(task, keyT) in tasks" v-bind:key="keyT" v-show="!task.done" class="todo">
        <q-checkbox v-model="task.done" />
        <router-link v-if="!task.done"
          :to="{
            name: 'DetailTask',
            params: {
              id: task._id
            }
          }">
          {{task.title}}
        </router-link>
      </div>
    </div>
    <div>
      <p class="task">Task completed - {{numberDone}}</p>
      <div v-for="(task, keyT) in tasks" v-bind:key="keyT" v-show="task.done" class="done">
        <q-checkbox v-model="task.done" dense color="teal" />
        <router-link v-if="task.done"
          :to="{
            name: 'DetailTask',
            params: {
              id: task._id
            }
          }">
          <strike>{{task.title}}</strike>
        </router-link>
      </div>
    </div>
    <div class="dot">
      <router-link
        :to="{
          name: 'NewTask',
          params: {
            id: id
          }
        }">
        <p>+</p>
      </router-link>
    </div>
  </div>
  <EditList v-if="showEditList" :name="list.title" @update="update" @cancel="cancel" />
  <div class="options">
    <div class="optionsHeader">
      <h5>List options</h5>
      <p @click="close">Close</p>
    </div>
    <div><button class="edit" @click="editList">Editer</button></div>
    <div><button class="delete" @click="verification">Supprimer</button></div>
  </div>
  <div class="deleteOption">
    <div class="deleteHeader">
      <p @click="cancelVerification" class="verificationClose">x</p>
    </div>
    <div class="title">
      <p>Supprimer la liste</p>
    </div>
    <div>
      <p>Vous êtes sur le point de supprimer votre liste êtes vous sûr de vouloir faire ça ?</p>
    </div>
    <div class="buttons">
      <button class="cancel" @click="cancelVerification">Annuler</button>
      <button class="delete" @click="removeList">Supprimer</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getTasksByListId } from 'src/services/tasks'
import { useRoute, useRouter } from 'vue-router'
import EditList from 'components/EditList.vue'
import { deleteList, getListById, updateList } from 'src/services/lists'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const tasks = ref([])
const list = ref([])
const id = ref(props.id)
const showEditList = ref(false)
const numberTodo = ref(0)
const numberDone = ref(0)
const router = useRouter()
const route = useRoute()

getTasks()
getList()

async function getTasks () {
  id.value = route.params.id
  const { data } = await getTasksByListId(id.value)
  tasks.value = data
  tasks.value.forEach(task => {
    if (task.done) numberDone.value = +1
    else numberTodo.value = +1
  })
}

async function getList () {
  const { data } = await getListById(route.params.id)
  list.value = data
}

function options () {
  document.getElementsByClassName('options')[0].style.visibility = 'visible'
  document.getElementsByClassName('opacity')[0].style.visibility = 'visible'
}

async function editList () {
  showEditList.value = true
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
  document.getElementsByClassName('detail')[0].style.display = 'none'
  document.getElementsByClassName('menu')[0].style.visibility = 'hidden'
}

async function update (v) {
  await updateList(id.value, v)
  const { data } = await getTasksByListId(id.value)
  tasks.value = data
  const list = await getListById(tasks.value[0].list)
  list.value = list.data
  cancel()
}

function cancel () {
  document.getElementsByClassName('menu')[0].style.visibility = 'visible'
  document.getElementsByClassName('detail')[0].style.display = 'block'
  showEditList.value = false
}

async function removeList () {
  await deleteList(id.value)
  router.push({ name: 'Home' })
}

function close () {
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
  document.getElementsByClassName('opacity')[0].style.visibility = 'hidden'
}

function verification () {
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
  document.getElementsByClassName('deleteOption')[0].style.visibility = 'visible'
}

function cancelVerification () {
  document.getElementsByClassName('options')[0].style.visibility = 'visible'
  document.getElementsByClassName('deleteOption')[0].style.visibility = 'hidden'
}

</script>
<style lang="scss" scoped>
.opacity {
  background-color: gray;
  width: 100%;
  top: 0;
  bottom: 0;
  height: 100%;
  position: fixed;
  z-index: 6000;
  opacity: 50%;
  visibility: hidden;
}

.detail {
  margin: 8px;
  font-size: 16px;

  .menu {
    display: flex;
    justify-content: flex-start;
    flex-direction:row;

    .title {
      padding-left: 5%;
      font-size: 24px;
    }

    .right {
      display: flex;
      margin-left: auto;
    }

    a {
      background-color: #F2F2F2;
      width: 30px;
      height: 30px;
      text-align: center;
      font-size: 24px;
      border-radius: 8px;
    }

    p {
      margin-top: -3px;
    }
  }

  .task {
    padding-left: 5%;
    font-weight: bold;
  }

  .todo {
    background-color: #f2f2f2;
    padding: 3%;
    border-radius: 1em;
    margin-bottom: 5%;
  }

  .done {
    margin-left: 10px;
    margin-right: 10px;
    background-color: #f2f2f2;
    padding: 3%;
    border-radius: 1em;
    margin-bottom: 5%;
  }

  :deep .q-checkbox {
    padding-right: 5%;
  }

  .dot {
    height: 50px;
    width: 50px;
    background: linear-gradient(125.54deg, #613973 -0.39%, #BB46E4 100%);
    border-radius: 50%;
    display: inline-block;
    padding: 5px;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 1%;
    left: 44%;
    font-size: 24px;

    p {
      font-size: 30px;
      margin-top: -3px;
    }
  }
}

a {
  color: inherit;
  text-decoration: inherit;
}

.options {
  visibility: hidden;
  z-index: 6001;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  background-color: white;
  padding: 8px;
  border-top-right-radius: 2em;
  border-top-left-radius: 2em;

  .optionsHeader {
    margin-top: -8px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .edit {
    border: none;
    background-color: white;
    padding-left: 5%;
  }

  .delete {
    color: red;
    border: none;
    background-color: white;
    padding: 5%;
  }
}

.deleteOption {
  visibility: hidden;
  z-index: 6001;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  background-color: white;
  padding: 8px;
  border-top-right-radius: 2em;
  border-top-left-radius: 2em;

  .deleteHeader {
    margin-top: -8px;
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .verificationClose {
      text-align: right;
      font-size: 24px;
      right: 5%;
      position: fixed;
    }
  }

  .title {
    text-align: center;
    left: 25%;
    padding-top: 10%;
    font-size: 24px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    padding-bottom: 5px;

    .cancel {
      border: none;
      background-color: white;
      color: #646464;
      margin-left: 10%;
    }

    .delete {
      background-color: #C10707;
      color: white;
      border-radius: 1em;
      margin-right: 10%;
    }
  }
}

</style>
