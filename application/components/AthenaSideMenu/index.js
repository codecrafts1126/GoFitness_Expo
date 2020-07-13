import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setLogout } from '@modules/account/actions';

import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';

const menuList = [
    { title: 'Events', icon: images.workouts, color: "#888888", route: 'Events' },
    { title: 'Exercises', icon: images.exercises, color: "#5E3929", route: 'Exercises' },
    { title: 'Diets', icon: images.diets, color: "#457EF0", route: 'Diets' },
    { title: 'Blog', icon: images.blog, color: "#52A841", route: 'Posts' },
    { title: 'Quotes', icon: images.quotes, color: "#D2195D", route: 'Quotes' },
    { title: 'Profile', icon: images.profile, color: "#0190A0", route: 'Profile' },
    { title: 'Settings', icon: images.settings, color: "#484C6E", route: 'Settings' },
    { title: 'Sign Out', icon: images.signout, color: "#203D30", route: 'SignOut' },
]

class AthenaSideMenu extends React.Component {
    constructor() {
        super();
    }

    async onRoute(route) {
        if (route == 'SignOut') {
            await AsyncStorage.setItem('LOGGED', "false")
            this.props.setLogout(false)
            const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'Welcome' })]});
            this.props.navigation.dispatch(resetAction);
        } else if(route == "Home") {
            const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'Welcome' })]});
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Home");
        } else{
            const navigateAction = NavigationActions.navigate({ routeName: route });
            this.props.navigation.dispatch(navigateAction);
            this.props.onClose();
        }
    }

    render() {
        const { isRTL, isSide, onClose } = this.props;
        return (
            <View style={[isSide ? { display: 'flex', position: 'absolute' } : { display: 'none' }, styles.container]}>
                <TouchableOpacity onPress={onClose}>
                    <View style={{ width: '100%', height: hp('100.0%'), backgroundColor: "#00000090" }} />
                </TouchableOpacity>
                <View style={[!isRTL ? { left: 0 } : { right: 0 }, styles.sidebarView]}>
                    <TouchableOpacity onPress={() => this.onRoute("Home")}>
                        <View style={styles.logoView}>
                            <Image source={images.logo_dark} style={styles.logo} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.menuList}>
                        <TouchableOpacity onPress={() => this.onRoute("Events")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.workouts} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST010)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onRoute("Exercises")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.exercises} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST002)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onRoute("Diets")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.diets} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST003)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onRoute("Posts")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.blog} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST004)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onRoute("Quotes")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.quotes} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST005)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onRoute("Profile")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.profile} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST006)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onRoute("Settings")}>
                            <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, styles.menuView]}>
                                <View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { alignItems: 'center' }]}>
                                    <Image resizeMode={'cover'} source={images.settings} style={styles.icon} />
                                    <Text style={styles.menuTitle}>{i18n.translate(strings.ST007)}</Text>
                                </View>
                                <MaterialCommunityIcons name={!isRTL ? 'chevron-right' : 'chevron-left'} style={{ fontSize: 22, color: colors.middle_gray }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => this.onRoute("SignOut")}>
                            <View style={[styles.button, !isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }]}>
                                <MaterialCommunityIcons name="logout" color={colors.white} size={16} />
                                <Text style={styles.buttonTitle}>{i18n.translate(strings.ST008)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogout: (data) => {
            dispatch(setLogout(data))
        },
    }
}

export default connect(undefined, mapDispatchToProps)(AthenaSideMenu);