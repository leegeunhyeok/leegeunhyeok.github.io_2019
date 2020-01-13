<template>
  <div class="activity" id="activity">
    <div class="activity__title">Career</div>
    <ul class="career">
      <li class="career__line" v-for="(c, i) in career" :key="i">
        <div class="career__item">
          <h2 class="career__item__title">{{ c.name }}, {{ c.dept }}</h2>
          <p class="career__item__date">{{ c.period }}</p>
          <div class="career__item__content">
            {{ c.work }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'activityContent',
  props: {
    data: Object
  },
  computed: {
    career () {
      return this.data.career
    },
    awards () {
      return this.data.awards
    },
    activity () {
      return this.data.activity
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

@mixin career-dot {
  position: absolute;
  display: block;
  top: 25px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $primary;
}

.activity {
  text-align: center;

  @mixin item {
    margin-top: 2rem;
    color: transparentize($text, 0.3);

    &__title {
      color: $text;
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
  }

  &__title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: $text;
    margin-bottom: 2rem;
  }
}

.career {
  padding: 0;

  &__line {
    list-style-type: none;
    width: 6px;
    background-color: lighten($text, 50%);

    &:nth-child(1) {
      -webkit-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
      -moz-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
      -ms-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
      -o-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
    }

    &:nth-last-child(1) {
      -webkit-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
      -moz-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
      -ms-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
      -o-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
      background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
    }

    margin: auto;
    padding: 2rem 0;

    &::after {
      content: " ";
      display: block;
      height: 100%;
      clear: both;
      visibility: hidden;
    }

    @include screen-width(md) {
      padding-bottom: 0;
    }

    &:nth-child(even) .career__item{
      position: relative;
      float: right;
      text-align: right;

      @include screen-width(md) {
        text-align: center;
        float: none;
      }

      &::before {
        content: '';
        @include career-dot;
        right: -5px;
        left: unset;
      }
    }
  }

  &__item {
    position: relative;
    width: 380px;
    padding: 0 2rem;
    float: left;
    text-align: left;

    &::before {
      content: '';
      @include career-dot;
      left: -5px;
    }

    @include screen-width(md) {
      text-align: center;
      -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
    }

    &__title {
      margin-bottom: 0;

      @include screen-width(md) {
        background-color: lighten($text, 50%);
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        padding: .5rem 0;
      }
    }

    &__date {
      margin-top: 0;
      color: lighten($text, 30%);

      @include screen-width(md) {
        background-color: #fff;
        margin: 0;
        border-left: 1px solid lighten($text, 50%);
        border-right: 1px solid lighten($text, 50%);
      }
    }

    &__content {
      color: lighten($text, 5%);

      @include screen-width(md) {
        background-color: #fff;
        margin: 0;
        padding: 1rem 0;
        border: 1px solid lighten($text, 50%);
        border-top: 0;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
      }
    }
  }
}
</style>
