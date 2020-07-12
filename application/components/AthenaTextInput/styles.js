import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // width: wp('90.0%'),
    },
    textField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    textInput: {
        paddingVertical: hp('1.0%'),
        fontSize: hp('2.25%'),
        color: '#000',
        borderBottomWidth: 1,
    }
});