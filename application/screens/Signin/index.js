import React from 'react';
import { I18nManager, StatusBar, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Root, Container, Header, Body, Left, Text, Title, Right, View } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setLogin, setUser, resetPassword, signupSuccess } from '@modules/account/actions';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';

import { AthenaButton, AthenaTextInput } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';

class Signin extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            isDisabled: false,
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        if (this.props.reseted == true) {
            this.dropDownAlertRef.alertWithType('success', `${i18n.translate(strings.ST316)}`, `${i18n.translate(strings.ST337)}`);
            this.props.resetPassword(false);
        }
        if (this.props.signup == true) {
            this.dropDownAlertRef.alertWithType('success', `${i18n.translate(strings.ST316)}`, `${i18n.translate(strings.ST337)}`);
            this.props.signupSuccess(false);
        }
    }
    async login() {
        const { email, password } = this.state;
        if (email, password) {
            this.setState({ isDisabled: true });
            let loginResult = await API.post('/user_login.php', {
                "user": {
                    "email": email,
                    "password": password
                }
            })
            if (loginResult.data.result == "success") {
                await AsyncStorage.setItem('LOGGED', "true");
                await AsyncStorage.setItem('USER', JSON.stringify(loginResult.data.user));
                this.props.setLogin(true);
                this.props.setUser(loginResult.data.user);
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'MainStack' })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            } else if (loginResult.data.result == "failure") {
                this.dropDownAlertRef.alertWithType('error', `${i18n.translate(strings.ST314)}`, `${i18n.translate(strings.ST315)}`);
            }
            this.setState({ isDisabled: false });
        } else if (!email) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST310)}`);
        } else if (!password) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST311)}`);
        } else {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST312)}`);
        }
    }

    validateEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            this.setState({ email: email })
            return false;
        }
        else {
            this.setState({ email: email })
        }
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

    forgotPassword() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ForgotPassword'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    signUp() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Signup'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const { isRTL } = this.props;
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
                        <Title style={{ color: colors.black }}>{i18n.translate(strings.ST301)}</Title>
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
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 30, width: wp('100.0%') }}>
                            <Image source={images.logo_dark} style={styles.logo} resizeMode="contain" />
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.email}
                                placeholder={i18n.translate(strings.ST303)}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                                width={wp('80.0%')}
                                onChangeText={email => this.setState({ email })} />
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.password}
                                placeholder={i18n.translate(strings.ST304)}
                                secureTextEntry={true}
                                width={wp('80.0%')}
                                onChangeText={password => this.setState({ password })} />
                            <View style={[!isRTL ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { flexDirection: 'row', width: wp('80.0%'), marginTop: 5 }]}>
                                <TouchableOpacity onPress={this.forgotPassword.bind(this)} activeOpacity={1}>
                                    <Text style={{ textDecorationLine: 'underline', fontSize: 13, color: colors.link }}>{i18n.translate(strings.ST308)}</Text>
                                </TouchableOpacity>
                            </View>
                            <AthenaButton
                                isRTL={isRTL}
                                isDisabled={this.state.isDisabled}
                                title={i18n.translate(strings.ST306)}
                                color={colors.primary}
                                fontColor={colors.white}
                                width={wp('80.0%')}
                                height={40}
                                marginTop={50}
                                onPress={this.login.bind(this)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('80.0%'), height: 50 }}>
                                <View style={{ width: wp('30.0%'), borderBottomWidth: 1, borderBottomColor: colors.font }} />
                                <Text style={{ fontSize: 12, color: colors.font }}>{"Or"}</Text>
                                <View style={{ width: wp('30.0%'), borderBottomWidth: 1, borderBottomColor: colors.font }} />
                            </View>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { justifyContent: 'center', alignItems: 'center', width: wp('80.0%') }]}>
                                <Text style={{ fontSize: 13, color: colors.font }}>{i18n.translate(strings.ST309)}</Text>
                                <TouchableOpacity onPress={this.signUp.bind(this)} activeOpacity={1}>
                                    <Text style={{ textDecorationLine: 'underline', fontSize: 13, color: colors.link, marginLeft: 5, marginRight: 5 }}>{i18n.translate(strings.ST302)}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </Body>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref}
                    isRTL={isRTL}
                    contentContainerStyle={{ flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }} />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged: state.account.logged,
        isRTL: state.account.isRTL,
        reseted: state.account.reseted,
        signup: state.account.signup,
        profile: state.account.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: (data) => {
            dispatch(setLogin(data))
        },
        setUser: (data) => {
            dispatch(setUser(data))
        },
        resetPassword: (data) => {
            dispatch(resetPassword(data))
        },
        signupSuccess: (data) => {
            dispatch(signupSuccess(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);