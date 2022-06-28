import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/AudioPlayer.module.css'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePause,
} from 'react-icons/ai'
import { BiPlay } from 'react-icons/bi'

const AudioPlayer = () => {
  //STATE
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  //REFERENCES
  const audioPlayer = useRef() //reference our audio component

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
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
    } else {
      audioPlayer.current.pause()
    }
  }

  return (
    <div className={styles.AudioPlayer}>
      <audio ref={audioPlayer} src='Melrose-Childish-Gambino.mp3'></audio>
      <button className={styles.forwardBackward}>
        <AiOutlineArrowLeft /> 15
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <AiOutlinePause /> : <BiPlay className={styles.play} />}
      </button>
      <button className={styles.forwardBackward}>
        <AiOutlineArrowRight /> 15
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input type='range' className={styles.progressBar} defaultValue='0' />
      </div>

      {/*duration */}
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  )
}

export { AudioPlayer }
