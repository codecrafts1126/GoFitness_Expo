import React from 'react';
import { ImageBackground, View, ScrollView, Image } from 'react-native';
import { Container, Body, Text, Right, List, ListItem, Thumbnail } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';

import Strings from '../../utils/Strings';

import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';

const slider = [
    { title: 'Fitness Title1', description: 'Fitness Description 1', image: images.slide1 },
    { title: 'Fitness Title2', description: 'Fitness Description 2', image: images.slide2 },
    { title: 'Fitness Title3', description: 'Fitness Description 3', image: images.slide3 },
    { title: 'Fitness Title4', description: 'Fitness Description 4', image: images.slide4 },
    { title: 'Fitness Title5', description: 'Fitness Description 5', image: images.slide5 },
    { title: 'Fitness Title6', description: 'Fitness Description 6', image: images.slide6 },
    { title: 'Fitness Title7', description: 'Fitness Description 7', image: images.slide7 },
    { title: 'Fitness Title8', description: 'Fitness Description 8', image: images.slide8 },
]
class Home extends React.Component {

    static navigationOptions = {
        title: `${Strings.ST0}`,
    };

    constructor() {
        super();
        this.state = {

        }
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const isRTL = i18n.isRTL();
        return (
            <Container style={global.background_general}>
                <View style={{ width: wp('100%'), height: hp('35.0%') }}>
                    <Swiper
                        activeDotColor='red'
                        dotColor='white'
                        containerStyle={{ width: wp('100%'), height: hp('35.0%') }}
                        showsButtons={false}
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={5.0}
                        pagingEnabled={true}
                    >
                        {
                            slider.map((item, key) =>
                                <ImageBackground key={key} resizeMode={'cover'} source={item.image} style={{}}>
                                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']}
                                        start={{ x: 0.0, y: 0.5 }}
                                        end={{ x: 0.0, y: 1.0 }}
                                        style={{
                                            height: hp('35.0%'),
                                            paddingHorizontal: wp('7.5%'),
                                            paddingVertical: hp('10.0%'),
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Text style={{ color: colors.white, paddingVertical: hp('0.5%'), fontSize: hp('3.0%'), fontWeight: 'bold' }} >
                                            {item.title}
                                        </Text>
                                        <Text style={{ color: colors.white, fontSize: hp('2.0%') }} >
                                            {item.description}
                                        </Text>
                                    </LinearGradient>
                                </ImageBackground>
                            )
                        }
                    </Swiper>
                </View>
                <ScrollView>
                    <View style={styles.mainView}>
                        <View style={[styles.itemView, isRTL ? { marginRight: 20 } : { marginLeft: 20 }]}>
                            <View style={[styles.imageView, { borderColor: '#42CEF9' }, isRTL ? { left: wp('80.0%') - 75 } : { left: -25 }]} >
                                <Image source={images.workouts} style={styles.image} />
                            </View>
                            <View>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: colors.black}, isRTL ? {textAlign: 'right'} : {textAlign: 'left'}]}>{i18n.translate(strings.ST001)}</Text>
                                <Text style={[{fontSize: 12, color: colors.gray}, isRTL ? {textAlign: 'right'} : {textAlign: 'left'}]}>{i18n.translate(strings.ST060)}</Text>
                            </View>
                            <SimpleLineIcons name="arrow-right" style={{marginRight: 10, marginRight: 10}} size={hp('1.5%')} />
                        </View>
                        <View style={[styles.itemView, isRTL ? { marginRight: 20 } : { marginLeft: 20 }]}>
                            <View style={[styles.imageView, { borderColor: '#FF7890' }, isRTL ? { left: wp('80.0%') - 75 } : { left: -25 }]} >
                                <Image source={images.exercises} style={styles.image} />
                            </View>
                            <View>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: colors.black}, isRTL ? {textAlign: 'right'} : {textAlign: 'left'}]}>{i18n.translate(strings.ST002)}</Text>
                                <Text numberOfLines={1} note style={styles.note_home}>{i18n.translate(strings.ST061)}</Text>
                            </View>
                            <SimpleLineIcons name="arrow-right" style={styles.icon_home} />
                        </View>
                        <View style={[styles.itemView, isRTL ? { marginRight: 20 } : { marginLeft: 20 }]}>
                            <View style={[styles.imageView, { borderColor: '#756FD5' }, isRTL ? { left: wp('80.0%') - 75 } : { left: -25 }]} >
                                <Image source={images.diets} style={styles.image} />
                            </View>
                            <View>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: colors.black}, isRTL ? {textAlign: 'right'} : {textAlign: 'left'}]}>{i18n.translate(strings.ST003)}</Text>
                                <Text numberOfLines={1} note style={styles.note_home}>{i18n.translate(strings.ST062)}</Text>
                            </View>
                            <SimpleLineIcons name="arrow-right" style={styles.icon_home} />
                        </View>
                        <View style={[styles.itemView, isRTL ? { marginRight: 20 } : { marginLeft: 20 }]}>
                            <View style={[styles.imageView, { borderColor: '#5BD196' }, isRTL ? { left: wp('80.0%') - 75 } : { left: -25 }]} >
                                <Image source={images.blog} style={styles.image} />
                            </View>
                            <View>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: colors.black}, isRTL ? {textAlign: 'right'} : {textAlign: 'left'}]}>{i18n.translate(strings.ST004)}</Text>
                                <Text numberOfLines={1} note style={styles.note_home}>{i18n.translate(strings.ST063)}</Text>
                            </View>
                            <SimpleLineIcons name="arrow-right" style={styles.icon_home} />
                        </View>
                        <View style={[styles.itemView, isRTL ? { marginRight: 20 } : { marginLeft: 20 }]}>
                            <View style={[styles.imageView, { borderColor: '#B7FF1B' }, isRTL ? { left: wp('80.0%') - 75 } : { left: -25 }]} >
                                <Image source={images.quotes} style={styles.image} />
                            </View>
                            <View>
                                <Text style={[{fontSize: 20, fontWeight: 'bold', color: colors.black}, isRTL ? {textAlign: 'right'} : {textAlign: 'left'}]}>{i18n.translate(strings.ST005)}</Text>
                                <Text numberOfLines={1} note style={styles.note_home}>{i18n.translate(strings.ST064)}</Text>
                            </View>
                            <SimpleLineIcons name="arrow-right" style={styles.icon_home} />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

export default Home;