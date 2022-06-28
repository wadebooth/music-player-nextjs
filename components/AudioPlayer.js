import React, { useState, useRef } from 'react'
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

  //REFERENCES
  const audioPlayer = useRef() //reference our audio component

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
      <audio
        ref={audioPlayer}
        src='https://artlist.io/song/15034/thinking-of-you.mp3'
      ></audio>
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
      <div>0:00</div>

      {/* progress bar */}
      <div>
        <input type='range' className={styles.progressBar} />
      </div>

      {/*duration */}
      <div className={styles.duration}>2:49</div>
    </div>
  )
}

export { AudioPlayer }
