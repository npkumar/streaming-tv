import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './SwiperContainer.module.scss';

const SwiperContainer = ({ className = null, children }) => {
    return <div className={classNames(styles.wrapper, className)}>{children}</div>;
};

SwiperContainer.propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/require-default-props
    className: PropTypes.string
};

export default SwiperContainer;
