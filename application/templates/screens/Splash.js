import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { Container, Body, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';
import AppIntroSlider from 'react-native-app-intro-slider';

import Strings from '../utils/Strings';
import i18n from "../utils/i18n";
import API from '../utils/API';

import AthenaButton from '../components/AthenaButton';

const slides = [
    { key: 'splash1', image: require('@images/splash1.png'), title: "Your Yoga", description: "Does Hydroderm Work" },
    { key: 'splash2', image: require('@images/splash2.png'), title: "Your Healthy", description: "Recommended You To Use After Before Breast Enhancement" },
    { key: 'splash3', image: require('@images/splash3.png'), title: "Learning to Relax", description: "The Health Benefits Of Sunglasses" },
];

export default class SplashScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    _renderItem = ({ item }) => {
        return (
            <View style={{ height: hp('80.0%'), justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: hp('62.0%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={item.image} style={{
                        width: wp('100.0%'), height: hp('62.0%')
                    }} />
                </View>
                <View style={{ height: hp('20.0%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp('70.0%'), fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{i18n.translate(item.title)}</Text>
                    <Text style={{ width: wp('70.0%'), fontSize: 16, color: '#B3B2B7', textAlign: 'center' }}>{i18n.translate(item.description)}</Text>
                </View>
            </View>
        );
    }

    signIn() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Login'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    signUp() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Register'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <Container>
                <Body>
                    <View style={styles.container}>
                        <View style={styles.containerTop}>
                            <AppIntroSlider
                                slides={slides}
                                renderItem={this._renderItem} />
                        </View>
                        <View style={styles.containerBottom}>
                            <AthenaButton
                                title={i18n.translate(Strings.ST301).toUpperCase()}
                                color={"#E9717D"}
                                fontColor={"#FFFFFF"}
                                width={wp('39.0%')}
                                height={40}
                                marginTop={20}
                                leftRadius={true}
                                onPress={this.signIn.bind(this)} />
                            <View style={{ width: 2 }} />
                            <AthenaButton
                                title={i18n.translate(Strings.ST302).toUpperCase()}
                                color={"#3B46B9"}
                                fontColor={"#FFFFFF"}
                                width={wp('39.0%')}
                                height={40}
                                marginTop={20}
                                rightRadius={true}
                                onPress={this.signUp.bind(this)} />
                        </View>
                    </View>
                </Body>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('100.0%'),
        height: hp('100.0%'),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTop: {
        width: wp('100.0%'),
        height: hp('85.0%'),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBottom: {
        width: wp('90.0%'),
        height: hp('15.0%'),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
});