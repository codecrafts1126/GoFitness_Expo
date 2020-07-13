import { StyleSheet, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import colors from "@constants/colors";
import i18n from "@utils/i18n";

export default StyleSheet.create({
    container: {
        width: wp('100.0%'),
        height: hp('100.0%'),
        backgroundColor: '#F1F2F6'
    },
    header: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 50,
        height: 40,
    },
    main: {
        alignItems: 'center',
        width: wp('100.0%')
    },
    image: {
        alignItems: 'center',
        width: wp('100.0%'),
        height: hp('30.0%')
    },
    userShare: {
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: wp('95%'), 
        marginTop: hp('30.0%') - 50
    },
    userView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 200,
        borderRadius: 50
    },
    userImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary
    },
    eventButton: {
        position: 'absolute',
        top: 10,
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
    buttonView: {
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('100.0%'),
        height: 50,
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        borderRadius: 25,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
    },
    actionTitle: {
        fontSize: 20,
        fontWeight: '300',
        color: colors.white,
    },
    mainView: {
        alignItems: 'center',
        width: wp('100.0%'),
        height: '100%',
        marginTop: 10,
        // padding: 10,
    },
    label: {
        width: '100%',
        fontSize: 12,
        // fontWeight: 'bold',
        color: colors.dark_gray
    },


    // item: {
    //     height: 150,
    //     marginRight: 10,
    //     marginTop: 17,
    //     backgroundColor: 'white',
    //     borderRadius: 5,
    //     shadowColor: colors.black,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.9,
    //     shadowRadius: 2,
    //     elevation: 2,
    // },
    // image: {
    //     width: '100%',
    //     height: 150,
    //     borderRadius: 5,
    // },
    // content: {
    //     top: -150,
    //     width: '100%',
    //     height: '100%',
    //     padding: 10
    // },
    // eventTime: {
    //     fontSize: 14,
    //     fontWeight: '300',
    //     color: colors.white,
    //     shadowColor: colors.black,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.9,
    //     shadowRadius: 2,
    //     elevation: 2,
    // },
    // eventDate: {
    //     fontSize: 14,
    //     fontWeight: '300',
    //     color: colors.white,
    //     shadowColor: colors.black,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.9,
    //     shadowRadius: 2,
    //     elevation: 2,
    // },
    // className: {
    //     marginTop: 20,
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: colors.white,
    //     shadowColor: colors.black,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.9,
    //     shadowRadius: 2,
    //     elevation: 2,
    // },
    // coachName: {
    //     fontSize: 12,
    //     color: colors.white,
    //     shadowColor: colors.black,
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.9,
    //     shadowRadius: 2,
    //     elevation: 2,
    // },
    // profileImage: {
    //     width: 30,
    //     height: 30,
    //     borderRadius: 15
    // },
    // emptyView: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '100%',
    //     height: 150,
    //     backgroundColor: colors.white,
    //     borderRadius: 5,
    // },
    // emptyTitle: {
    //     fontSize: 25,
    //     fontWeight: 'bold',
    //     color: colors.white,
    //     shadowColor: colors.black,
    //     shadowOffset: { width: 0, height: 5 },
    //     shadowOpacity: 0.9,
    //     shadowRadius: 5,
    //     elevation: 5,
    // },
    // emptyTime: {
    //     marginTop: 20,
    //     fontSize: 15,
    //     color: colors.white,
    // }
});
