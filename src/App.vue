<template>
  <div id="app">
    <transition :name="transition" mode="out-in">
      <Loading @load="onLoad" v-if="view === 'loading'"/>
      <div v-if="view === 'main'">
        Hello
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from './views/Loading.vue'

export default {
  name: 'app',
  components: {
    Loading
  },
  data () {
    return {
      view: 'loading',
      transition: 'loading'
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
}

.loading {
  &-enter-active {
    z-index: 1;
    transition: .4s;
  }

  &-leave-active {
    z-index: 0;
    transition: .39s;
  }

  &-leave-to {
    z-index: 0;
    transform: translateY(-50%);
  }

  &-leave {
    z-index: 0;
    transform: translateY(0);
  }

  &-enter {
    z-index: 1;
    transform: translateY(50%);
  }

  &-enter-to {
    z-index: 1;
    transform: translateY(100%);
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
