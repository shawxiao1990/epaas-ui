export default {
  inserted: function(el) {
    const dragDom = el.querySelector('.el-dialog')
    dragDom.style.cursor = 'e-resize'
    const dialogHeader = el.querySelector('.el-dialog__header')
    dialogHeader.style.cursor = 'auto'
    // 存储的宽度,需要id存储
    const dialogWidth = localStorage.getItem('dialogWidth')
    let dialogWidthObj = {}
    if (dialogWidth && el.id) {
      dialogWidthObj = JSON.parse(dialogWidth)
      const sw = dialogWidthObj[el.id]
      if (sw) {
        dragDom.style.width = `${sw}px`
      }
    }
    dragDom.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX
      const w = dragDom.clientWidth
      const minW = 300
      const maxW = document.body.clientWidth
      var nw
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        // 改变当前元素宽度，不可超过最小最大值
        nw = w - l
        nw = nw < minW ? minW : nw
        nw = nw > maxW ? maxW : nw
        dragDom.style.width = `${nw}px`

        if (el.id) {
          dialogWidthObj[el.id] = nw
          localStorage.setItem('dialogWidth', JSON.stringify(dialogWidthObj))
        }
      }

      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  update: function(el) {
    const dialogBody = el.querySelector('.el-dialog__body')
    if (dialogBody) {
      dialogBody.style.margin = '0 20px'
      dialogBody.style.padding = '30px 0'
      dialogBody.style.cursor = 'auto'
    }
  }
}

