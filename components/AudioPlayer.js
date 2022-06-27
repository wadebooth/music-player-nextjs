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

  //interacts with line 25. when the play/pause button is clicked, it will run the function which toggles the state of isPlaying.
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={styles.AudioPlayer}>
      <audio src=''></audio>
      <button>
        <AiOutlineArrowLeft />
      </button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
      </button>
      <button>
        <AiOutlineArrowRight />
      </button>

      {/* current time */}
      <div>0:00</div>

      {/* progress bar */}
      <div>
        <input type='range' />
      </div>
    </div>
  )
}

export { AudioPlayer }
