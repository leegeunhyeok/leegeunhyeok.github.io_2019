<template>
  <div class="about" id="about">
    <div class="about__image">
      <img alt="ghlee" src="/images/me.jpg">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'about '
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.about {
  text-align: center;

  &__image {
    padding-top: 4rem;
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

    &__item {
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
  }
}
</style>
