import { StyleSheet, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";
import i18n from "@utils/i18n";

export default StyleSheet.create({
    container: {
        width: wp('100.0%'),
        height: hp('100.0%'),
        backgroundColor: colors.secondary,
    },
    header: {
        backgroundColor: colors.secondary,
        borderBottomWidth: 0,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 50,
        height: 40,
    },
    sliderView: {
        marginTop: 10,
        width: wp('90.0%'),
        height: 200,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 1,
    }, 
    image: {
        width: wp('90.0%'),
        height: 200,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2
    },
    title: { 
        top: -80,
        marginLeft: 10,
        marginRight: 10,
        fontSize: hp('2.5%'), 
        fontWeight: 'bold', 
        color: colors.white, 
    },
    workoutView: {
        width: wp('100.0%'),
        height: 230,
        paddingTop: wp('5.0%'),
        paddingLeft: wp('5.0%'),
        paddingRight: wp('5.0%'),
    },
    workoutCard: {
        width: wp('60.0%'),
        height: 170,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    workoutImage: {
        width: wp('60.0%'),
        height: 120,
        borderRadius: 10
    },
    workoutTitle: {
        margin: 5,
        fontSize: 12,
    },
    bodypartsView: {
        width: wp('100.0%'),
        paddingTop: wp('5.0%'),
        paddingLeft: wp('5.0%'),
        paddingRight: wp('5.0%'),
    },
    bodypartsCard: {
        width: wp('90.0%'),
        height: 150,
        marginBottom: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    bodypartsImage: {
        width: wp('90.0%'),
        height: 150,
        marginBottom: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    bodypartsTitle: {
        marginTop: -50,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('90.0%') - 10,
        height: 170,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 5,
    },
    emptyTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
        elevation: 5,
    },
    emptyTime: {
        marginTop: 20,
        fontSize: 15,
        color: colors.white,
    },
    
    itemEvent: {
        width: wp('60.0%'),
        height: 150,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    imageEvent: {
        width: '100%',
        height: 150,
        borderRadius: 5,
    },
    contentEvent: {
        top: -300,
        width: '100%',
        height: '100%',
        padding: 10
    },
    darkViewEvent: {
        top: -150, 
        width: '100%', 
        height: '100%', 
        borderRadius: 5,
    },
    eventTimeCardEvent: {
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
    eventTimeEvent: {
        fontSize: 14,
        fontWeight: '300',
    },
    eventDateEvent: {
        fontSize: 14,
        fontWeight: '300',
        color: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    eventButtonEvent: {
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
    eventStatusTitleEvent: {
        fontSize: 10,
        fontWeight: '300',
        color: colors.white,
    },
    classNameEvent: {
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
    coachNameEvent: {
        fontSize: 12,
        color: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 2,
    },
    profileImageEvent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: colors.primary,
        borderRadius: 15
    },
    emptyItemEvent: {
        height: 50,
        justifyContent: 'center',
        marginTop: 30
    },
    emptyViewEvent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    emptyTitleEvent: {
        // fontSize: 25,
        // fontWeight: 'bold',
        // color: colors.white,
        // shadowColor: colors.black,
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.9,
        // shadowRadius: 5,
        // elevation: 5,
    },
    emptyTimeEvent: {
        marginTop: 20,
        fontSize: 15,
        color: colors.white,
    },










    // container: {
    //     width: wp('100.0%'), 
    //     height: hp('100.0%'),
    // },
    // top: {
    //     width: wp('100.0%'),
    //     height: 20,
    //     backgroundColor: '#000000',
    // },
    // header: {
    //     flexDirection: i18n.isRTL() ? 'row-reverse' : 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: wp('100.0%'),
    //     height: 50,
    //     backgroundColor: '#999999E0',
    // },
    // title: {
    //     // fontFamily: 'Sytem',
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: colors.white
    // },
    // main: {
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingTop: 20, 
    //     paddingBottom: 20,
    //     width: wp('100.0%')
    // },
    // item: {
    //     flexDirection: i18n.isRTL() ? 'row-reverse' : 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: wp('94.0%'),
    //     height: 120,
    //     backgroundColor: '#FFFFFF50',
    //     borderRadius: 10
    // },
    // image: {
    //     width: wp('47.0%'),
    //     height: 120,
    //     borderRadius: 10,
    // },
    // center: {
    //     width: 0,
    //     height: 0,
    //     marginLeft: -80,
    //     backgroundColor: 'transparent',
    //     borderStyle: 'solid',
    //     borderTopWidth: 120,
    //     borderRightWidth: 80,
    //     borderRightColor: 'transparent',
    //     borderTopColor: '#DDDDDD',
    //     transform: [{rotate: '180deg'}]
    // },

    // itemView: { 
    //     flexDirection: i18n.isRTL() ? 'row-reverse' : 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: wp('80.0%'), 
    //     height: 80, 
    //     marginTop: 20,
    //     marginBottom: 20,
    //     backgroundColor: colors.white,
    //     borderWidth: 1,
    //     borderColor: '#00000020',
    //     borderRadius: 5,
    //     shadowColor: colors.gray,
    //     shadowOffset: {width: 1, height: 1},
    //     shadowOpacity: 0.75,
    //     shadowRadius: 5,
    //     elevation: 5
    // },
});
