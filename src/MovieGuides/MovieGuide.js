import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieGuide.module.scss';

const MovieGuide = ({ id, title, image }) => (
    <Link to={`/movies/${id}`} className={styles.wrapper}>
        <img src={image} alt={title} className="img-fluid" />
    </Link>
);

MovieGuide.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default MovieGuide;
