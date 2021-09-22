import React from "react";

const Song = ({currentSong: {cover, name, artist}}) => {
    return (
        <div className="song-container">
          <img alt= {name} src={cover} />
          <h2>{name}</h2>
          <h3>{artist}</h3>
        </div>
        )
}

export default Song;
