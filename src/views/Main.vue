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
        <p>Code is my life.</p>
      </div>
    </div>
    <div class="main__content__delay">
      <div class="profile">
        <div class="profile__image">
          <img alt="ghlee" src="/images/me.jpg">
        </div>
        <div class="profile__name">이근혁</div>
        <div class="profile__name--en">Geunhyeok LEE</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { delay } from '@/util'

const MESSAGE_LIST = [
  'Hello, World!',
  'Developer',
  'Programmer'
]

export default {
  name: 'home',
  components: {
    Header
  },
  data () {
    return {
      message: '',
      messageIndex: 0,
      messageWriting: true
    }
  },
  mounted () {
    setTimeout(this.updateMessage, 500)
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    updateMessage () {
      this.messageWriting = true
      const currentMessage = (MESSAGE_LIST[this.messageIndex] + '').split('')
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
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/common.scss';

.main {
  @include wh-100;
  position: absolute;
  top: 0;
  left: 0;

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

  &__content {
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding-bottom: 4rem;

    &__delay {
      width: 100%;
      max-width: 800px;
      margin: auto;
      padding-bottom: 4rem;
      opacity: 0;
      -webkit-animation: fade 1s .5s forwards;
              animation: fade 1s .5s forwards;
    }
  }
}

.profile {
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
