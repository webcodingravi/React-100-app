import React, { useRef } from 'react'
import { Play, Plus, Maximize, Volume2, Pause, VolumeX } from 'lucide-react'
import { useState } from 'react'

const App=() => {
  const videoRef=useRef(null)
  const container=useRef(null)
  const [src, setSrc]=useState("/sample.mp4")
  const [playing, setPlaying]=useState(false)
  const [duration, setDuration]=useState("00:00")
  const [currentTime, setCurrentTime]=useState("00:00")
  const [progress, setProgress]=useState(0)
  const [muted, setMuted]=useState(false)


  const playPause=() => {
    const video=videoRef.current
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }

  }

  const addVideo=(e) => {
    const input=e.target
    const file=input.files[0]
    const url=URL.createObjectURL(file)
    setSrc(url)
  }

  const onLoadedMetadata=(e) => {
    if (src!=="/sample.mp4") {
      playPause();
      const video=e.currentTarget
      const duration=(video.duration/60).toFixed(2)
      setDuration(duration)

    }

  }
  const onTimeUpdate=(e) => {
    const video=e.currentTarget
    const time=(video.currentTime/60).toFixed(2)
    const p=(time/video.duration)*100
    console.log(p)
    setCurrentTime(time)
    setProgress(p)
  }

  const muteControl=() => {
    const video=videoRef.current
    if (video.muted) {
      video.muted=false
      setMuted(false)
    }
    else {
      video.muted=true
      setMuted(true)
    }
  }

  const toggleScreen=() => {
    const div=container.current
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    else {
      div.requestFullscreen()
    }

  }

  return (
    <>
      <div className='bg-gray-950 h-screen flex items-center justify-center'>
        <div className='relative w-9/12' ref={container}>
          <video src={src} ref={videoRef} className='w-full' onLoadedMetadata={onLoadedMetadata} onTimeUpdate={onTimeUpdate} />
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-40% to-transparent flex items-end justify-between'>
            <div className='px-6 py-4 space-x-6 flex items-center flex-1'>
              <button className='relative bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300 cursor-pointer'>
                <Plus />
                <input type="file" accept='video/*' onChange={addVideo} className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />
              </button>

              <button onClick={playPause} className='bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300 cursor-pointer'>
                {
                  playing?
                    <Pause />
                    :
                    <Play />
                }

              </button>

              <div className='w-full text-white flex gap-6'>
                <label className='font-medium'>{currentTime}/ {duration}</label>
                <div className='bg-white flex-1'>
                  <div className='bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 h-full' style={{ width: progress+"%" }}></div>
                </div>
              </div>
            </div>




            <div className='px-6 py-4 space-x-6'>
              <button onClick={muteControl} className='bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300 cursor-pointer'>
                {
                  muted?
                    <VolumeX />
                    :
                    <Volume2 />
                }

              </button>

              <button onClick={toggleScreen} className='bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300 cursor-pointer'>
                <Maximize />
              </button>
            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default App