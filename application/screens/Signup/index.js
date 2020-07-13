import React from 'react';
import { I18nManager, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Left, Text, Title, Right, View } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { connect } from 'react-redux';
import { signupSuccess } from '@modules/account/actions';
import { AthenaButton, AthenaTextInput, AthenaDropdown } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';

class Signup extends React.Component {
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
        };
    }

    async register() {
        const { nationalId, fullname, email, phonenumber, gender, birthday } = this.state;
        if (nationalId, fullname, email, phonenumber, gender, birthday) {
            if (!this.validateEmail(email)) {
                this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST334)}`, `${i18n.translate(strings.ST335)}`);
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
                    this.props.signupSuccess(true);
                    const resetAction = StackActions.reset({
                        index: 2,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Welcome' }),
                            NavigationActions.navigate({ routeName: 'Splash' }),
                            NavigationActions.navigate({ routeName: 'Signin' })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                } else if (signupResult.data.result == "failure") {
                    this.dropDownAlertRef.alertWithType('error', `${i18n.translate(strings.ST314)}`, `${i18n.translate(strings.ST333)}`);
                }
                this.setState({ isDisabled: false });
            }
        } else if (!nationalId) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST327)}`);
        } else if (!fullname) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST331)}`);
        } else if (!email) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST320)}`);
        } else if (!phonenumber) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST328)}`);
        } else if (!birthday) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST329)}`);
        } else {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST330)}`);
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

    render() {
        const { isRTL } = this.props;
        let sex = [{ value: 1, label: 'Male' }, { value: 2, label: 'Female' }]
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left style={{ flex: 1 }}>
                        {!isRTL ?
                            <TouchableOpacity style={[styles.back, { marginLeft: 10 }]} onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: 1 }], fontSize: 22 }} />
                            </TouchableOpacity> : <View />
                        }
                    </Left>
                    <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={{ color: colors.black }}>{i18n.translate(strings.ST302)}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ?
                            <TouchableOpacity style={[styles.back, { marginRight: -25 }]} onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: -1 }], fontSize: 22 }} />
                            </TouchableOpacity> : <View />
                        }
                    </Right>
                </Header>
                <Body>
                    <KeyboardAwareScrollView>
                        <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            {/* <PhotoUpload> */}
                            <Image source={images.avatar} style={styles.avatar} />
                            {/* </PhotoUpload> */}
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.nationalId}
                                placeholder={i18n.translate(strings.ST321)}
                                keyboardType={"numeric"}
                                width={wp('80.0%')}
                                onChangeText={nationalId => this.setState({ nationalId })} />
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.fullname}
                                placeholder={i18n.translate(strings.ST322)}
                                keyboardType={"sentences"}
                                width={wp('80.0%')}
                                onChangeText={fullname => this.setState({ fullname })} />
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.email}
                                placeholder={i18n.translate(strings.ST323)}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                                width={wp('80.0%')}
                                onChangeText={email => this.setState({ email })} />
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { justifyContent: 'space-between', alignItems: 'center', width: wp('80.0%') }]}>
                                <AthenaTextInput
                                    isRTL={isRTL}
                                    value={this.state.phonenumber}
                                    placeholder={i18n.translate(strings.ST324)}
                                    keyboardType={"phone-pad"}
                                    width={wp('50.0%')}
                                    onChangeText={phonenumber => this.setState({ phonenumber })} />
                                <AthenaDropdown
                                    isRTL={isRTL}
                                    label={i18n.translate(strings.ST336)}
                                    value={this.state.gender}
                                    data={sex}
                                    width={wp('25.0%')}
                                    onChangeText={(value) => this.setState({ gender: value })} />
                            </View>
                            <View style={[!isRTL ? { flexDirection: 'row', justifyContent: 'flex-start' } : { flexDirection: 'row-reverse', justifyContent: 'flex-start' }, { alignItems: 'center', width: wp('80.0%'), height: 80 }]}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={[!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }, this.state.birthday == "" ? { fontSize: 16, color: colors.middle_gray } : { fontSize: 14, color: colors.textfield_highlight }]}>{i18n.translate(strings.ST325)}</Text>
                                    <View style={isRTL ? {marginRight: 10} : {}}>
                                    <DatePicker
                                        isRTL={isRTL}
                                        style={{ width: 90, marginTop: 10 }}
                                        date={this.state.birthday}
                                        mode="date"
                                        placeholder={moment().format("YYYY-MM-DD")}
                                        confirmBtnText="Confirm" cancelBtnText="Cancel"
                                        minDate="1820-01-01" maxDate={moment().format("YYYY-MM-DD")}
                                        onDateChange={(date) => { this.setState({ birthday: date }) }}
                                    />
                                    </View>
                                </View>
                            </View>
                            <AthenaButton
                                isRTL={isRTL}
                                isDisabled={this.state.isDisabled}
                                title={i18n.translate(strings.ST307)}
                                color={colors.primary}
                                fontColor={colors.white}
                                width={wp('80.0%')}
                                height={40}
                                onPress={this.register.bind(this)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: wp('80.0%'), height: 50 }}>
                                <TouchableOpacity onPress={this.privacyTerms.bind(this)} activeOpacity={1}>
                                    <Text style={{ textDecorationLine: 'underline', fontSize: 13, color: colors.link, marginLeft: 5, marginRight: 5 }}>{i18n.translate(strings.ST326)}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </Body>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref}
                    isRTL={isRTL}
                    contentContainerStyle={{ flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }} />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        signup: state.account.signup,
        isRTL: state.account.isRTL,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupSuccess: (data) => {
            dispatch(signupSuccess(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);