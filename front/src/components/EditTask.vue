<template>
  <div class="edit">
    <div class="menu">
      <div class="cancel" @click="cancel"><p>&#60;</p></div>
      <p @click="cancel">Annuler</p>
    </div>
    <h5>Modifier la tâche</h5>
    <div>
      <label for="name">Le nom de la tâche</label><br />
      <input type="text" v-model="title" />
    </div>
    <div>
      <label for="name">Description</label><br />
      <textarea v-model="description" />
    </div>
    <div><button @click="updateTask()">Modifier</button></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

const title = ref(props.title)
const description = ref(props.description)
const emit = defineEmits(['update', 'cancel'])

function updateTask () {
  emit('update', { title: title.value, description: description.value })
}

function cancel () {
  emit('cancel', false)
}

</script>
<style lang="scss" scoped>
.edit {
  margin: 8px;
}

.newList {
  position: fixed;
  bottom: 50%;
  width: 95%;
  margin: 8px;
  border: 1px black solid;
  background-color: white;
  z-index: 5;
}

.menu {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  margin-right: 8px;

  .cancel {
    background-color: #F2F2F2;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 24px;
    border-radius: 8px;
    margin-left: -8px;

    p {
      margin-top: -3px;
    }
  }
}

:deep .q-field {
  margin-right: 5%;
  padding-bottom: 5%;
  padding-top: 5%;
}

input {
  width: 95%;
  border: 1px grey solid;
  margin-bottom: 5%;
  border-radius: 8px;
  height: 35px;
}

textarea {
  width: 95%;
  border: 1px grey solid;
  padding-top: 20px;
  border-radius: 8px;
}

button {
  background-color: #613973;
  color: white;
  position: fixed;
  bottom: 5%;
  width: 80%;
  font-size:  24px;
  border-radius: 8px;
}
</style>
