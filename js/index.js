import { handleLyric } from './setLyrc.js'
import lyricses from './lyric.js'

// 存歌词的容器
let oCon = document.querySelector('.content')
// audio
let audio = document.querySelector('audio')
// 是否播放图标
let isPlay = document.querySelector('.chc-iconfont')
// 进度条
let progress = document.querySelector('progress')
// 展示隐藏歌词按钮
let lyric_btn = document.querySelector('.lyric_btn')
// 歌词蒙版（黑色背景）
let lyricRef = document.querySelector('.lyricRef')
// 歌词最外层包裹的盒子
// let lyric = document.querySelector('.lyric')

// 控制歌词页面 加载 与 隐藏
let flag = true
let lyrics = []
// 起始
let beginTime = 0
// 结束
let overTime = 0
let n = 0

window.addEventListener('load', () => {
  lyrics = handleLyric(lyricses[0])
  for (let i = 0; i < lyrics.length; i++) {
    oCon.innerHTML += `<div class="chc-lyrc" style="text-align: center;" id="${(lyrics[i].time / 1000).toFixed(0)}">${lyrics[i].text}</div>`
  }
})

// 控制按钮旋转方法
function rotate() {
  if (flag) {
    lyric_btn.style.transform = `rotate(180deg)`
    flag = false
  } else {
    lyric_btn.style.transform = `rotate(0deg)`
    flag = true
  }
}

// 播放方法
function playFunction() {
  isPlay.className = 'iconfont icon-pause chc-iconfont'
  audio.play()
  overTime = Number(audio.duration).toFixed(3)
  progress.max = overTime
}

// 音频播放时
isPlay.addEventListener('click', () => {
  if (isPlay.className === 'iconfont icon-play chc-iconfont') {
    playFunction()
  } else {
    isPlay.className = 'iconfont icon-play chc-iconfont'
    audio.pause()
  }
})

audio.addEventListener('timeupdate', () => {
  // 每个歌词块
  const ap = document.querySelectorAll('.chc-lyrc')
  beginTime = Number(audio.currentTime).toFixed(0) // 当前播放器当前时间
  progress.value = beginTime
  if (document.getElementById(Number(audio.currentTime).toFixed(0))) {
    for (let i = 0; i < ap.length; i++) {
      ap[i].style.cssText = 'color: black; text-align: center;'
    }
    document.getElementById(beginTime).style.color = 'white'
    if (ap[5 + n].id === beginTime) {
      oCon.style.top = `${-n * 62}px`
      n++
    }
  }
})

audio.addEventListener('ended', () => {
  isPlay.className = 'iconfont icon-play chc-iconfont'
  audio.pause()
  progress.value = 0
})

// 是否显示歌词蒙版（黑色背景）
lyric_btn.addEventListener('click', () => {
  rotate()
  flag === false ? lyricRef.classList.add('ani') : lyricRef.classList.remove('ani')
})
