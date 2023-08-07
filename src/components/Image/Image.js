import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Image.module.scss';
import { useState, forwardRef } from 'react';
import images from '~/assets/images';

const Image = forwardRef(({ src, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handleErrow = () => {
        setFallBack(customFallBack);
    };

    // eslint-disable-next-line jsx-a11y/alt-text
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...props}
            onError={handleErrow}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};
export default Image;
