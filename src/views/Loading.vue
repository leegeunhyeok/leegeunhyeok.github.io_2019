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
    <div class="loading__text" :style="textStyle" v-else>
      {{ currentPercent }}%
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dataStore from '@/data-store'

const STATIC_FILELIST = [
  '/images/me.jpg'
]

export default {
  name: 'Loading',
  data () {
    return {
      loadPercent: 0,
      imageCount: STATIC_FILELIST.length,
      imageLoaded: 0,
      error: false
    }
  },
  computed: {
    textStyle () {
      if (this.loadPercent < 45 && !this.error) {
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
        const style = `translateY(${100 - 100}%)`
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
  created () {
    const activityReq = axios.get('/data/activity.json')
    const projectReq = axios.get('/data/project.json')
    axios.all([ activityReq, projectReq ])
      .then(axios.spread((...responses) => {
        const db = dataStore()
        console.log(responses[0])
        const activityData = responses[0].data || []
        const projectData = responses[1].data || []

        const activityPromises = activityData.map((activity, idx) => {
          let fetchImage = Promise.resolve()
          if (activity.image) {
            ++this.imageCount
            fetchImage = this.imagePreloader('/images/' + activity.image)
          }

          return Promise.all([
            db.saveActivity({
              id: idx,
              ...activity
            }),
            fetchImage
          ])
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
              fetchList.push(this.imagePreloader('/images/' + project.image))
            }
          })

          return Promise.all([
            db.saveProject({
              id: idx,
              ...project
            }),
            ...[ fetchImage ].concat(fetchList)
          ])
        })

        const staticPromises = STATIC_FILELIST.map(resource => {
          return this.imagePreloader(resource)
        })

        Promise.all([
          ...activityPromises,
          ...projectPromises,
          ...staticPromises
        ])
          .then(() => {
            this.$emit('load', {
              activity: activityData,
              project: projectData
            })
          })
      }))
      .catch(e => {
        console.error(e)
        const db = dataStore()
        const data = {}

        db.getActivities()
          .then(activities => {
            if (!activities.length) {
              throw new Error('No activity data')
            }
            data.activity = activities
            return db.getProjects()
          })
          .then(projects => {
            if (!projects.length) {
              throw new Error('No project data')
            }
            data.project = projects
            this.$emit('load', data)
          })
          .catch(e => {
            console.error(e)
            this.error = true
          })
      })
  },
  methods: {
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
    -webkit-transition: transform .3s ease-out;
            transition: transform .3s ease-out;

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
</style>
