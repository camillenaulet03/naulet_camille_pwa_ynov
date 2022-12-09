<template>
  <q-layout>
    <q-header>
      <q-toolbar>

        <q-toolbar-title>
          Dashboard
        </q-toolbar-title>

        <div>
          <img class="dot" src="../assets/profile.svg" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

</script>
<style lang="scss" scoped>
header {
  background-color: white;
  color: black;
}

.dot {
  height: 35px;
  width: 35px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  padding: 5px;
}
</style>
