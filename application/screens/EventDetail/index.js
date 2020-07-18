import React from 'react';
import { View, ScrollView, FlatList, Image, Text, TouchableOpacity, AsyncStorage, Animated, ImageBackground } from 'react-native';
import { Container, Header, Body, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';

import DropdownAlert from 'react-native-dropdownalert';
import { NavigationApps, actions, googleMapsTravelModes, mapsTravelModes } from 'react-native-navigation-apps';
import * as Sharing from 'expo-sharing';
// import { LinearGradient } from 'expo-linear-gradient';
// import Share, { ShareSheet, Button } from 'react-native-share';

import { AppPreLoader, AthenaSideMenu, AthenaBannerAd } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';
import configs from '@utils/configs';
// const isRTL = true;

class EventDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isSide: false,
            isEvent: false,
            shareY: new Animated.Value(hp('200.0%')),
            shareVisible: false,
            shareOptions: {
                title: "",
                message: "",
                url: "",
                subject: ""
            }
        }
    }

    componentDidMount() {
        // this.setState({ isLoading: true })
    }

    onBack() {
        // const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'Welcome' })] });
        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate("Events");
    }

    onClose() {
        this.setState({ isSide: false });
    }

    onShare(event) {
        Sharing.shareAsync(configs.baseURL + 'images/classes/' + event.CLSS_IMG)
        // this.setState({
        //     shareOptions: {
        //         title: event.CLSS_NAME,
        //         message: event.CLSS_NAME,
        //         url: configs.baseURL + 'images/classes/' + event.CLSS_IMG,
        //         subject: "Share Link"
        //     }
        // })
        // this.setState({ shareVisible: true });
        // this.openShare();
    }

    // openShare() {
    //     const { shareOptions } = this.state;
    //     Share.open(shareOptions);
    // }

    onCancel() {
        this.setState({ shareVisible: false });
    }

    async enroll(event) {
        this.setState({ isLoading: true });
        let enrollResult = await API.post('/event_enroll.php', {
            "user": {
                "unique_id": this.props.user.unique_id
            },
            "event_list": {
                "event_id": event.EVNT_OBJID
            }
        })
        if (enrollResult.data.result == "success") {
            this.setState({ isLoading: false });
            const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'Welcome' })] });
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Events");
        } else {
            this.setState({ isLoading: false });
            this.dropDownAlertRef.alertWithType('error', `${i18n.translate(strings.ST314)}`, enrollResult.data.message);
        }
    }

    async unroll(event) {
        this.setState({ isLoading: true });
        let unrollResult = await API.post('/event_unroll.php', {
            "user": {
                "unique_id": this.props.user.unique_id
            },
            "event_list": {
                "event_id": event.EVNT_OBJID
            }
        })
        if (unrollResult.data.result == "success") {
            this.setState({ isLoading: false });
            const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'Welcome' })] });
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Events");
        } else {
            this.setState({ isLoading: false });
            this.dropDownAlertRef.alertWithType('error', `${i18n.translate(strings.ST314)}`, unrollResult.data.message);
        }
    }

    async waitingList(event) {
        this.setState({ isLoading: true });
        let waitingResult = await API.post('/event_waiting_enroll.php', {
            "user": {
                "unique_id": this.props.user.unique_id
            },
            "event_list": {
                "event_id": event.EVNT_OBJID
            }
        })
        if (waitingResult.data.result == "success") {
            this.setState({ isLoading: false });
            const resetAction = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'Welcome' })] });
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Events");
        } else {
            this.setState({ isLoading: false });
            this.dropDownAlertRef.alertWithType('error', `${i18n.translate(strings.ST314)}`, waitingResult.data.message);
        }
    }

    // renderStatus() {
    //     const { isRTL, event, event_users } = this.props;
    //     return (
    //         event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 0 && event.EXPIRY_STATUS > 0 ?
    //             event.EVNT_STATUS < 1 ?
    //                 event.EVNT_SCHEDULED_DATE != null && event.EVNT_SCHEDULED_TIME != null ?
    //                     <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#E68127' }]} >
    //                         <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST013)}</Text>
    //                     </View>
    //                     :
    //                     <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#D00211' }]} >
    //                         <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST014)}</Text>
    //                     </View>
    //                 :
    //                 event.ENRLL_USER == 1 ?
    //                     <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#26A65B' }]} >
    //                         <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST015)}</Text>
    //                     </View>
    //                     :
    //                     // <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#F7CA18' }]} >
    //                     //     <Text style={styles.eventStatusTitle}>{"WAITING"}</Text>
    //                     // </View>
    //                     <View />
    //             :
    //             event.ENRLL_USER > 0 ?
    //                 event.EVNT_STATUS < 1 ?
    //                     event.EVNT_SCHEDULED_DATE != null && event.EVNT_SCHEDULED_TIME != null ?
    //                         <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#E68127' }]} >
    //                             <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST013)}</Text>
    //                         </View>
    //                         :
    //                         <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#D00211' }]} >
    //                             <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST014)}</Text>
    //                         </View>
    //                     :
    //                     event.ENRLL_USER == 1 ?
    //                         <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#26A65B' }]} >
    //                             <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST015)}</Text>
    //                         </View>
    //                         :
    //                         // <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#F7CA18' }]} >
    //                         //     <Text style={styles.eventStatusTitle}>{"WAITING"}</Text>
    //                         // </View>
    //                         <View />
    //                 :
    //                 <View />
    //     )
    // }

    renderStatus() {
        const { isRTL, event, event_users } = this.props;
        return (
            event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 0 && event.EXPIRY_STATUS > 0 ?
                event.ENRLL_USER != null ?
                    event.ENRLL_USER == 1 ?
                        <View style={[styles.eventButton, !isRTL ? { left: 10 } : { right: 10 }, { backgroundColor: '#26A65B' }]} >
                            <Text style={styles.eventStatusTitle}>{i18n.translate(strings.ST028)}</Text>
                        </View>

                        :
                        event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 0 ?
                            <View />
                            :
                            event.ENRLL_USER == 0 ?
                                <View />
                                :
                                <View />

                    :
                    event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 1 ?
                        <View />
                        :
                        <View />
                :
                <View />
        )
    }

    renderButton() {
        const { isRTL, event, event_users } = this.props;
        return (
            <View style={[styles.buttonView, { flexDirection: !isRTL ? 'row' : 'row-reverse' }]}>
                {
                    event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 0 && event.EXPIRY_STATUS > 0 ?
                        event.ENRLL_USER != null ?
                            event.ENRLL_USER == 1 ?
                                <TouchableOpacity onPress={() => this.unroll(event)}>
                                    <View style={[styles.actionButton, { backgroundColor: '#D00211' }]} >
                                        <Text style={styles.actionTitle}>{i18n.translate(strings.ST017)}</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 0 ?
                                    <TouchableOpacity onPress={() => this.enroll(event)}>
                                        <View style={[styles.actionButton, { backgroundColor: '#26A65B' }]} >
                                            <Text style={styles.actionTitle}>{i18n.translate(strings.ST018)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    event.ENRLL_USER == 0 ?
                                        <TouchableOpacity onPress={() => this.waitingList(event)}>
                                            <View style={[styles.actionButton, { backgroundColor: '#F7CA18' }]} >
                                                <Text style={styles.actionTitle}>{i18n.translate(strings.ST019)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <View />

                            :
                            event.EVNT_AVAILABILITY - event.ENRLL_COUNT > 1 ?
                                <TouchableOpacity onPress={() => this.enroll(event)}>
                                    <View style={[styles.actionButton, { backgroundColor: '#26A65B' }]} >
                                        <Text style={styles.actionTitle}>{i18n.translate(strings.ST017)}</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.waitingList(event)}>
                                    <View style={[styles.actionButton, { backgroundColor: '#F7CA18' }]} >
                                        <Text style={styles.actionTitle}>{i18n.translate(strings.ST019)}</Text>
                                    </View>
                                </TouchableOpacity>
                        :
                        <View />
                }
            </View>
        )

    }

    render() {
        const { isLoading, isSide } = this.state;
        const { isRTL, event, event_users } = this.props;
        // const isRTL = true;
        if (isLoading) {
            return (
                <AppPreLoader />
            );
        }

        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left style={{ flex: 1 }}>
                        {!isRTL ?
                            <TouchableOpacity style={[styles.back, { marginLeft: 10, marginBottom: -5 }]} onPress={() => this.onBack()} >
                                <MaterialIcons name='chevron-left' style={{ transform: [{ scaleX: 1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Left>
                    <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST011)}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ?
                            <TouchableOpacity style={[styles.back, { marginRight: -25, marginBottom: -5 }]} onPress={() => this.props.navigation.goBack()} >
                                <MaterialIcons name='chevron-left' style={{ transform: [{ scaleX: -1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Right>
                </Header>
                <Body>
                    <View style={styles.main}>
                        <ImageBackground source={{ uri: configs.baseURL + 'images/classes/' + event.CLSS_IMG }} style={styles.image}>
                            <View style={[{ flexDirection: !isRTL ? 'row' : 'row-reverse' }, styles.userShare]}>
                                <View style={styles.userView}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {
                                            event_users.length > 0 ? event_users.map((user, key) => {
                                                return (
                                                    <TouchableOpacity onPress={() => this.dropDownAlertRef.alertWithType('success', `${i18n.translate(strings.ST029)}`, user.name)}>
                                                        <Image key={key} source={{ uri: configs.baseURL + 'images/users/' + user.EMAIL }} style={[styles.userImage]} />
                                                    </TouchableOpacity>
                                                );
                                            })
                                                :
                                                <View />
                                        }
                                    </ScrollView>
                                </View>
                                <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse', justifyContent: 'center', alignItems: 'center', width: wp('15.0%') }}>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name='heart-outline' style={{ transform: [{ scaleX: 1 }], fontSize: 25, color: colors.white }} />
                                    </TouchableOpacity>
                                    <View style={{ width: 10 }} />
                                    <TouchableOpacity onPress={() => this.onShare(event)}>
                                        <Feather name='share-2' style={{ transform: [{ scaleX: 1 }], fontSize: 25, color: colors.white }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.renderStatus()}
                        </ImageBackground>
                        <View style={styles.mainView}>
                            <ScrollView style={{ padding: wp('5.0%') }}>
                                <View style={{ width: wp('90.0%'), height: 60 }}>
                                    <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST020)}</Text>
                                    <Text style={[{ fontSize: 30 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event.CLSS_NAME}</Text>
                                </View>
                                <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse', justifyContent: 'space-between', width: wp('90.0%'), height: 60 }} >
                                    <View style={{ width: wp('45.0%') }}>
                                        <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST022)}</Text>
                                        <Text style={[{ fontSize: 16 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event.EVNT_DATE}</Text>
                                    </View>
                                    <View style={{ width: wp('45.0%') }}>
                                        <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST023)}</Text>
                                        <Text style={[{ fontSize: 16 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event_users.length}/{event.EVNT_AVAILABILITY}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse', justifyContent: 'space-between', width: wp('90.0%'), height: 60 }} >
                                    <View style={{ width: wp('45.0%') }}>
                                        <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST024)}</Text>
                                        <Text style={[{ fontSize: 16 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event.EVNT_START_TIME}</Text>
                                    </View>
                                    <View style={{ width: wp('45.0%') }}>
                                        <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST025)}</Text>
                                        <Text style={[{ fontSize: 16 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event.EVNT_END_TIME}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse', justifyContent: 'space-between', width: wp('90.0%'), height: 60 }} >
                                    <View style={{ width: wp('45.0%') }}>
                                        <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST026)}</Text>
                                        <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse', alignItems: 'center' }}>
                                            <Text style={[{ fontSize: 16 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event.PLCE_NAME}</Text>
                                            <NavigationApps
                                                waze={{ address: '', lat: event.PLCE_LATI, lon: event.PLCE_LONGI, action: actions.navigateByLatAndLon }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ width: wp('45.0%') }}>
                                        <Text style={[styles.label, { textAlign: !isRTL ? 'left' : 'right' }]}>{i18n.translate(strings.ST021)}</Text>
                                        <Text style={[{ fontSize: 16 }, { textAlign: !isRTL ? 'left' : 'right' }]}>{event.COACH_NAME}</Text>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', padding: 5 }}>
                                    <AthenaBannerAd />
                                </View>
                                <View style={{ height: 500 }} />
                            </ScrollView>
                        </View>
                    </View>
                    {this.renderButton()}
                </Body>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref}
                    isRTL={isRTL}
                    contentContainerStyle={{ flex: 1, flexDirection: isRTL ? 'row-reverse' : 'row' }} />
                <AthenaSideMenu
                    isRTL={isRTL}
                    isSide={isSide}
                    navigation={this.props.navigation}
                    onClose={() => this.onClose()}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.account.user,
        isRTL: state.account.isRTL,
        event: state.event.event,
        event_users: state.event.event_users
    }
}

export default connect(mapStateToProps, undefined)(EventDetail);