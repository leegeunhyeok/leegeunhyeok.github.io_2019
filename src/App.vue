<template>
  <div id="app">
    <transition :name="transition">
      <Loading @load="onLoad" v-if="view === 'loading'"/>
      <Main :data="data" v-if="view === 'main'"/>
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
      data: null
    }
  },
  created () {
    window.__VERSION__ = process.env.VERSION

    if (process.env.NODE_ENV === 'development') {
      this.view = 'main'
      this.transition = 'main'
      const data = {
        activity: require('../data/activity.json'),
        project: require('../data/project.json')
      }
      this.onLoad(data)
    }
  },
  methods: {
    onLoad (data) {
      this.data = data
      this.view = 'main'
      setTimeout(() => {
        document.body.classList.add('loaded')
        this.transition = 'fade'
      }, 1000)
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
  padding: 0;
  margin: 0;
}

body.loaded {
  background-color: $primary;
}

#app {
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
