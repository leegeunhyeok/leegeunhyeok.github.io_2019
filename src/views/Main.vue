<template>
  <div class="main">
    <Header/>
    <div class="main__message">
      <div class="main__message__wrap">
        <h1>{{ message }}</h1>
        <span class="cursor"
          :class="{ idle: !messageWriting }"
        >
        </span>
        <br>
        <p>Programming is my life</p>
      </div>
    </div>
    <div class="main__content--delay">
      <About @message="onMessage"/>
    </div>
    <div class="main__content">
      <Activity :data="activity" :scroll="scrollY" @message="onMessage"/>
    </div>
    <Message :message="alertMessage" v-show="showAlertMessage"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Message from '@/components/Message'
import About from '@/views/contents/About'
import Activity from '@/views/contents/Activity'
import { delay } from '@/util'

const MESSAGE_LIST = [
  'Hello, World!',
  'Developer',
  'Front-End'
]

export default {
  name: 'home',
  components: {
    Header,
    Message,
    About,
    Activity
  },
  props: {
    data: Object
  },
  data () {
    return {
      alertMessage: '',
      showAlertMessage: false,
      messageTimeout: null,
      message: '',
      messageIndex: 0,
      messageWriting: true,
      activity: [],
      project: [],
      scrollY: 0
    }
  },
  created () {
    const { activity, project } = this.data
    this.activity = activity
    this.project = project
  },
  mounted () {
    setTimeout(this.updateMessage, 500)
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    updateMessage () {
      this.messageWriting = true
      const currentMessage = MESSAGE_LIST[this.messageIndex]
        .split('')
        .concat([''])

      currentMessage.reduce((p, c, idx) => {
        return p.then(async () => {
          if (currentMessage.length - 1 === idx) {
            await delay(300)
            this.messageWriting = false
            await delay(1900)
            this.removeMessage()
            return
          }

          await delay(160)
          this.message += c
        })
      }, Promise.resolve())
    },
    async removeMessage () {
      this.messageWriting = true
      if (this.message.length) {
        await delay(80)
        this.message = this.message.slice(0, this.message.length - 1)
        this.removeMessage()
      } else {
        if (this.messageIndex + 1 === MESSAGE_LIST.length) {
          this.messageIndex = 0
        } else {
          this.messageIndex = this.messageIndex + 1
        }
        await delay(400)
        this.updateMessage()
      }
    },
    onMessage (message) {
      clearTimeout(this.messageTimeout)
      if (this.showAlertMessage) {
        this.showAlertMessage = false
        this.messageTimeout = setTimeout(() => {
          this.onMessage(message)
        }, 500)
      } else {
        this.alertMessage = message
        this.showAlertMessage = true
        this.messageTimeout = setTimeout(() => {
          this.showAlertMessage = false
        }, 3000)
      }
    },
    onScroll () {
      this.scrollY = window.scrollY
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  body.loaded & {
    background-color: #ffffff;
  }

  &__message {
    display: flex;
    align-items: center;
    width: 100%;
    height: 300px;
    padding-top: 36px;
    background-color: $primary;
    color: #fff;
    text-align: center;

    &__wrap {
      flex-grow: 1;

      h1 {
        display: inline;
        margin: 0;
        font-size: 3rem;
      }

      p {
        opacity: .6;
      }

      & .cursor {
        display: inline-block;
        width: 15px;
        height: 6px;
        margin-left: 2px;
        background-color: #fff;

        &.idle {
          -webkit-animation: blink 1s step-start 0s infinite;
                  animation: blink 1s step-start 0s infinite;
        }
      }
    }
  }

  @mixin content {
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding: 2rem 1rem;

    &__title {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: $text;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }

  &__content {
    @include content;

    &--delay {
      @include content;
      opacity: 0;
      -webkit-animation: fade 1s .5s forwards;
              animation: fade 1s .5s forwards;
    }
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
@-webkit-keyframes blink {
  50% {
    opacity: 0;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
