import React, { useCallback } from 'react';
import NotFound from './NotFound';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getMovieStream } from '../api/api';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Loading from './components/Loading';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon';
import { useHistory } from 'react-router-dom';
import styles from './MovieStreamsPage.module.scss';

const MovieStreamsPage = ({ id }) => {
    const history = useHistory();
    const getMovieStreamCallback = useCallback(() => {
        const data = {
            content_id: id,
            audio_language: "SPA",
            audio_quality: "2.0",
            content_type: "movies",
            device_serial: "device_serial_1",
            device_stream_video_quality: "FHD",
            player: "web:PD-NONE",
            subtitle_language: "MIS",
            video_type: "trailer"
        };
        return getMovieStream({}, data).then((result) => result.data);
    }, [id]);

    const [result, error, isLoading] = useAsyncEffect(getMovieStreamCallback, [getMovieStreamCallback]);

    if (error) {
        return <NotFound />;
    }

    if (isLoading) {
        return <Loading />
    }
    
    if (!isLoading) {
        const videoJsOptions = {
            // Some browsers may not autoplay unless mute
            autoplay: 'mute',
            controls: true,
            fluid: true,
            aspectRatio: '16:9',
            sources: [{
              src: result.stream_infos[0].url,
              type: 'video/mp4'
            }]
          }
          
        return (
            <div style={{ position: "relative" }}>
                <VideoPlayer { ...videoJsOptions } />
                <button 
                    onClick={() => history.push(`/movies/${id}`)}
                    className={styles.backBtn}>
                    <ChevronLeftIcon />
                </button>
            </div>
        )
    }

    return null;
};

export default MovieStreamsPage;