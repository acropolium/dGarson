import { PixelRatio, StyleSheet } from 'react-native';

export default class Helper {
    static getCoeffDimensions = value => {
        const device_pixel_density = PixelRatio.get();
        let coef = 1;
        if (device_pixel_density < 1.5) {
            coef = 0.8;
        } else if (device_pixel_density < 2) {
            coef = 0.8;
        } else if (device_pixel_density >= 3) {
            coef = 1;
        }
        return value * coef;
    };

    static aplyCoeffDimensionsToStyles = styles => {
        let new_styles = StyleSheet.flatten(styles);
        Object.keys(new_styles)
            .filter(style => typeof new_styles[style] == 'number')
            .map((style, index) => {
                new_styles[style] = Helper.getCoeffDimensions(
                    new_styles[style]
                );
            });

        return new_styles;
    };
}
