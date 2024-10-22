import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        width: wp('100.0%'), 
        height: hp('100.0%'),
        backgroundColor: colors.background_color,
    },
    header: {
        backgroundColor: colors.white,
        borderBottomWidth: 0,
        // shadowColor: colors.black,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.2,
        // shadowRadius: 1,
        // elevation: 1
    },
    back: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
        width: 50, height: 40
    },
    logo: {
        width: 140,
        height: 140,
        marginTop: 15,
        marginBottom: 30
    },
    avatar: {
        alignItems: 'center',
        width: 100, height: 100,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 50,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
    },
});
