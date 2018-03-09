import React, { PureComponent } from 'react';
import { Text as BaseText } from 'react-native';
import config from '../../../config';
import helper from '../../../utils/helper';
import PropTypes from 'prop-types';

export default class Text extends PureComponent {
    constructor(props) {
        super(props);
    }

    setNativeProps = (nativeProps) => {
        this._root.setNativeProps(nativeProps);
    };
      
    render(){
        const {
            font = config.custom_font,

            style
        } = this.props;

        const styles = helper.aplyCoeffDimensionsToStyles(this.props.style);
        

        return (
            <BaseText
                style={[{ fontFamily: font }, styles]}
                numberOfLines={this.props.numberOfLines}
                {...this.props}
            >
                {this.props.children}
            </BaseText>
        );
    }
};

Text.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
    ]),
    numberOfLines: PropTypes.number
};

Text.defaultProps = {
    style: {},
    numberOfLines: 1
};


