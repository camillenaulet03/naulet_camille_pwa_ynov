<template>
  <div class="opacity"></div>
  <div class="menu">
    <h4><b>Bonjour,<br />Tom Dupont!👋</b></h4>
    <div v-for="(list, keyL) in lists" v-bind:key="keyL">
      <q-card class="my-card">
        <q-card-section class="bg-grey-2 text-black title">
          <div class="text-h6">{{list.title}}</div>
          <q-btn @click="options(list._id, list.title)">...</q-btn>
        </q-card-section>
        <q-card-actions vertical align="center">
          <div v-if="!listWithTask.includes(list._id)">
            <p>Cette liste ne contient aucune tâches ajoutez en une depuis la liste</p>
          </div>
          <div v-for="(task, keyT) in tasks" v-bind:key="keyT">
            <div v-for="(taskData, keyTD) in task" v-bind:key="keyTD">
              <div v-if="taskData.list === list._id">
                <q-btn flat>{{ taskData.title }}</q-btn>
              </div>
            </div>
          </div>
          <q-btn flat>
            <router-link
              :to="{
                name: 'DetailList',
                params: {
                  id: list._id
                }
              }">
              Voir la liste complète
            </router-link>
          </q-btn>
        </q-card-actions>
      </q-card>
      <br />
    </div>
  </div>
  <EditList v-if="showEditList" :name="title" @update="update" @cancel="closeNewList" />
  <DetailList v-if="showTasks" :id="id" />
  <div class="options">
    <div class="optionsHeader">
      <h5>List options</h5>
      <p @click="close">Close</p>
    </div>
    <div><button class="edit" @click="editList">Editer</button></div>
    <div><button class="delete" @click="removeList">Supprimer</button></div>
  </div>
  <div class="newList">
    <p class="close" @click="cancel">x</p>
    <h5>Créer une nouvelle liste</h5>
    <div class="content">
      <label for="name">Nom de la liste</label><br />
      <input type="text" v-model="title" />
    </div>
    <div>
      <button class="cancel" @click="cancel">Annuler</button>
      <button class="createList" @click="createNewList">Créer</button>
    </div>
  </div>
  <div class="leftMenu">
    <p class="close" @click="closeLeftMenu">x</p>
    <div>
      <p class="title">Mes listes</p>
      <button class="create" @click="newList">Créer une liste</button>
    </div>
    <div v-for="(list, keyL) in lists" v-bind:key="keyL" class="contentMenu">
      <div>
        <router-link
          :to="{
                name: 'DetailList',
                params: {
                  id: list._id
                }
              }">
          {{list.title}}
        </router-link>
      </div>
      <hr />
    </div>
  </div>
  <div class="footer">
    <img @click="openLeftMenu" src="../assets/menu.svg" />
    <div class="dot" @click="newList"><p>+</p></div>
    <img src="../assets/profile.svg" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllLists, createList, deleteList, updateList } from 'src/services/lists'
import { getTasksByListId } from 'src/services/tasks'
import EditList from 'components/EditList.vue'
import DetailList from 'pages/DetailListPage.vue'

const lists = ref([])
const tasks = ref([])
const id = ref('')
const showEditList = ref(false)
const showTasks = ref(false)
const title = ref('')
const listWithTask = ref([])

getLists()

async function getLists () {
  const { data } = await getAllLists()
  lists.value = data
  await getTasks()
}

async function getTasks () {
  let i = 0
  for (const list of lists.value) {
    const { data } = await getTasksByListId(list._id)
    if (data.length !== 0) {
      tasks.value[i] = data
      listWithTask.value[i] = list._id
      i++
    }
  }
}

function options (idValue, titleValue) {
  id.value = idValue
  title.value = titleValue
  document.getElementsByClassName('options')[0].style.visibility = 'visible'
  document.getElementsByClassName('opacity')[0].style.visibility = 'visible'
}

function newList () {
  document.getElementsByClassName('newList')[0].style.visibility = 'visible'
  document.getElementsByClassName('leftMenu')[0].style.visibility = 'hidden'
}

async function createNewList () {
  await createList(title.value)
  cancel()
  await getLists()
}

async function removeList () {
  await deleteList(id.value)
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
  await getLists()
}

async function editList () {
  showEditList.value = true
  document.getElementsByClassName('menu')[0].style.display = 'none'
  close()
}

async function update (l) {
  await updateList(id.value, l)
  await getLists()
  closeNewList()
}

function close () {
  document.getElementsByClassName('options')[0].style.visibility = 'hidden'
  document.getElementsByClassName('opacity')[0].style.visibility = 'hidden'
}

function openLeftMenu () {
  document.getElementsByClassName('leftMenu')[0].style.visibility = 'visible'
}

function closeLeftMenu () {
  document.getElementsByClassName('leftMenu')[0].style.visibility = 'hidden'
}

function cancel () {
  document.getElementsByClassName('newList')[0].style.visibility = 'hidden'
}

function closeNewList () {
  showEditList.value = false
  document.getElementsByClassName('menu')[0].style.display = 'block'
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

.menu {
  padding-bottom: 20%;
  width: 90%;
  margin: 5%;

  .title {
    display: flex;
    justify-content: space-between;
  }
}

button {
  cursor: pointer;
  font-weight: bold;
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

.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 2% 10%;
  width: 100%;
  margin: 0;
  box-shadow: 0 -5px 5px -5px #333;

  img {
    width: 25px;
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

    p {
      font-size: 30px;
      margin-top: -3px;
    }
  }
}

.newList {
  position: fixed;
  bottom: 30%;
  width: 95%;
  margin: 8px;
  visibility: hidden;
  background-color: white;
  box-shadow: 0 0 5px #333;
  padding-left: 5%;
  padding-bottom: 5%;
  border-radius: 8px;

  .createList {
    background-color: #613973;
    color: white;
    border-radius: 8px;
    width: 40%;
    height: 50px;
  }

  .content {
    padding-left: 5%;
    padding-bottom: 10%;
    width: 90%;
  }

  .cancel {
    color: #646464;
    border: none;
    background-color: white;
    width: 40%;
  }
}

a {
  color: inherit;
  text-decoration: inherit;
}

.leftMenu {
  height: 100%;
  width: 80%;
  position: fixed;
  background-color: white;
  color: black;
  z-index: 5000;
  top: 0;
  padding-left: 15px;
  visibility: hidden;

  .title {
    font-size: 28px;
  }

  .create {
    background-color: #613973;
    color: white;
    border-radius: 8px;
    width: 90%;
    height: 50px;
    font-size: 20px;
  }

  .contentMenu {
    padding-top: 10%;
    margin-left: 8px;
    width: 95%;
    font-size: 24px;
  }

  hr {
    width: 90%;
    margin-left: 0;
  }
}

.close {
  text-align: right;
  margin: 8px;
  font-size: 24px;
}

input {
  border: 1px black solid;
  margin-bottom: 15%;
  margin-top: 5%;
  width: 90%;
  height: 30px;
  border-radius: 8px;
}

:deep .q-btn:before {
  box-shadow: none;
}

</style>
