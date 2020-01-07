<template>
  <div class="header">
    <div class="header__wrap">
      <div class="header__wrap__item"
        @click="scrollTo('about')"
      >About</div>
      <div class="header__wrap__item"
        @click="scrollTo('project')"
      >Project</div>
      <div class="header__wrap__item"
        @click="scrollTo('activity')"
      >Activity</div>
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

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
