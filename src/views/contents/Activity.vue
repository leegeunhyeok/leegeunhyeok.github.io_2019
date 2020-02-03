<template>
  <div class="activity-content" id="activity">
    <div class="activity-content__wrap">
      <div class="activity-content__title">&lt; Career &gt;</div>
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
    <div class="activity-content__wrap">
      <div class="activity-content__title">&lt; Awards &gt;</div>
      <div class="awards" ref="awards">
        <div class="awards__item" v-for="(a, i) in awards"
          :class="{
            fog: awardsOffset[i] <= scroll
          }"
          :ref="'a' + i"
          :key="i"
        >
          <h2 class="awards__item__title">{{ a.title }}</h2>
          <h2 class="awards__item__grade">{{ a.grade }}</h2>
          <p class="awards__item__date">{{ a.date }}</p>
          <div class="awards__item__content">
            {{ a.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="activity-content__wrap">
      <div class="activity-content__title">&lt; Activity &gt;</div>
      <div class="activity">
        <div class="activity__item" v-for="(a, i) in activity" :key="i">
          <h2 class="activity__item__title">{{ a.title }}</h2>
          <p class="activity__item__date">{{ a.date }}</p>
          <div class="activity__item__content">
            {{ a.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activityContent',
  props: {
    data: Object,
    scroll: Number
  },
  data () {
    return {
      transform: [],
      awardsOffset: [],
      sticky: false
    }
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
  },
  mounted () {
    this.updateAwardsOffset()
    window.addEventListener('resize', this.updateAwardsOffset)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateAwardsOffset)
  },
  methods: {
    updateAwardsOffset () {
      this.awardsOffset = new Array(this.data.awards.length).fill(0)
      this.data.awards.forEach((_, i) => {
        const offsetTop = this.$refs['a' + i][0].getBoundingClientRect().top
        const scrollTop = window.pageYOffset ||
          document.documentElement.scrollTop
        this.awardsOffset[i] = offsetTop + scrollTop
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.activity-content {
  text-align: center;

  &__wrap {
    position: relative;
    padding: 2rem 0;
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
  -webkit-background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, lighten($primary, 30%) 8%);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, lighten($primary, 30%) 8%);
}

@mixin career-end-line {
  -webkit-background: -webkit-linear-gradient(to bottom, lighten($primary, 30%) 92%, rgba(255, 255, 255, 1) 100%);
  background: linear-gradient(to bottom, lighten($primary, 30%) 92%, rgba(255, 255, 255, 1) 100%);
}

.career {
  padding: 0;

  @include screen-width(sm) {
    padding-left: 6%;
  }

  &__line {
    list-style-type: none;
    width: 6px;
    margin: auto;
    padding: 2rem 0;
    background-color: lighten($primary, 30%);

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
      border-left: 6px solid lighten($primary, 30%);
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

.awards {
  position: relative;
  padding: 0;

  &__item {
    width: 100%;
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid $secondary;
    -webkit-transition: .75s;
            transition: .75s;

    &.fog {
      opacity: .2;
    }

    &__title {
      margin: 0;
      word-break: keep-all;
      color: #000;
    }

    &__grade {
      display: inline-block;
      background-color: $primary;
      padding: .5rem 1rem;
      border-radius: 2rem;
      color: #fff;
      font-size: 1.2rem;
      word-break: keep-all;
    }

    &__date {
      margin-top: 0;
      margin-bottom: .6rem;
      color: lighten($text, 30%);
    }

    &__content {
      color: lighten($text, 10%);
    }
  }
}

.activity {
  &__item {
    position: relative;
    width: 100%;
    padding: 0 2rem;
    text-align: center;

    &__title {
      margin-bottom: 0;
      word-break: keep-all;
    }

    &__date {
      margin-top: 0;
      margin-bottom: .6rem;
      color: lighten($text, 30%);
    }

    &__content {
      color: lighten($text, 5%);
    }
  }
}
</style>
