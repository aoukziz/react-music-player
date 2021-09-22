import React from "react";


const LibrarySong = ({song: {cover, name, artist}, song, setCurrentSong, audioRef, isPlaying, songs, id, setSongs}) => {
    const songSelectHandler = async() => {
        await setCurrentSong(song);
        if (isPlaying) audioRef.current.play();
        setSongs(newSongs);
    }
    // Add Aactive state
    const newSongs = songs.map(song => {
        if(song.id === id) {
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
    
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
          <img alt= {name} src={cover} />
          <div className="song-description">
            <h3>{name}</h3>
            <h4>{artist}</h4>
          </div>
        </div>
        )
}

export default LibrarySong;

