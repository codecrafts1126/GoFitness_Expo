import React from 'react';
import { I18nManager, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Body, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setRTL, setUser } from '@modules/account/actions';

import Swiper from "react-native-custom-swiper";

import { AthenaButton } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';
i18n.setI18nConfig()

class Welcome extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            languageList: [
                { key: 'language1', title: 'English', code: 'en' },
                { key: 'language2', title: 'عربى', code: 'ar' },
                { key: 'language3', title: 'עברי', code: 'he' },
                { key: 'language4', title: '中文', code: 'cn' }],
            currentlanguage: 'en'
        };
    }

    async componentWillMount() {
        if (await AsyncStorage.getItem('LOGGED') === "true") {
            let user = await AsyncStorage.getItem('USER')
            this.props.setUser(JSON.parse(user));
            const navigateAction = NavigationActions.navigate({
                routeName: 'MainStack'
            });
            this.props.navigation.dispatch(navigateAction);
        }
    }

    renderLanguageSwiperItem = (item) => {
        return (
            <View style={{ height: 30 }}>
                <TouchableOpacity>
                    <Text style={{ color: colors.white }}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    changeLanguage = index => {
        i18n.setLocale(this.state.languageList[index].code)
        this.setState({ currentlanguage: index });

    }
    getStarted() {
        this.props.setRTL(i18n.isRTL());
        const navigateAction = NavigationActions.navigate({
            routeName: 'Splash'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Image source={images.logo} style={{ width: 100, height: 103, marginTop: 20 }} />
                    <Image source={images.welcome} style={{ width: wp('80.0%'), height: wp('85.0%'), marginTop: 20 }} />
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
                        title={i18n.translate(strings.ST300).toUpperCase()}
                        color={colors.primary}
                        fontColor={colors.white}
                        width={wp('80.0%')}
                        height={40}
                        // marginTop={20}
                        onPress={this.getStarted.bind(this)} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged: state.account.logged,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRTL: (data) => {
            dispatch(setRTL(data))
        },
        setUser: (data) => {
            dispatch(setUser(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);