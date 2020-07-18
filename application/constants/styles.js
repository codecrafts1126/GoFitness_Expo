import { Dimensions, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "@constants/colors";

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
  
  sidemenu_container: {
    flex: 1,
    backgroundColor: colors.white
  },
  sidemenu_item: {
    borderBottomWidth: 0,
    borderBottomColor: '#f7f8f9',
    marginLeft: 0,
    paddingRight: 20,
    paddingLeft: 20,
  },
  sidemenu_text: {
    fontSize: 16
  },

  sidemenu_icon: {
    fontSize: 14,
    color: colors.light_gray
  },
  sidemenu_footer: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },  
  listitem_home: {
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
  icon_home: {
    fontSize: 20,
    color: colors.light_gray
  },
  note_home: {
    fontSize: 13,
  },
});
