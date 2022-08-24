<template>
  <div>
    <iframe id="monitor" src="http://bingjunx.com" scrolling="auto" frameborder="1" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    /**
   * iframe-宽高自适应显示
   */
    function changeMobsfIframe() {
      const mobsf = document.getElementById('monitor')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      mobsf.style.width = (Number(deviceWidth) - 240) + 'px' // 数字是页面布局宽度差值
      mobsf.style.height = (Number(deviceHeight) - 64) + 'px' // 数字是页面布局高度差
    }

    function uploadLoginForm() {
      // document.getElementById('current-password').value = 'admin'
      const monitor = document.getElementById('monitor')
      if (monitor.attachEvent) {
        monitor.attachEvent('onload', function() {
          // iframe加载完成后你需要进行的操作
          console.log(monitor)
        })
      } else {
        monitor.onload = function() {
          // iframe加载完成后你需要进行的操作
          if (typeof monitor.contentWindow.document.getElementsByName('user')[0] !== 'undefined' && typeof monitor.contentWindow.document.getElementById('current-password') !== 'undefined') {
            monitor.contentWindow.document.getElementsByName('user')[0].value = 'admin'
            monitor.contentWindow.document.getElementById('current-password').value = 'password'
          }
          // 以下模拟点击代码无效
          // monitor.contentWindow.document.getElementsByClassName('css-1wkrg9j-button')[0].click()
        }
      }
    }

    changeMobsfIframe()
    uploadLoginForm()

    window.onresize = function() {
      changeMobsfIframe()
    }
  }
}
</script>
