<template>
  <div class="about" id="about">
    <div class="about__image">
      <img alt="ghlee" src="/images/me.jpg"
        @click="sendProfileMessage"
      >
    </div>
    <div class="about__name">이근혁</div>
    <div class="about__name--en">Geunhyeok LEE</div>
    <div class="about__social">
      <div class="about__social__item">
        <fa-icon :icon="['fas', 'envelope']"/>
        <a href="mailto:dev.ghlee@gmail.com">dev.ghlee@gmail.com</a>
      </div>
      <div class="about__social__item">
        <fa-icon :icon="['fab', 'github']"/>
        <a href="https://github.com/leegeunhyeok">leegeunhyeok</a>
      </div>
      <div class="about__social__item">
        <fa-icon :icon="['fab', 'linkedin']"/>
        <a href="https://www.linkedin.com/in/geunhyeok-lee-89b779185/">Geunhyeok LEE</a>
      </div>
      <div class="about__social__item">
        <fa-icon :icon="['fab', 'instagram']"/>
        <a href="http://instagram.com/_u/__dev.ghlee/">__dev.ghlee</a>
      </div>
      <div class="about__social__item--margin">
        <fa-icon :icon="['fas', 'blog']"/>
        <a href="https://blog.geundung.dev/">근둥이의 블로그</a>
      </div>
    </div>
  </div>
</template>

<script>
const EASTER_EGG = [
  '안녕하세요, 이근혁 입니다!',
  '네, 저에요',
  '눌러도 아무것도 없어요',
  '정말 아무일도 없을거에요',
  '끈기가 대단하시네요',
  '진짜 아무것도 없지만 말리진 않을게요',
  '...'
]

export default {
  name: 'aboutContent',
  data () {
    return {
      profileCount: 0
    }
  },
  methods: {
    sendProfileMessage () {
      const messageIndex = Math.min(this.profileCount++, EASTER_EGG.length - 1)
      const message = EASTER_EGG[messageIndex]
      this.$emit('message', message)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.about {
  text-align: center;

  &__image {
    padding-top: 2rem;
    padding-bottom: 1rem;

    img {
      width: 100%;
      height: 100%;
      max-width: 300px;
      max-height: 300px;
      min-width: 200px;
      min-height: 200px;
      border-radius: 50%;
      border: 1px solid #eeeeee;
    }
  }

  &__name {
    color: $text;
    font-size: 1.5rem;

    &--en {
      color: transparentize($text, 0.3);
    }
  }

  &__social {
    margin-top: 2rem;

    @mixin item {
      color: transparentize($text, 0.3);

      svg {
        margin-right: .3rem;
      }

      a {
        color: inherit;
        text-decoration: none;

        &:visited {
          color: inherit;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__item {
      @include item;

      &--margin {
        @include item;
        margin-top: 1rem;
      }
    }
  }
}
</style>
