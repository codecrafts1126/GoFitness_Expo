import { StyleSheet, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";
import i18n from "@utils/i18n";

export default StyleSheet.create({
    container: {
        width: wp('100.0%'),
        height: hp('100.0%'),
    },
    header: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 50,
        height: 40,
    },
    item: {
        height: 150,
        marginRight: 10,
        marginTop: 17,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    content: {
        top: -300,
        width: '100%',
        height: '100%',
        padding: 10
    },
    darkView: {
        top: -150, 
        width: '100%', 
        height: '100%', 
        borderRadius: 5,
    },
    eventTimeCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 18,
        borderRadius: 50,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    eventTime: {
        fontSize: 14,
        fontWeight: '300',
    },
    eventDate: {
        fontSize: 14,
        fontWeight: '300',
        color: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    eventButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5, 
        marginRight: 5,
        width: 70,
        height: 18,
        borderRadius: 50,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    eventStatusTitle: {
        fontSize: 10,
        fontWeight: '300',
        color: colors.white,
    },
    className: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    coachName: {
        fontSize: 12,
        color: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    profileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: colors.primary,
        borderRadius: 15
    },
    emptyItem: {
        height: 50,
        justifyContent: 'center',
        marginTop: 30
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    emptyTitle: {
        // fontSize: 25,
        // fontWeight: 'bold',
        // color: colors.white,
        // shadowColor: colors.black,
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.9,
        // shadowRadius: 5,
        // elevation: 5,
    },
    emptyTime: {
        marginTop: 20,
        fontSize: 15,
        color: colors.white,
    },
});
