<template>
  <div class="header">
    <div class="header__wrap">
      <a class="header__wrap__item"
        @click="scrollTo('about')"
      >About</a>
      <a class="header__wrap__item"
        @click="scrollTo('project')"
      >Project</a>
      <a class="header__wrap__item"
        @click="scrollTo('activity')"
      >Activity</a>
    </div>
  </div>
</template>

<script>
import animateScrollTo from 'animated-scroll-to'

export default {
  name: 'headerMenu',
  data () {
    return {
      scrolling: false
    }
  },
  methods: {
    scrollTo (target) {
      if (this.scrolling) {
        return
      }

      this.scrolling = true
      animateScrollTo(document.getElementById(target)).finally(() => {
        this.scrolling = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  color: #ffffff;
  background-color: $primary;
  z-index: 9998;

  &__wrap {
    line-height: 50px;
    width: 100%;
    text-align: center;

    &__item {
      cursor: pointer;
      display: inline-block;
      margin: 0 1rem;
      text-align: center;
      font-size: 1.2rem;
      color: inherit;

      &:visited {
        color: inherit;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
