import React, { useState } from 'react'
import styles from '../styles/AudioPlayer.module.css'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
} from 'react-icons/ai'

const AudioPlayer = () => {
  //sets the state of whether the song is playing or not.
  const [isPlaying, setIsPlaying] = useState(false)

  //when the play/pause button is clicked, it'll run the function which toggles the state of isPlaying.
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={styles.AudioPlayer}>
      <audio src=''></audio>
      <button className={styles.forwardBackward}>
        <AiOutlineArrowLeft /> 15
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? (
          <AiOutlinePauseCircle />
        ) : (
          <AiOutlinePlayCircle className={styles.play} />
        )}
      </button>
      <button className={styles.forwardBackward}>
        <AiOutlineArrowRight /> 15
      </button>

      {/* current time */}
      <div>0:00</div>

      {/* progress bar */}
      <div>
        <input type='range' />
      </div>

      {/*duration */}
      <div className={styles.duration}>2:49</div>
    </div>
  )
}

export { AudioPlayer }
