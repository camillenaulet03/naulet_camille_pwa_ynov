<template>
  <div class="opacity"></div>
  <div class="detail">
    <div class="menu">
      <router-link
        :to="{
          name: 'DetailList',
          params: {
             id: task.list._id
          }
        }">
        <p>&#60;</p>
      </router-link>
      <p @click="options">...</p>
    </div>
    <div class="name">
      <p class="grey">Task</p>
      <p>{{task.title}}</p>
    </div>
    <div>
      <p class="grey">Description</p>
      <p>{{task.description}}</p>
    </div>
    <div>
      <p class="grey">Terminé</p>
      <p v-if="task.done">Oui</p>
      <p v-else>Non</p>
    </div>
  </div>
  <div class="options">
    <div class="optionsHeader">
      <h5>Task options</h5>
      <p @click="close">Close</p>
    </div>
    <div><button class="edit"  @click="editTask">Editer</button></div>
    <div><button class="edit"  @click="updateDoneTask">Déplacer la tâche</button></div>
    <div><button class="delete" @click="verification">Supprimer</button></div>
  </div>
  <div class="deleteOption">
    <div class="deleteHeader">
      <p @click="cancelVerification" class="verificationClose">x</p>
    </div>
    <div class="title">
      <p>Supprimer la tâche</p>
    </div>
    <div>
      <p>Vous êtes sur le point de supprimer votre tâche êtes vous sûr de vouloir faire ça ?</p>
    </div>
    <div class="buttons">
      <button class="cancel" @click="cancelVerification">Annuler</button>
      <button class="delete" @click="removeTask">Supprimer</button>
    </div>
  </div>
  <EditTask v-if="showEditTask" :title="task.title" :description="task.description" @update="update" @cancel="cancel" />
</template>
<script setup>
import { ref } from 'vue'
import { getTaskById, updateTask, deleteTask } from 'src/services/tasks'
import { useRoute, useRouter } from 'vue-router'
import EditTask from 'components/EditTask.vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const task = ref([])
const showEditTask = ref(false)
const id = ref(props.id)
const router = useRouter()

getTasks()

async function getTasks () {
  const route = useRoute()
  id.value = route.params.id
  const { data } = await getTaskById(id.value)
  task.value = data
}

function options () {
  document.getElementsByClassName('options')[0].style.visibility = 'visible'
  document.getElementsByClassName('opacity')[0].style.visibility = 'visible'
}

async function editTask () {
  showEditTask.value = true
  document.getElementsByClassName('menu')[0].style.visibility = 'hidden'
  document.getElementsByClassName('detail')[0].style.display = 'none'
  document.getElementsByClassName('opacity')[0].style.visibility = 'hidden'
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
}

async function update (v) {
  await updateTask(id.value, v.title, v.description, task.value.list._id)
  const { data } = await getTaskById(id.value)
  task.value = data
  showEditTask.value = false
  document.getElementsByClassName('menu')[0].style.visibility = 'visible'
  document.getElementsByClassName('detail')[0].style.display = 'block'
  document.getElementsByClassName('options')[0].style.display = 'hidden'
}

function cancel (v) {
  showEditTask.value = false
  document.getElementsByClassName('menu')[0].style.visibility = 'visible'
  document.getElementsByClassName('detail')[0].style.display = 'block'
  document.getElementsByClassName('options')[0].style.display = 'hidden'
}

async function updateDoneTask () {
  const done = !task.value.done
  await updateTask(id.value, task.value.title, task.value.description, task.value.list._id, done)
  const { data } = await getTaskById(id.value)
  task.value = data
}

async function removeTask () {
  await deleteTask(id.value)
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
  router.push({ name: 'DetailList', params: { id: task.value.list._id } })
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
  padding-left: 5%;
}

.grey {
  color: #BDBDBD;
}

.menu {
  display: flex;
  justify-content: space-between;
  margin-left: -5%;

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
}

.optionsHeader {
  margin-top: -8px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

a {
  color: inherit;
  text-decoration: inherit;
}

.edit {
  border: none;
  background-color: white;
  padding-left: 5%;
  padding-bottom: 5%;
}

.delete {
  color: red;
  border: none;
  background-color: white;
  padding-left: 5%;
  padding-bottom: 5%;
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
      padding: 3%;
    }
  }
}

.name {
  font-size: 24px;
  padding-top: 5%;
  padding-bottom: 5%;
}
</style>
