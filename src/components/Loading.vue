<template>
  <div class="loading">
    <div class="loading__wave" :style="waveStyle">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
          <use xlink:href="#wave" x="48" y="0" fill="rgba(64, 140, 234, .7)"/>
          <use xlink:href="#wave" x="48" y="3" fill="rgba(64, 140, 234, .5)"/>
          <use xlink:href="#wave" x="48" y="5" fill="rgba(64, 140, 234, .3)"/>
          <use xlink:href="#wave" x="48" y="7" fill="rgba(64, 140, 234, 1)"/>
        </g>
      </svg>
    </div>
    <div class="loading__text" :style="textStyle">
      {{ loadPercent }}%
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dataStore from '@/data-store'

export default {
  name: 'Loading',
  data () {
    return {
      loadPercent: 0
    }
  },
  computed: {
    textStyle () {
      if (this.loadPercent < 45) {
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
      const style = `translateY(${100 - this.loadPercent}%)`
      return {
        '-webkit-transform': style,
        'transform': style
      }
    }
  },
  created () {
    const activityReq = axios.get('/data/activity.json')
    const projectReq = axios.get('/data/project.json')
    axios.all([ activityReq, projectReq ])
      .then(axios.spread((...responses) => {
        const db = dataStore()
        const activityData = responses[0]
        const projectData = responses[1]

        activityData.map((activity, idx) => {
          return db.saveActivity({
            id: idx,
            ...activity
          })
        })

        projectData.map((project, idx) => {
          return db.saveProject({
            id: idx,
            ...project
          })
        })
      }))
      .catch(e => {
        console.error(e)
      })
  },
  mounted () {
    const load = () => {
      if (this.loadPercent < 100) {
        setTimeout(() => {
          this.loadPercent += 5
          load()
        }, 100)
      }
    }

    load()
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/common.scss';

.loading {
  @include wh-100;
  position: relative;
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
      animation: wave 10s cubic-bezier(.55, .5, .45, .5) infinite;
    }

    & .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
    }

    & .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
    }

    & .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }

    & .parallax > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
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
