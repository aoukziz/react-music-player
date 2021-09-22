import {useState, useRef} from 'react';
import Player from "./components/Player";
import Song  from "./components/Song";
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import data from './data';

function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong = {currentSong} />
      <Player
        audioRef={audioRef}
        currentSong = {currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setSongs= {setSongs}
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong} 
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs= {setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
    
  );
}


export default App;
