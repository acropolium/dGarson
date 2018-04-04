import { Platform, StyleSheet } from 'react-native';
import config from '../../config';

export default StyleSheet.create({
    bg: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 20 : undefined,
    },
});
