<template>
  <transition name="message">
    <div class="message">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  name: 'message',
  props: {
    message: String
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.message {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  background-color: $primary;
  padding: .5rem;
  text-align: center;
  z-index: 9999;
}

.message {
  &-enter-active, &-leave-active {
    transition: transform .5s;
  }

  &-enter, &-leave-to {
    transform: translateY(100%);
  }
}
</style>
