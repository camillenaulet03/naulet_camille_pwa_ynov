<template>
  <div class="edit">
    <div class="menu">
      <div class="cancel" @click="cancel"><p>&#60;</p></div>
      <p @click="cancel">Annuler</p>
    </div>
    <h5>Modifier la liste</h5>
    <label for="name">Le nom de la liste</label><br />
    <input type="text" v-model="name" />
    <div><button @click="updateList()">Modifier</button></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

const name = ref(props.name)
const emit = defineEmits(['update', 'cancel'])

function updateList () {
  emit('update', name.value)
}

function cancel () {
  emit('cancel')
}

</script>
<style lang="scss" scoped>
.edit {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 7000;
  margin: 0;
  padding: 5%;
  background-color: white;
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

input {
  width: 95%;
  border: 1px grey solid;
  margin-bottom: 5%;
  border-radius: 8px;
  height: 35px;
}

button {
  background-color: #613973;
  color: white;
  position: fixed;
  bottom: 5%;
  width: 80%;
  font-size:  24px;
  border-radius: 8px;
  margin-left: 4%;
}
</style>
