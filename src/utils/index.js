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
