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

.activity {
  text-align: center;

  @mixin item {
    margin-top: 2rem;
    color: transparentize($text, 0.3);

    &__title {
      color: $text;
      word-break: keep-all;
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

@mixin career-dot {
  position: absolute;
  display: block;
  top: 25px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: $primary;

  @include screen-width(sm) {
    right: unset !important;
    left: -11px !important;
  }
}

@mixin career-start-line {
  -webkit-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
  -moz-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
  -ms-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
  -o-background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, lighten($text, 50%) 8%);
}

@mixin career-end-line {
  -webkit-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
  -moz-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
  -ms-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
  -o-background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
  background: linear-gradient(to bottom, lighten($text, 50%) 92%, rgba(0, 0, 0, 0) 100%);
}

.career {
  padding: 0;

  &__line {
    list-style-type: none;
    width: 6px;
    margin: auto;
    padding: 2rem 0;
    background-color: lighten($text, 50%);

    &:nth-child(1) {
      @include career-start-line;
    }

    &:nth-last-child(1) {
      @include career-end-line;
    }

    &::after {
      content: " ";
      display: block;
      height: 100%;
      clear: both;
      visibility: hidden;
    }

    @include screen-width(sm) {
      padding-bottom: 0;
      margin: 0;
      width: 100%;
      background: none !important;
      border-left: 6px solid lighten($text, 50%);
    }

    &:nth-child(even) .career__item{
      position: relative;
      float: right;
      text-align: right;
      padding-left: 0;
      padding-right: 2rem;

      @include screen-width(sm) {
        float: none;
        text-align: left;
        padding-left: 2rem;
        padding-right: 0;
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
    width: 300px;
    padding-left: 2rem;
    float: left;
    text-align: left;

    &::before {
      content: '';
      @include career-dot;
      left: -5px;
    }

    @include screen-width(sm) {
      text-align: left;
      padding-right: 0;
      width: 100%;
    }

    &__title {
      margin-bottom: 0;
      word-break: keep-all;
    }

    &__date {
      margin-top: 0;
      color: lighten($text, 30%);
    }

    &__content {
      color: lighten($text, 5%);
    }
  }
}
</style>
