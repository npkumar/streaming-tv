import React, { useEffect, useRef } from 'react';
import SwiperOriginal from 'swiper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Swiper.module.scss';
import ChevronLeftIcon from '../Icons/ChevronLeftIcon';
import ChevronRightIcon from '../Icons/ChevronRightIcon';
import SwiperContainer from './SwiperContainer';

const Swiper = ({
    children,
    autoplay,
    autoplaySpeed,
    pagination,
    swipeSpeed,
    loop,
    slidesPerView,
    slidesOffsetBefore,
    slidesOffsetAfter,
    className
}) => {
    const swiperInstanceRef = useRef();
    const containerRef = useRef();
    const buttonNextRef = useRef();
    const buttonPrevRef = useRef();

    useEffect(() => {
        const configOptions = {
            preloadImages: false,
            // Enable lazy loading
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true
            },
            loop: loop,
            speed: swipeSpeed,
            navigation: {
                nextEl: buttonNextRef.current,
                prevEl: buttonPrevRef.current
            },
            // Disable swiper and hide navigation if there are not enough slides for sliding
            watchOverflow: true,
            slidesPerView: slidesPerView,
            spaceBetween: 16,
            slidesOffsetBefore: slidesOffsetBefore,
            slidesOffsetAfter: slidesOffsetAfter,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            on: {
                resize: function resize() {
                    if (autoplay && !swiperInstanceRef.current.autoplay.running) {
                        swiperInstanceRef.current.autoplay.start();
                    }
                }
            }
        };

        if (autoplay) {
            configOptions.autoplay = {
                delay: autoplaySpeed
            };
        }

        if (swiperInstanceRef.current) {
            // Destroy instance and detach all events listeners
            swiperInstanceRef.current.destroy(true, true);
        }
        swiperInstanceRef.current = new SwiperOriginal(containerRef.current, configOptions);
    }, [autoplay, autoplaySpeed, loop, pagination, slidesOffsetAfter, slidesOffsetBefore, slidesPerView, swipeSpeed]);

    return (
        <SwiperContainer className={classNames(styles.wrapper, className)}>
            <div className="swiper-container" ref={containerRef}>
                <div className="swiper-wrapper">
                    {React.Children.map(children, (child) => (
                        <div className="swiper-slide">{child}</div>
                    ))}
                </div>
            </div>
            <div className="swiper-button-prev" ref={buttonPrevRef} onClick={() => swiperInstanceRef.current.slidePrev()}>
                <ChevronLeftIcon />
            </div>
            <div className="swiper-button-next" ref={buttonNextRef} onClick={() => swiperInstanceRef.current.slideNext()}>
                <ChevronRightIcon />
            </div>
        </SwiperContainer>
    );
};

Swiper.propTypes = {
    children: PropTypes.node.isRequired,
    slidesPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    swipeSpeed: PropTypes.number,
    autoplaySpeed: PropTypes.number,
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    slidesOffsetBefore: PropTypes.number,
    slidesOffsetAfter: PropTypes.number,
    className: PropTypes.string
};

Swiper.defaultProps = {
    slidesPerView: 'auto',
    swipeSpeed: 600,
    autoplaySpeed: 3000,
    autoplay: false,
    loop: false,
    slidesOffsetBefore: null,
    slidesOffsetAfter: null,
    className: null
};

export default Swiper;
