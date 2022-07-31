import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { getMovieDetail } from '../api/api';
import useAsyncEffect from '../hooks/useAsyncEffect';
import NotFound from './NotFound';
import Loading from './components/Loading';
import styles from './MoviePage.module.scss';

const isResolving = (result) => Promise.resolve(result) === result;

const MoviePage = ({ id }) => {
    const history = useHistory();
    const getMovieCallback = useCallback(() => {
        return getMovieDetail({ id }).then((result) => result.data);
    }, [id]);

    const [result, error, isLoading] = useAsyncEffect(getMovieCallback, [getMovieCallback]);

    if (error) {
        return <NotFound />;
    }

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && !isResolving(result)) {
        const { original_title: title, short_plot: plot, images } = result;
        return (
            <>
            <div className={styles.header} style={{ backgroundImage: `url(${images.snapshot})`}}>
                <div className={styles.headerBox}>
                    <h1 className={styles.title}>{title}</h1>

                    <button className={styles.trailerBtn} onClick={() => history.push(`/streams/movies/${id}`)}>
                        Watch Trailer
                    </button>
                </div>
            </div>
            <div style={{ background: 'white', color: 'black', padding: '1rem' }}>
                <h3 className="my-3">{title}</h3>
                <p className="my-3">{plot}</p>
            </div>
            </>
        );
    }

    return null;
};

export default MoviePage;
