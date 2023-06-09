import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Video from '../ThumUpDown/Video.jsx';
import YouTubePlayer from './YouTubePlayer.jsx';

function MediaInfo(props) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { selectedMovie } = props;
  // eslint-disable-next-line react/prop-types
  const {
    title, poster, synopsis, img,
    imdb_id,

  } = selectedMovie;

  function handleClick() {
    console.log('Opening YouTube player...');
    axios.post('/search', {
      title,
    }).then((response) => {
      setVideoId(response.data);
      setShowTrailer(true);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  // listen for changes in the props and close the player if it's open
  useEffect(() => {
    if (isPlayerOpen) {
      setShowTrailer(false);
      setIsPlayerOpen(false);
    }
  }, [selectedMovie]);

  return (
    <>
      <Card sx={{
        width: 680, display: 'flex', flexDirection: 'column', border: '1px solid black', borderRadius: '10px',
      }}
      >

        <CardContent>
          <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            <a
              href={`https://www.imdb.com/title/${imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={poster === '0' ? img : poster}
                alt="Poster"
                width="100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = img;
                }}
              />
            </a>
          </Typography>
          <Typography variant="body2" style={{ textAlign: 'center' }}>
            {synopsis}
          </Typography>
          <Typography variant="body2">
            <Video selectedMovie={selectedMovie} />
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: 'auto' }}>
          <Button
            size="small"
            onClick={() => {
              handleClick();
              setIsPlayerOpen(true);
            }}
          >
            Watch Trailer

          </Button>
        </CardActions>
      </Card>
      <div>
        {showTrailer && <YouTubePlayer id={videoId} />}
      </div>

    </>
  );
}

export default MediaInfo;
