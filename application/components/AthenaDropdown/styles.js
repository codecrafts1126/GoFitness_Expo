import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    textField: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // top: -13,
    },
    textInput: {
        color: colors.middle_gray,
        borderBottomWidth: 1,
    }
});