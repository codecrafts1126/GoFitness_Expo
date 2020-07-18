import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";
import i18n from "@utils/i18n";

export default StyleSheet.create({
    container: {
        // justifyContent: 'center', alignItems: 'center',
        width: wp('100.0%'), height: hp('100.0%'),
        backgroundColor: colors.background_color,
    },
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0
    },
    mainView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20, 
        width: wp('100.0%'),
        backgroundColor: colors.background_color
    },
    itemView: { 
        flexDirection: i18n.isRTL() ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('80.0%'), 
        height: 80, 
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: '#00000020',
        borderRadius: 5,
        shadowColor: colors.gray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 5
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        // top: -10,
        backgroundColor: colors.white,
        borderWidth: 5,
        borderRadius: 50,
        shadowColor: colors.gray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 5
    },
    image: {
        width: 70,
        height: 70,
    }
});
