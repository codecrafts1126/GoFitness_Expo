import React from 'react';
import { I18nManager, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Container, Body, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import Swiper from "react-native-custom-swiper";

// var styles = require('@utils/styles');
import Strings from '../utils/Strings';
import i18n from "../utils/i18n";
import API from '../utils/API';
i18n.setI18nConfig()

import AthenaButton from '../components/AthenaButton';

const logo = require('@images/athena-logo.png')
const welcome = require('@images/welcome.png')

export default class WelcomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            languageList: [
                { key: 'language1', title: 'English', code: 'en' },
                { key: 'language2', title: 'عربى', code: 'ar' },
                { key: 'language3', title: 'עברית', code: 'he' },
				{ key: 'language4', title: 'русский', code: 'ru' },
                { key: 'language5', title: '中文', code: 'cn' }],
            currentlanguage: 'en'
        };
    }
    renderLanguageSwiperItem = item => {
        return (
            <View style={{ height: 30 }}><TouchableOpacity><Text style={{ color: "#FFF" }}>{item.title}</Text></TouchableOpacity></View>
        )
    }

    changeLanguage = index => {
        i18n.setLocale(this.state.languageList[index].code)
        this.setState({ currentlanguage: index });

    }
    getStarted() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Splash'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const isRTL = i18n.isRTL();
        return (
            // <Container>
            //     <Body>
                    <View style={styles.container}>
                        <View style={styles.containerTop}>
                            <Image source={logo} style={{ width: 100, height: 103 }} />
                            <Image source={welcome} style={{ width: wp('80.0%'), height: wp('85.0%'), marginTop: 20 }} />
                        </View>
                        <View style={styles.containerBottom}>
                            <View style={styles.languageView}>
                                <Ionicons name="md-arrow-dropleft" />
                                <Swiper style={{ flex: 1 }}
                                    currentSelectIndex={0}
                                    swipeData={this.state.languageList}
                                    renderSwipeItem={this.renderLanguageSwiperItem}
                                    onScreenChange={this.changeLanguage}
                                    style={{ marginTop: 15 }}
                                    containerWidth={wp('70.0%')}
                                />
                                <Ionicons name="md-arrow-dropright" />
                            </View>
                            <AthenaButton
                                title={i18n.translate(Strings.ST300).toUpperCase()}
                                color={"#E9717D"}
                                fontColor={"#FFFFFF"}
                                width={wp('80.0%')}
                                height={40}
                                // marginTop={20}
                                onPress={this.getStarted.bind(this)} />
                        </View>
                    </View>
            //     </Body>
            // </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('100.0%'),
        height: hp('100.0%'),
        backgroundColor: '#F6F6F6',
        // backgroundColor: '#EDECF2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTop: {
        width: wp('100.0%'),
        height: hp('75.0%'),
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBottom: {
        width: wp('100.0%'),
        height: hp('25.0%'),
        height: 50,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80.0%'),
        height: 40,
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 50,
        backgroundColor: "#00000020"
    }
});