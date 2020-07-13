import React from 'react';
import { View, ScrollView, FlatList, Image, Text, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import { Container, Header, Body, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import DropdownAlert from 'react-native-dropdownalert';
import Swiper from 'react-native-swiper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

import { connect } from 'react-redux';
import { setEvent, setEventUsers } from '@modules/event/actions';
import { AppPreLoader, AthenaSideMenu, AthenaBannerAd } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';
import configs from '@utils/configs';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isSide: false,
            isEvent: true,
            workouts: []
        }
    }

    async componentWillMount() {
        let numItems = 0;
        let eventsResponse = await API.post('/events.php', {
            "user": {
                "unique_id": this.props.user.unique_id
            },
            "event_list": {
                "event_date": Moment(new Date()).format("YYYY-MM-DD")
            }
        });
        if (eventsResponse.data.result == "success") {
            this.setState({ isEvent: true })
            numItems = eventsResponse.data.event_list.length;
        } else {
            this.setState({ isEvent: false })
            numItems = 0;
        }
        for (let j = 0; j < numItems; j++) {
            let usersResponse = await API.post('/event_users.php', {
                "user": {
                    "unique_id": this.props.user.unique_id
                },
                "event_list": {
                    "event_id": eventsResponse.data.event_list[j].EVNT_OBJID
                }
            });
            if (usersResponse.data.result == "success") {
                this.state.workouts.push({
                    events: eventsResponse.data.event_list[j],
                    users: usersResponse.data.users_list,
                });
            } else {
                this.state.workouts.push({
                    events: eventsResponse.data.event_list[j],
                    users: [],
                });
            }
        }

        let postsResponse = await API.post('/data_posts.php');
        let dietsResponse = await API.post('/data_diets.php');
        let exercisesResponse = await API.post('/data_bodyparts.php');
        this.setState({
            posts: postsResponse.data,
            diets: dietsResponse.data,
            exercises: exercisesResponse.data,
            isLoading: false
        });

        if (this.props.profile.name != "") {
            this.dropDownAlertRef.alertWithType('success', `${i18n.translate(strings.ST338)}`, this.props.profile.name);
        }

    }

    onClose() {
        this.setState({ isSide: false });
    }

    onRoute(route) {
        const navigateAction = NavigationActions.navigate({ routeName: route });
        this.props.navigation.dispatch(navigateAction);
    }

    renderSilder() {
        const { isRTL } = this.props;
        return (
            <View style={styles.sliderView}>
                <Swiper
                    dotColor='white'
                    dotStyle={[isRTL ? { right: -wp('25.0%') } : { left: -wp('25.0%') }, { marginBottom: -10 }]}
                    activeDotColor='red'
                    activeDotStyle={[isRTL ? { right: -wp('25.0%') } : { left: -wp('25.0%') }, { marginBottom: -10 }]}
                    showsButtons={false}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={5.0}
                    pagingEnabled={true}
                >
                    {
                        this.state.posts.map((item, key) =>
                            <View key={key} >
                                <Image resizeMode={'cover'} source={{ uri: configs.baseURL + 'images/' + item.post_image }} style={styles.image} />
                                <Text style={[styles.title, isRTL ? { textAlign: 'right' } : { textAlign: 'left' }]} >
                                    {item.post_title}
                                </Text>
                            </View>
                        )
                    }
                </Swiper>
            </View>
        )
    }

    async onEvent(event, users) {
        this.props.setEvent(event);
        this.props.setEventUsers(users);
        const navigateAction = NavigationActions.navigate({ routeName: "EventDetail" });
        this.props.navigation.dispatch(navigateAction);
    }

    renderEventItem(item, index) {
        const { isRTL } = this.props;
        let status = strings.ST027;
        let color = '';

        if (item.events.EVNT_AVAILABILITY - item.events.ENRLL_COUNT > 0 && item.events.EXPIRY_STATUS > 0) {
            if (item.events.EVNT_STATUS < 1) {
                if (item.events.EVNT_SCHEDULED_DATE != null && item.events.EVNT_SCHEDULED_TIME != null) {
                    status = strings.ST013;
                    color = '#E68127';
                } else {
                    status = strings.ST014;
                    color = '#D00211';
                }
            } else {
                if (item.events.ENRLL_USER == 1) {
                    // status = strings.ST015;
                    status = strings.ST028;
                    color = '#26A65B';
                }
            }
        } else {
            if (item.events.ENRLL_USER > 0) {
                if (item.events.EVNT_STATUS < 1) {
                    if (item.events.EVNT_SCHEDULED_DATE != null && item.events.EVNT_SCHEDULED_TIME != null) {
                        status = strings.ST013;
                        color = '#E68127';
                    } else {
                        status = strings.ST014;
                        color = '#D00211';
                    }
                } else {
                    if (item.events.ENRLL_USER == 1) {
                        // status = strings.ST015;
                        status = strings.ST028;
                        color = '#26A65B';
                    }
                }
            }
        }
        return (
            color != '#E68127' && color != '#D00211' ?
                <TouchableOpacity key={index} onPress={() => this.onEvent(item.events, item.users)}>
                    <View style={[styles.itemEvent, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}>
                        <Image source={{ uri: configs.baseURL + 'images/classes/' + item.events.CLSS_IMG }} style={styles.imageEvent}></Image>
                        <View style={styles.darkViewEvent} />
                        <View style={styles.contentEvent}>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                                    <View style={[styles.eventTimeCardEvent, { backgroundColor: colors.white }]}>
                                        <Text style={styles.eventTimeEvent}>{item.events.EVNT_START_TIME}</Text>
                                    </View>
                                    <View style={[styles.eventButtonEvent, { backgroundColor: color }]} >
                                        <Text style={styles.eventStatusTitleEvent}>{i18n.translate(status)}</Text>
                                    </View>
                                </View>
                                <Text style={styles.eventDateEvent}>{item.events.EVNT_DATE}</Text>
                            </View>
                            <Text style={[styles.classNameEvent, { width: '100%', textAlign: !isRTL ? 'left' : 'right' }]}>{item.events.CLSS_NAME}</Text>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.coachNameEvent}>{item.events.COACH_NAME}</Text>
                                <Text style={styles.coachNameEvent}>{item.events.PLCE_NAME}</Text>
                            </View>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 }}>
                                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Ionicons name="md-heart" color={colors.white} size={20} />
                                    </TouchableOpacity>
                                    <View style={{ width: 10 }} />
                                    <TouchableOpacity>
                                        <Ionicons name="md-share" color={colors.white} size={20} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    item.users.length > 0 && item.users.length < 4 ?
                                        <View style={{ flexDirection: 'row' }}>
                                            {item.users.map((user, key) => {
                                                return (
                                                    <Image key={key} source={{ uri: configs.baseURL + 'images/users/' + user.EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                );
                                            })}
                                        </View>
                                        :
                                        item.users.length > 3 ?
                                            <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse' }}>
                                                <Image key={1} source={{ uri: configs.baseURL + 'images/users/' + item.users[1].EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                <Image key={2} source={{ uri: configs.baseURL + 'images/users/' + item.users[2].EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                <Image key={3} source={{ uri: configs.baseURL + 'images/users/' + item.users[3].EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                <View style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]}><Text style={{ fontSize: 14, color: colors.white }}>+{item.users.length - 3}</Text></View>
                                            </View>
                                            :
                                            <View />
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                :
                <View key={index} style={[styles.itemEvent, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}>
                    <Image source={{ uri: configs.baseURL + 'images/classes/' + item.events.CLSS_IMG }} style={styles.imageEvent}></Image>
                    <View style={[styles.darkViewEvent, { backgroundColor: '#00000090' }]} />
                    <View style={styles.contentEvent}>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                                <View style={[styles.eventTimeCardEvent, { backgroundColor: colors.white }]}>
                                    <Text style={[styles.eventTimeEvent, { color: '#888' }]}>{item.events.EVNT_START_TIME}</Text>
                                </View>
                                <View style={[styles.eventButtonEvent, { backgroundColor: color }]} >
                                    <Text style={[styles.eventStatusTitleEvent]}>{i18n.translate(status)}</Text>
                                </View>
                            </View>
                            <Text style={[styles.eventDateEvent, { color: '#DDD' }]}>{item.events.EVNT_DATE}</Text>
                        </View>
                        <Text style={[styles.classNameEvent, { width: '100%', textAlign: !isRTL ? 'left' : 'right' }, { color: '#DDD' }]}>{item.events.CLSS_NAME}</Text>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.coachNameEvent, { color: '#DDD' }]}>{item.events.COACH_NAME}</Text>
                            <Text style={[styles.coachNameEvent, { color: '#DDD' }]}>{item.events.PLCE_NAME}</Text>
                        </View>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 }}>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ionicons name="md-heart" color={"#DDD"} size={20} />
                                <View style={{ width: 10 }} />
                                <Ionicons name="md-share" color={"#DDD"} size={20} />
                            </View>
                            {
                                item.users.length > 0 && item.users.length < 4 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        {item.users.map((user, key) => {
                                            return (
                                                <Image key={key} source={{ uri: configs.baseURL + 'images/users/' + user.EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            );
                                        })}
                                    </View>
                                    :
                                    item.users.length > 3 ?
                                        <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse' }}>
                                            <Image key={1} source={{ uri: configs.baseURL + 'images/users/' + item.users[1].EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            <Image key={2} source={{ uri: configs.baseURL + 'images/users/' + item.users[2].EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            <Image key={3} source={{ uri: configs.baseURL + 'images/users/' + item.users[3].EMAIL }} style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            <View style={[styles.profileImageEvent, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]}><Text style={{ fontSize: 14, color: colors.white }}>+{item.users.length - 3}</Text></View>
                                        </View>
                                        :
                                        <View />
                            }
                        </View>
                    </View>
                </View>
        );
    }

    renderWorkouts() {
        const { isRTL } = this.props;
        const { isEvent } = this.state;
        return (
            isEvent ?
                <View style={styles.workoutView}>
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{i18n.translate(strings.ST010)}</Text>
                        <TouchableOpacity onPress={() => this.onRoute("Events")}>
                            <Text style={{ fontSize: 14, color: colors.gray, textDecorationLine: 'underline' }}>{i18n.translate(strings.ST009)}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <SwiperFlatList
                        style={!isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }}
                        data={this.state.workouts}
                        renderItem={({ item, index }) =>
                            // <TouchableOpacity onPress={() => this.onEvent(item)}>
                            //     <View key={index} style={styles.workoutCard}>
                            //         <Image resizeMode={'cover'} source={{ uri: configs.baseURL + 'images/classes/' + item.CLSS_IMG }} style={[styles.workoutImage, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]} />
                            //         <Text style={[styles.workoutTitle, !isRTL ? { textAlign: 'left', transform: [{ scaleX: 1 }] } : { textAlign: 'right', transform: [{ scaleX: -1 }] }]}>{item.CLSS_NAME}</Text>
                            //     </View>
                            // </TouchableOpacity>
                            this.renderEventItem(item, index)
                        }
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                    <ScrollView
                        style={!isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {this.state.workouts.map((item, key) => {
                            return (
                                this.renderEventItem(item, key)
                            )
                        })
                        }
                    </ScrollView>
                </View> :
                <View style={styles.workoutView}>
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{i18n.translate(strings.ST010)}</Text>
                        <TouchableOpacity onPress={() => this.onRoute("Events")}>
                            <Text style={{ fontSize: 14, color: colors.gray, textDecorationLine: 'underline' }}>{i18n.translate(strings.ST009)}</Text>
                        </TouchableOpacity>
                    </View>
                    <LinearGradient
                        colors={['#5F6368', '#808080']}
                        start={{ x: 0.5, y: 0.8 }}
                        end={{ x: 0.3, y: 0.0 }}
                        style={styles.emptyView}
                    >
                        <Text style={styles.emptyTitle}>{i18n.translate(strings.ST012)}</Text>
                        <Text style={styles.emptyTime}>{Moment(new Date()).format("YYYY-MM-DD")}</Text>
                    </LinearGradient>
                </View>
        )
    }

    renderDiets() {
        const { isRTL } = this.props;
        return (
            <View style={styles.workoutView}>
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{i18n.translate(strings.ST003)}</Text>
                    <TouchableOpacity onPress={() => this.onRoute("Diets")}>
                        <Text style={{ fontSize: 14, color: colors.gray, textDecorationLine: 'underline' }}>{i18n.translate(strings.ST009)}</Text>
                    </TouchableOpacity>
                </View>
                {/* <SwiperFlatList
                    style={!isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }}
                    data={this.state.diets}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity>
                            <View key={index} style={styles.workoutCard}>
                                <Image resizeMode={'cover'} source={{ uri: configs.baseURL + 'images/' + item.diet_image }} style={[styles.workoutImage, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]} />
                                <Text style={[styles.workoutTitle, !isRTL ? { textAlign: 'left', transform: [{ scaleX: 1 }] } : { textAlign: 'right', transform: [{ scaleX: -1 }] }]}>{item.diet_title}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                /> */}

                <ScrollView
                    style={!isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>
                    {this.state.diets.map((item, key) => {
                        return (
                            <TouchableOpacity>
                                <View key={key} style={styles.workoutCard}>
                                    <Image resizeMode={'cover'} source={{ uri: configs.baseURL + 'images/' + item.diet_image }} style={[styles.workoutImage, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]} />
                                    <Text style={[styles.workoutTitle, !isRTL ? { textAlign: 'left', transform: [{ scaleX: 1 }] } : { textAlign: 'right', transform: [{ scaleX: -1 }] }]}>{item.diet_title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }
                </ScrollView>
            </View>
        )
    }

    renderExercises() {
        const { isRTL } = this.props;
        return (
            <View style={styles.bodypartsView}>
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{i18n.translate(strings.ST003)}</Text>
                    <TouchableOpacity onPress={() => this.onRoute("Exercises")}>
                        <Text style={{ fontSize: 14, color: colors.gray, textDecorationLine: 'underline' }}>{i18n.translate(strings.ST009)}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <View style={styles.bodypartsCard}>
                        <Image resizeMode={'cover'} source={{ uri: configs.baseURL + 'images/' + this.state.exercises[3].bodypart_image }} style={styles.bodypartsImage} />
                        <Text style={[styles.bodypartsTitle, !isRTL ? { textAlign: 'left' } : { textAlign: 'right' }]}>{this.state.exercises[3].bodypart_title}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.bodypartsCard}>
                        <Image resizeMode={'cover'} source={{ uri: configs.baseURL + 'images/' + this.state.exercises[5].bodypart_image }} style={styles.bodypartsImage} />
                        <Text style={[styles.bodypartsTitle, !isRTL ? { textAlign: 'left' } : { textAlign: 'right' }]}>{this.state.exercises[5].bodypart_title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { isLoading, isSide } = this.state;
        const { isRTL } = this.props;
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
                            <TouchableOpacity style={[styles.back, { marginLeft: 10, marginBottom: -5 }]} onPress={() => this.setState({ isSide: true })} >
                                <Ionicons name='md-menu' style={{ transform: [{ scaleX: 1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Left>
                    <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST000)}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ?
                            <TouchableOpacity style={[styles.back, { marginRight: -25, marginBottom: -5 }]} onPress={() => this.setState({ isSide: true })} >
                                <Ionicons name='md-menu' style={{ transform: [{ scaleX: -1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Right>
                </Header>
                <Body>
                    <ScrollView contentContainerStyle={{ alignItems: 'center', backgroundColor: '#F3F3F3' }}>
                        <View style={{ position: 'absolute', width: wp('100.0%'), height: 150, backgroundColor: colors.secondary }} />
                        {this.renderSilder()}
                        {this.renderWorkouts()}
                        {this.renderDiets()}
                        {this.renderExercises()}
                        <View style={{ alignItems: 'center', padding: 5, height: 100 }}>
                            <AthenaBannerAd />
                        </View>
                    </ScrollView>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEvent: (data) => {
            dispatch(setEvent(data))
        },
        setEventUsers: (data) => {
            dispatch(setEventUsers(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);