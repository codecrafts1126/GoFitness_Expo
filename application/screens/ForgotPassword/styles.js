import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        // justifyContent: 'center', alignItems: 'center',
        width: wp('100.0%'), height: hp('100.0%'),
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0
    },
    back: {
        justifyContent: 'center', alignItems: 'flex-start',
        width: 50, height: 40
    },
    logo: {
        width: 140,
        height: 140,
        marginTop: 15,
        marginBottom: 30
    }
});
