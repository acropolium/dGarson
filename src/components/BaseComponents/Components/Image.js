import React, { PureComponent } from 'react';
import { Image as BaseImage } from 'react-native';
import helper from '../../../utils/helper';
import PropTypes from 'prop-types';

export default class Image extends PureComponent {
    constructor(props) {
        super(props);
    }
    setNativeProps = nativeProps => {
        this._root.setNativeProps(nativeProps);
    };

    render() {
        const styles = helper.aplyCoeffDimensionsToStyles(this.props.style);
        return (
            <BaseImage
                {...this.props}
                style={styles}
                source={this.props.source}
            />
        );
    }
}

Image.propTypes = {
    source: PropTypes.any.isRequired,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
    ]),
};

Image.defaultProps = {
    style: {},
};
