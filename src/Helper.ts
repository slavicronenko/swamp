export const requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window['mozRequestAnimationFrame']
  || window['msRequestAnimationFrame'];
