import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Left, Text, Title, Right, View, Toast } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
// import PhotoUpload from 'react-native-photo-upload';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
// import DatePicker from 'react-material-datepicker';
import moment from 'moment';

var styles = require('@utils/styles');
import Strings from '../utils/Strings';
import i18n from "../utils/i18n";
import API from '../utils/API';

import AthenaButton from '../components/AthenaButton';

const avatar = require('@assets/images/avatar.png')
// const maleEnable = require('@assets/images/male-enable.png')
// const femaleEnable = require('@assets/images/female-enable.png')
// const maleDisable = require('@assets/images/male-disable.png')
// const femaleDisable = require('@assets/images/female-disable.png')

import configs from '../utils/configs';

export default class Register extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      isDisabled: false,
      nationalId: '',
      fullname: '',
      email: '',
      phonenumber: '',
      gender: 1,
      birthday: '',
      // isLoading: true,
      // isVisible: false,
      // isOpen: false,
      // isDisabled: false,
      // swipeToClose: false,
      // sliderValue: 0.3
    };
  }

  // componentDidMount() {
  // return fetch(configs.baseURL + 'json/data_strings.php')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     this.setState({
  //       isLoading: false,
  //       dataSource: responseJson
  //     }, function () {
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  async register() {
    const { nationalId, fullname, email, phonenumber, gender, birthday } = this.state;
    if (nationalId, fullname, email, phonenumber, gender, birthday) {
      if (!this.validateEmail(email)) {
        this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST334)}`, `${i18n.translate(Strings.ST335)}`);
      } else {
        this.setState({ isDisabled: true });
        let signupResult = await API.post('/user_submit.php', {
          "user": {
            "email": email,
            "id": nationalId,
            "phone": phonenumber,
            "name": fullname,
            "birthdate": birthday,
            "sex": gender,
            "status": 1
          }
        })
        if (signupResult.data.result == "success") {
          this.dropDownAlertRef.alertWithType('success', `${i18n.translate(Strings.ST316)}`, `${i18n.translate(Strings.ST332)}`);
        } else if (signupResult.data.result == "failure") {
          this.dropDownAlertRef.alertWithType('error', `${i18n.translate(Strings.ST314)}`, `${i18n.translate(Strings.ST333)}`);
        }
        this.setState({ isDisabled: false });
      }
    } else if (!nationalId) {
      this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST327)}`);
    } else if (!fullname) {
      this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST331)}`);
    } else if (!email) {
      this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST320)}`);
    } else if (!phonenumber) {
      this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST328)}`);
    } else if (!birthday) {
      this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST329)}`);
    } else {
      this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST330)}`);
    }
  }

  validateEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      this.setState({ email: value });
      return true;
    }
    return false;
  }

  validatePass = (password) => {
    let PassLength = password.length.toString();
    if (PassLength >= 6) {
      this.setState({ password: password })
      return false;
    }
    else {
      this.setState({ password: password })
    }
  }

  privacyTerms() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'TermsGuest'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  setGender = (gender) => {
    if (this.state.gender == 1 && gender == 2) {
      this.setState({ gender: 2 })
    } else if (this.state.gender == 2 && gender == 1) {
      this.setState({ gender: 1 })
    }
  }
  render() {
    const isRTL = i18n.isRTL();
    let sex = [{ value: 1, label: 'Male' }, { value: 2, label: 'Female' }]
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, }}>
          <Left style={{ flex: 1 }}>
            {!isRTL ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', width: 50, height: 40, paddingLeft: 5 }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: 1 }], fontSize: 22 }} />
            </TouchableOpacity> : <View />}
          </Left>
          <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={{ color: '#000000' }}>{i18n.translate(Strings.ST302)}</Title>
          </Body>
          <Right style={{ flex: 1 }} >
            {isRTL ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50, height: 40, paddingRight: 5 }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: -1 }], fontSize: 22 }} />
            </TouchableOpacity> : <View />}
          </Right>
        </Header>
        <Body>
          <KeyboardAwareScrollView>
            <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              {/* <PhotoUpload> */}
                <Image source={avatar} style={styles1.avatar} />
              {/* </PhotoUpload> */}
              <TextField
                isRTL={isRTL}
                label={i18n.translate(Strings.ST321)}
                labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                containerStyle={{ width: wp('80.0%') }}
                // containerStyle={[{ width: wp('80.0%') }, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}
                keyboardType={"numeric"}
                onChangeText={nationalId => this.setState({ nationalId })} />
              <TextField
                isRTL={isRTL}
                label={i18n.translate(Strings.ST322)}
                labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                containerStyle={{ width: wp('80.0%') }}
                // containerStyle={[{ width: wp('80.0%') }, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}
                autoCapitalize={"sentences"}
                onChangeText={fullname => this.setState({ fullname })} />
              <TextField
                isRTL={isRTL}
                label={i18n.translate(Strings.ST323)}
                labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                containerStyle={{ width: wp('80.0%') }}
                // containerStyle={[{ width: wp('80.0%') }, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}
                keyboardType={"email-address"}
                onChangeText={email => this.setState({ email })} />
              <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { justifyContent: 'space-between', alignItems: 'center', width: wp('80.0%') }]}>
                <TextField
                  isRTL={isRTL}
                  label={i18n.translate(Strings.ST324)}
                  labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
                  containerStyle={{ width: wp('50.0%') }}
                  // containerStyle={[{ width: wp('55.0%') }, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}
                  keyboardType={"phone-pad"}
                  onChangeText={phonenumber => this.setState({ phonenumber })} />
                <View style={{ flexDirection: 'column', marginTop: 12 }}>
                  <Text style={[!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }, { fontSize: 16, color: '#999' }]}>{i18n.translate(Strings.ST336)}</Text>
                  <Dropdown
                    isRTL={isRTL}
                    // label={i18n.translate(Strings.ST336)}
                    // value={this.state.gender}
                    data={sex}
                    containerStyle={{ width: wp('25.0%'), marginTop: -30 }}
                    onChangeText={gender => this.setState({ gender })}
                  />
                </View>
                {/* {this.state.gender == 1 ?
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 50 }}>
                    <TouchableOpacity onPress={() => this.setGender(1)}>
                      <Image source={maleEnable} style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setGender(2)}>
                      <Image source={femaleDisable} style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity></View> :
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 50 }}>
                    <TouchableOpacity onPress={() => this.setGender(1)}>
                      <Image source={maleDisable} style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setGender(2)}>
                      <Image source={femaleEnable} style={{ width: 35, height: 35, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity></View>
                } */}
              </View>
              <View style={[!isRTL ? { flexDirection: 'row', justifyContent: 'flex-start' } : { flexDirection: 'row-reverse', justifyContent: 'flex-start' }, { alignItems: 'center', width: wp('80.0%'), height: 80 }]}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={[!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }, { fontSize: 16, color: '#999' }]}>{i18n.translate(Strings.ST325)}</Text>
                  <DatePicker
                    isRTL={isRTL}
                    style={{ width: 90, marginTop: 10 }}
                    date={this.state.birthday}
                    mode="date" placeholder={moment().format("YYYY-MM-DD")}
                    confirmBtnText="Confirm" cancelBtnText="Cancel"
                    minDate="1820-01-01" maxDate={moment().format("YYYY-MM-DD")}
                    onDateChange={(date) => { this.setState({ birthday: date }) }}
                  />
                </View>
              </View>
              <AthenaButton
                isRTL={isRTL}
                isDisabled={this.state.isDisabled}
                title={i18n.translate(Strings.ST307)}
                color={"#E9717D"}
                fontColor={"#FFFFFF"}
                width={wp('80.0%')}
                height={40}
                onPress={this.register.bind(this)} />
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: wp('80.0%'), height: 50 }}>
                <TouchableOpacity onPress={this.privacyTerms.bind(this)} activeOpacity={1}>
                  <Text style={{ textDecorationLine: 'underline', fontSize: 13, color: '#3B46B9', marginLeft: 5, marginRight: 5 }}>{i18n.translate(Strings.ST326)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </Body>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Container>
    )
  }
}

const styles1 = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90.0%'),
  }
});