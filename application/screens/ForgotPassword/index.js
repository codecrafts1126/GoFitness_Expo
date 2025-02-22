import React from 'react';
import { I18nManager, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Left, Text, Title, Right, View } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { resetPassword } from '@modules/account/actions';

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

class ForgotPassword extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();;
        this.state = {
            isDisabled: false,
            email: '',
            nationalId: ''
        }
    }

    async restPassword() {
        const { email, nationalId } = this.state;
        if (email, nationalId) {
            if (!this.validateEmail(email)) {
                this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST334)}`, `${i18n.translate(strings.ST335)}`);
            } else {
                this.setState({ isDisabled: true });
                let resetResult = await API.post('/user_reset.php', {
                    "user": {
                        "email": email,
                        "id": nationalId
                    }
                })
                if (resetResult.data.result == "success") {
                    this.props.resetPassword(true);
                    const resetAction = StackActions.reset({
                        index: 2,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Welcome' }),
                            NavigationActions.navigate({ routeName: 'Splash' }),
                            NavigationActions.navigate({ routeName: 'Signin' })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);

                } else if (resetResult.data.result == "failure") {
                    this.setState({ isDisabled: false });
                    this.dropDownAlertRef.alertWithType('error', `${i18n.translate(strings.ST314)}`, `${i18n.translate(strings.ST319)}`);
                }
            }
        } else if (!email) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST320)}`);
        } else if (!nationalId) {
            this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(strings.ST313)}`, `${i18n.translate(strings.ST327)}`);
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

    render() {
        const { isRTL } = this.props;
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left style={{ flex: 1 }}>
                        {!isRTL ?
                            <TouchableOpacity style={[styles.back, { marginLeft: 10 }]} onPress={() => this.props.navigation.goBack()} >
                                <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: 1 }], fontSize: 22 }} />
                            </TouchableOpacity> : <View />
                        }
                    </Left>
                    <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                        <Title style={{ color: colors.black }}> {i18n.translate(strings.ST308)}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ?
                            <TouchableOpacity style={[styles.back, { marginRight: -25 }]} onPress={() => this.props.navigation.goBack()} >
                                <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: -1 }], fontSize: 22 }} />
                            </TouchableOpacity> : <View />
                        }
                    </Right>
                </Header>
                <Body>
                    <KeyboardAwareScrollView>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30, padding: 20, width: wp('100.0%') }}>
                            <Image source={images.logo_dark} style={styles.logo} resizeMode="contain" />
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.email}
                                placeholder={i18n.translate(strings.ST323)}
                                keyboardType={"email-address"}
                                autoCapitalize={"none"}
                                width={wp('80.0%')}
                                onChangeText={email => this.setState({ email })} />
                            <AthenaTextInput
                                isRTL={isRTL}
                                value={this.state.nationalId}
                                placeholder={i18n.translate(strings.ST321)}
                                keyboardType={"numeric"}
                                width={wp('80.0%')}
                                onChangeText={nationalId => this.setState({ nationalId })} />
                            <AthenaButton
                                isRTL={isRTL}
                                isDisabled={this.state.isDisabled}
                                title={i18n.translate(strings.ST305)}
                                color={colors.primary}
                                fontColor={colors.white}
                                width={wp('80.0%')}
                                height={40}
                                marginTop={50}
                                onPress={this.restPassword.bind(this)} />
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
        reseted: state.account.reseted,
        isRTL: state.account.isRTL,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: (data) => {
            dispatch(resetPassword(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);