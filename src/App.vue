<template>
  <div id="app">
    <transition :name="transition">
      <Loading @load="onLoad" v-if="view === 'loading'"/>
      <Main :headerTransparent="headerTransparent" v-if="view === 'main'"/>
    </transition>
  </div>
</template>

<script>
import Loading from './views/Loading.vue'
import Main from './views/Main.vue'

export default {
  name: 'app',
  components: {
    Loading,
    Main
  },
  data () {
    return {
      view: 'loading',
      transition: 'loading',
      headerTransparent: true
    }
  },
  methods: {
    onLoad () {
      this.view = 'main'
      setTimeout(() => {
        this.transition = 'fade'
      }, 500)
    }
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
  position: relative;
}

.loading {
  &-enter-active {
    transition: .5s;
  }

  &-leave-active {
    transition: .5s;
  }

  &-leave {
    z-index: 0;
  }

  &-leave-to {
    transform: translateY(calc(300px - 100%));
  }

  &-enter {
    z-index: 1;
    opacity: 0;
  }

  &-enter-to {
    opacity: 1;
  }
}

.fade {
  &-enter-active, &-leave-active {
    transition: opacity .4s;
  }

  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
