import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/AudioPlayer.module.css'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePause,
} from 'react-icons/ai'
import { BiPlay } from 'react-icons/bi'

const AudioPlayer = () => {
  //STATES FOR AUDIO PLAYER
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  //REFERENCES FOR AUDIO PLAYER
  const audioPlayer = useRef() //reference our audio component
  const progressBar = useRef() //reference to our progress bar
  const animationRef = useRef() //reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds
  }, [AudioPlayer?.current?.loadedmetadata, AudioPlayer?.current?.readyState])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  //when the play/pause button is clicked, it'll run the function which toggles the state of isPlaying.
  const togglePlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
  }

  const backFifteenSeconds = () => {
    progressBar.current.value = Number(progressBar.current.value - 15)
    changeRange()
  }

  const forwardFifteenSeconds = () => {
    progressBar.current.value = Number(progressBar.current.value + 15)
    changeRange()
  }

  return (
    <div className={styles.AudioPlayer}>
      <audio ref={audioPlayer} src='Melrose-Childish-Gambino.mp3'></audio>
      <button className={styles.forwardBackward} onClick={backFifteenSeconds}>
        <AiOutlineArrowLeft /> 15
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <AiOutlinePause /> : <BiPlay className={styles.play} />}
      </button>
      <button
        className={styles.forwardBackward}
        onClick={forwardFifteenSeconds}
      >
        15 <AiOutlineArrowRight />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type='range'
          className={styles.progressBar}
          defaultValue='0'
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/*duration */}
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  )
}

export { AudioPlayer }
