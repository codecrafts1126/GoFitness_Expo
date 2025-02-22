import React from 'react';
import { I18nManager, Image, Text } from 'react-native';
import { Container, Body, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import AppIntroSlider from 'react-native-app-intro-slider';

import { AthenaButton } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';

const slides = [
    { key: 'splash1', image: require('@images/splash1.png'), title: "Your Yoga", description: "Does Hydroderm Work" },
    { key: 'splash2', image: require('@images/splash2.png'), title: "Your Healthy", description: "Recommended You To Use After Before Breast Enhancement" },
    { key: 'splash3', image: require('@images/splash3.png'), title: "Learning to Relax", description: "The Health Benefits Of Sunglasses" },
];

class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    _renderItem = ({ item, key }) => {
        return (
            <View key={key} style={{ height: hp('80.0%'), justifyContent: 'center', alignItems: 'center' }}>
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
            routeName: 'Signin'
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
                                title={i18n.translate(strings.ST301).toUpperCase()}
                                color={colors.primary}
                                fontColor={colors.white}
                                width={wp('39.0%')}
                                height={40}
                                marginTop={20}
                                leftRadius={true}
                                onPress={this.signIn.bind(this)} />
                            <View style={{ width: 2 }} />
                            <AthenaButton
                                title={i18n.translate(strings.ST302).toUpperCase()}
                                color={colors.primary}
                                fontColor={colors.white}
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

export default Splash;