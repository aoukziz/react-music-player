import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
 } from '@fortawesome/free-solid-svg-icons';


const Player = ({currentSong:{audio}, isPlaying, setIsPlaying, audioRef, songs, currentSong, setCurrentSong, setSongs}) => {
  

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    } 
  }
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
       currentTime: current,
        duration
    })
  }
  const getTime = (time) => {
    return Math.floor(time/60) + ":" + ("0" + Math.floor(time%60)).slice(-2);
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  }

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if(direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibrarayHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if(direction === 'skip-back') {
      if((currentIndex - 1) % songs.length === -1) {
         await setCurrentSong(songs[songs.length - 1]);
         activeLibrarayHandler(songs[(songs.length - 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibrarayHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  }


  const songEndHandler = async() => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();

  }

  const activeLibrarayHandler = (nextPrev) => {
    const newSongs = songs.map(song => {
      if(song.id === nextPrev.id) {
          return {
              ...song,
              active: true
          }
      } else {
          return {
              ...song,
              active: false
          }
      }
  })
  setSongs(newSongs);
  }


   const {currentTime, duration} = songInfo;
    return (
        <div className="player">
          <div className="time-control">
            <p>{getTime(currentTime)} </p>
            <input 
              min={0} 
              max={duration || 0} 
              value={currentTime} 
              type="range" 
              onChange={dragHandler}
            />
            <p>{duration ? getTime(duration) : "0:00"} </p>
          </div>
          <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
            <FontAwesomeIcon 
              className="play" 
              size="2x" 
              icon={isPlaying ? faPause : faPlay}
              onClick={playSongHandler}
               />
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
          </div>
          <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} 
            src={audio}
            onEnded={songEndHandler}
          >
          </audio>    
        </div>
    )
}

export default Player;
