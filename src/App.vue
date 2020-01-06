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

@import url('https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Do Hyeon', sans-serif;
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
