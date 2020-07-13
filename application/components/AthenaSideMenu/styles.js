import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";
import i18n from "@utils/i18n";

export default StyleSheet.create({
    container: {
        width: wp('100.0%'),
        height: hp('100.0%')
    },
    sidebarView: {
        position: 'absolute', 
        width: wp('75.0%'), 
        height: hp('100.0%'), 
        backgroundColor: colors.white
    },
    logoView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: 150,
    },
    logo: {
        width: 97,
        height: 100
    },
    menuList: { 
        justifyContent: 'center',
        width: '100%',
        height: hp('100.0%') - 200,
        paddingLeft: 10, 
        paddingRight: 10 
    },
    menuView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 55,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.light_gray
    },
    menuIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    }, 
    icon: {
        width: 30, 
        height: 30,
    },
    menuTitle: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonView: { 
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%', 
        bottom: 20 
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('40.0%'),
        height: 35,
        backgroundColor: colors.primary,
        borderRadius: 50,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    buttonTitle: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white
    },
});