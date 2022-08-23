<template>
  <div id="xterm" class="xterm" />
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import store from '@/store'

export default {
  name: 'Xterm',
  props: {
    ip: {
      type: String,
      default: null
    }, // 通过父组件传递登录ip
    socketURI: {
      type: String,
      default: 'ws://' + process.env.VUE_APP_BACKEND_SOCKET + '/api/v1/server/socket'
    },
    log: {
      type: Boolean,
      default: false
    } // 通过父组件传递执行一次性任务的选项
  },
  data() {
    return {
      cursorStyle: 'underline',
      cursorBlink: true,
      step: 0
    }
  },
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term && this.term.dispose()
  },
  methods: {
    initTerm() {
      if (this.log === true) {
        this.cursorStyle = ''
        this.cursorBlink = false
      }
      const term = new Terminal({
        rendererType: 'canvas', // 渲染类型
        // rows: 100, // 行数
        // cols: 100, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, // 启用时，光标将设置为下一行的开头
        //   scrollback: 50, //终端中的回滚量
        disableStdin: false, // 是否应禁用输入。
        windowsMode: true, // 根据窗口换行
        cursorStyle: this.cursorStyle, // 光标样式
        cursorBlink: this.cursorBlink // 光标闪烁
        // theme: {
        //   foreground: '#7e9192', // 字体
        //   background: '#002833', // 背景色
        //   cursor: 'help', // 设置光标
        //   lineHeight: 16
        // }
      })
      this.term = term
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      this.term.loadAddon(attachAddon)
      this.term.loadAddon(fitAddon)
      this.fitAddon = fitAddon
      const element = document.getElementById('xterm')
      this.term.open(element)
      // 自适应大小(使终端的尺寸和几何尺寸适合于终端容器的尺寸)，初始化的时候宽高都是对的
      fitAddon.fit()
      this.term.focus()
    },
    initSocket() {
      if (this.socketURI === '') {
        return
      }
      this.socket = new WebSocket(this.socketURI + '/' + store.getters.token + '/' + this.ip + '/' + this.log)
      this.socketOnMessage()
      this.socketOnClose()
      this.socketOnOpen()
      this.socketOnError()
    },
    socketOnMessage() {
      this.socket.onmessage = e => {
        if (e.data === 'SUCCESS DONE') {
          this.step = this.step + 1
        } else if (e.data === 'SUCCESS END DONE') {
          this.step = this.step + 1
          this.socketOnClose()
        }
        this.$emit('currentStep', this.step)
      }
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        console.log('web链接成功')
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        this.socket.close()
        console.log('关闭 socket')
        // if (this.socket) {
        //   this.socket.close();
        // }
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        console.log('socket 链接失败')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.terminal {
  display: flex;
  width: 100%;
  min-height: var(--terminal-height);
  flex: 1;
  background-color: #000;
}
.terminal > div {
  flex: 1;
}
</style>

