<template>
    <q-layout view="hHh Lpr fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          ugsk
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
    v-model="left" side="left" class="bg-null">
      <div class="column q-ma-sm ">
        <q-btn :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/main/dashboard')">Дашборд</q-btn>
        <q-btn :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/main/pxe')">Запросы PXE</q-btn>
        <q-btn :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/main/tasks')">Задачи</q-btn>
        <q-btn :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/main/distpoint')">Точки Дистрибуции</q-btn>
        <q-btn :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/main/settings')"> Настройки</q-btn>
      </div>
    </q-drawer>

    <q-page-container class="row justify-center items-center content-center bg-grey-2 ">
      <div id="app" class="container bg-grey-4 shadow-3 q-ma-md" style="min-height:800px">
        <router-view/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data(){
    return{
      left:false
    }
  },
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}

</script>

<style lang="scss">
.titleScreen{
  font-size: 18px;
}
.container{
  width: 70%;
  height: 100%;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media screen and (max-width: 800px) {
  .container{
  width: 90%;
  height: 100%;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
}
}

</style>