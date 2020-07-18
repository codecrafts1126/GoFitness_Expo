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
        height: hp('85.0%'),
        backgroundColor: colors.background_color,
    },
    containerBottom: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        width: wp('90.0%'), 
        height: hp('15.0%'),
        backgroundColor: colors.background_color,
    }
});
