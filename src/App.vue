<template>
  <div id="app">
    <Loading/>
  </div>
</template>

<script>
import Loading from './components/Loading.vue'

export default {
  name: 'app',
  components: {
    Loading
  }
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

* {
  box-sizing: border-box;
}

html, body {
  @include wh-100;
  padding: 0;
  margin: 0;
}

#app {
  @include wh-100;
}
</style>
