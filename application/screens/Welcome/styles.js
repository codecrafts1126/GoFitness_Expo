import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: wp('100.0%'), 
        height: hp('100.0%'),
        backgroundColor: colors.background_color,
    },
    containerTop: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: wp('100.0%'), 
        height: hp('75.0%'),
        backgroundColor: colors.background_color,
    },
    containerBottom: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: wp('100.0%'), 
        height: hp('25.0%'),
        backgroundColor: colors.background_color,
    },
    languageView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: wp('80.0%'), 
        height: 40,
        backgroundColor: "#00000020",
        borderWidth: 1,
        borderColor: colors.middle_gray,
        borderRadius: 50,
    }
});
