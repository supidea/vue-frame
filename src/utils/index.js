/**
 * 简单的节流函数 - 只允许一个函数在 X 毫秒内执行一次。
 * @param {Function} func 回调函数
 * @param {Number} wait 延迟多长时间
 * @param {Number} mustRun 至少多长时间触发一次
 */
export function throttle(func, wait, mustRun) {
  let timeout, startTime = new Date()

  return function () {
    let context = this, args = arguments, curTime = +new Date()

    clearTimeout(timeout)

    // 如果达到了规定的触发时间间隔，触发 handler。没达到触发间隔，重新设定定时器
    if (curTime - startTime >= mustRun) {
      func.apply(context, args)
      startTime = curTime
    } else {
      timeout = setTimeout(func, wait)
    }
  }
}

/**
 * 防抖动函数 就是让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，而在这个等待时间内再次触发此函数，等待时间会重新计算。
 * @param {Function} func 回调函数
 * @param {Number} wait 延迟时间
 * @param {Boolean} immediate 时间开始时触发还是时间结束后触发
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function () {
    let context = this, args = arguments
    let later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/**
 * 数字转中文
 * @param {Int} num 整形数字
 */
export function numberToChinese(num) {
  let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  let chnUnitChar = ['', '十', '百', '千']
  let unitPos = 0
  let strIns = '', chnStr = ''
  let needZero = false

  function SectionToChinese(section) {
    let strIns = '', chnStr = ''
    let unitPos = 0
    let zero = true
    while (section > 0) {
      let v = section % 10
      if (v === 0) {
        if (!zero) {
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
    return chnStr
  }

  if (num === 0) {
    return chnNumChar[0]
  }

  while (num > 0) {
    let section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = (section < 1000) && (section > 0)
    num = Math.floor(num / 10000)
    unitPos++
  }

  return chnStr
}
