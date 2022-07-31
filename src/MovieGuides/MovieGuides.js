import React, { useCallback } from 'react';
import map from 'lodash/map';
import MovieGuide from './MovieGuide';
import useIsBreakpoint, { MD, LG } from '../hooks/useIsBreakpoint';
import styles from './MovieGuides.module.scss';
import Swiper from '../Swiper/Swiper';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { movieSearch } from '../api/api';
import Loading from '../pages/components/Loading';

const isResolving = (result) => Promise.resolve(result) === result;

const MovieGuides = ({ title }) => {
    const isLgDeviceOrGreater = useIsBreakpoint(LG);
    const isMdDeviceOrGreater = useIsBreakpoint(MD);

    const findMoviesCallback = useCallback(() => {
        return movieSearch().then((result) => result.data.contents.data);
    }, []);

    const [result, error, isLoading] = useAsyncEffect(findMoviesCallback, [findMoviesCallback]);

    if (error) {
        return null;
    }

    if (isLoading) {
        return <Loading />;
    }

    const movieGuides = !isResolving(result) && result.map(movie => ({
        id: movie.id,
        title: movie.title,
        image: movie.images.artwork,
        url: movie.images.artwork
    }));

    return (
        <>
            <div className={styles.title}>{title}</div>
            <div className={styles.wrapper}>
                {!isLoading && (
                    <Swiper
                        pagination={false}
                        slidesPerView={isLgDeviceOrGreater ? 6.5 : isMdDeviceOrGreater ? 4.5 : 2.5}
                        slidesOffsetBefore={!isMdDeviceOrGreater ? 16 : null}
                        slidesOffsetAfter={!isMdDeviceOrGreater ? 16 : null}
                    >
                        {map(movieGuides, ({ id, title, image }) => (
                            <MovieGuide
                                key={id}
                                id={id}
                                title={title}
                                image={image}
                            />
                        ))}
                    </Swiper>
                )}
            </div>
        </>
    );
};

export default MovieGuides;
