import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // width: wp('90.0%'),
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        fontSize: hp('2.25%'),
        // borderRadius:50,
        shadowColor: '#444',
        shadowOpacity: 0.8,
        shadowOffset: { height: 1, width: 1},
        shadowRadius: 2,
        elevation: 1,
    }
});