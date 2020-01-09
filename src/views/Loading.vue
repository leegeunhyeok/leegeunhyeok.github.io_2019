<template>
  <div class="loading">
    <div class="loading__wave" :style="waveStyle">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
          <use xlink:href="#wave" x="48" y="0"
            :fill="currentWaveColor + ', .7)'"
          />
          <use xlink:href="#wave" x="48" y="3"
            :fill="currentWaveColor + ', .5)'"
          />
          <use xlink:href="#wave" x="48" y="5"
            :fill="currentWaveColor + ', .3)'"
          />
          <use xlink:href="#wave" x="48" y="7"
            :fill="currentWaveColor + ', 1)'"
          />
        </g>
      </svg>
    </div>
    <div class="loading__text" :style="textStyle" v-if="error">
      Error
    </div>
    <transition name="fade" mode="out-in">
      <div class="loading__text" :style="textStyle" v-if="!error && !loaded">
        {{ progress }}%
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { delay } from '@/util'

// 정적 파일 목록
const STATIC_FILELIST = [
  '/images/me.jpg'
]

export default {
  name: 'Loading',
  data () {
    return {
      loaded: false,
      imageCount: STATIC_FILELIST.length,
      imageLoaded: 0,
      progress: 0,
      progressInterval: null,
      error: false
    }
  },
  computed: {
    textStyle () {
      if (this.currentPercent < 45 && !this.error) {
        return {
          color: '#408cea'
        }
      } else {
        return {
          color: '#ffffff'
        }
      }
    },
    waveStyle () {
      if (this.error) {
        return {
          'background-color': 'tomato',
          '-webkit-transform': 'translateY(0%)',
          'transform': 'translateY(0%)'
        }
      } else {
        const style = `translateY(${100 - this.currentPercent}%)`
        return {
          '-webkit-transform': style,
          'transform': style
        }
      }
    },
    currentWaveColor () {
      if (this.error) {
        return 'rgba(255, 99, 71'
      } else {
        return 'rgba(64, 140, 234'
      }
    },
    currentPercent () {
      return parseInt(this.imageLoaded / this.imageCount * 100) || 0
    }
  },
  watch: {
    currentPercent () {
      this.updateProgress()
    }
  },
  created () {
    const activityReq = axios.get('/data/activity.json')
    const projectReq = axios.get('/data/project.json')
    axios.all([ activityReq, projectReq ])
      .then(axios.spread((...responses) => {
        const activityData = responses[0].data || []
        const projectData = responses[1].data || []

        const activityPromises = activityData.map((activity, idx) => {
          let fetchImage = Promise.resolve()
          if (activity.image) {
            ++this.imageCount
            fetchImage = this.imagePreloader('/images/' + activity.image)
          }

          return fetchImage
        })

        const projectPromises = projectData.map((project, idx) => {
          let fetchImage = Promise.resolve()
          const fetchList = []

          if (project.image) {
            ++this.imageCount
            fetchImage = this.imagePreloader('/images/' + project.image)
          }

          (project.detail || []).forEach(d => {
            if (d.image) {
              ++this.imageCount
              fetchList.push(this.imagePreloader('/images/' + d.image))
            }
          })

          return Promise.all([ fetchImage ].concat(fetchList))
        })

        const staticPromises = STATIC_FILELIST.map(resource => {
          return this.imagePreloader(resource)
        })

        Promise.all([
          ...activityPromises,
          ...projectPromises,
          ...staticPromises
        ])
          .then(async () => {
            await delay(750)
            this.loaded = true
            await delay(250)
            this.$emit('load', {
              activity: activityData,
              project: projectData
            })
          })
      }))
      .catch(e => {
        console.error(e)
        this.error = true
      })
  },
  methods: {
    updateProgress () {
      clearInterval(this.progressInterval)
      this.progressInterval = setInterval(() => {
        if (this.progress !== this.currentPercent) {
          const delta = (this.currentPercent - this.progress) / 10
          const tick = delta >= 0 ? Math.ceil(delta) : Math.floot(delta)
          this.progress += tick
        }
      }, 10)
    },
    imagePreloader (src) {
      return new Promise((resolve, reject) => {
        const _resolve = () => {
          ++this.imageLoaded
          resolve()
        }

        const img = new Image()
        img.src = src
        img.onload = () => {
          _resolve()
        }

        img.onerror = e => {
          console.error(e)
          _resolve()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/common.scss';

.loading {
  @include wh-100;
  position: relative;
  top: 0;
  left: 0;
  background-color: #ffffff;
  overflow: hidden;

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3.5rem;
    font-weight: bold;
    -webkit-transition: color .5s;
            transition: color .5s;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }

  &__wave {
    @include wh-100;
    background-color: $primary;
    -webkit-transition: transform .5s ease-out;
            transition: transform .5s ease-out;

    & .parallax > use {
      animation: wave 1s cubic-bezier(.55, .5, .45, .5) infinite;
    }

    & .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 1s;
    }

    & .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 1.5s;
    }

    & .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 2s;
    }

    & .parallax > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 2.5s;
    }

    svg {
      -webkit-transform: translateY(-99%);
              transform: translateY(-99%);
    }
  }
}

@keyframes wave {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
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
