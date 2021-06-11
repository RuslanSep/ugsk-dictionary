<template>
<div>
  <div style="height: 100%">
    <router-view/>
  </div>
  <div class="bg-blue-6 footer" style=" width: 100%; top:100%; margin-top: 12px">
    здесь будет футер
    <q-btn dense :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/main')">PXE</q-btn>
    <q-btn dense :ripple="false" no-caps class="q-pa-xs q-ma-sm" @click="$router.push('/dictionary')">Словарь</q-btn>
  </div>
</div>

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

<style>
</style>