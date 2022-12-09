<template>
  <div class="detail">
    <div class="menu">
      <div class="arrow" @click="redirect"><p>&#60;</p></div>
      <div class="cancel" @click="redirect">Cancel</div>
    </div>
    <div>
      <h3>Créer une tâche</h3>
    </div>
    <div>
      <p>Task</p>
      <input type="text" v-model="taskName" placeholder="Nom de la tâche" />
    </div>
    <div>
      <p>Description</p>
      <textarea v-model="taskDescription" placeholder="Description de la tâche" />
    </div>
    <div>
      <button @click="create">Créer</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTask } from 'src/services/tasks'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const taskName = ref('')
const taskDescription = ref('')
const id = ref(props.id)
const router = useRouter()
const route = useRoute()
id.value = route.params.id

async function create () {
  await createTask(taskName.value, taskDescription.value, id.value)
  redirect()
}

function redirect () {
  router.push({ name: 'DetailList', params: { id: id.value } })
}

</script>
<style lang="scss" scoped>
.detail {
  margin: 5%;

  .menu {
    display: flex;
    justify-content: space-between;

    .arrow {
      background-color: #F2F2F2;
      width: 30px;
      height: 30px;
      text-align: center;
      font-size: 24px;
      border-radius: 8px;
      color: inherit;
      text-decoration: inherit;

      p {
        margin-top: -3px;
      }
    }

    .cancel {
      font-size: 24px;
    }
  }

  input {
    width: 90%;
    height: 30px;
    border-radius: 8px;
    margin-bottom: 5%;
  }

  textarea {
    width: 90%;
    height: 50px;
    border-radius: 8px;
    margin-bottom: 5%;
  }

  button {
    background-color: #613973;
    color: white;
    width: 90%;
    border-radius: 8px;
    font-size: 24px;
    position: fixed;
    bottom: 5%;
  }
}
</style>
