import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.module.scss';

const Icon = ({ html, size, className, ...rest }) => {
    const wrapperClassName = classNames(styles.wrapper, className, {
        [styles[`size--${size}`]]: size
    });

    const iconNode =
        typeof html === 'string' ? (
            // eslint-disable-next-line react/no-danger
            <span className={styles.icon} dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
            <span className={styles.icon}>{html}</span>
        );

    return (
        <span {...rest} className={wrapperClassName}>
            {iconNode}
        </span>
    );
};

Icon.propTypes = {
    html: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    className: PropTypes.string
};

Icon.defaultProps = {
    size: 'sm',
    className: null
};

export default Icon;
