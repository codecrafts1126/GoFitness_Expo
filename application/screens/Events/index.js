import React from 'react';
import { View, ScrollView, FlatList, Image, Text, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import { Container, Header, Body, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import DropdownAlert from 'react-native-dropdownalert';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Agenda } from 'react-native-calendars';
// import Share, { ShareSheet, Button } from 'react-native-share';

import { connect } from 'react-redux';
import { setEvent, setEventUsers } from '@modules/event/actions';
import { AppPreLoader, AthenaSideMenu } from "@components";
import global from '@constants/styles';
import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';
import configs from '@utils/configs';
// const isRTL = true;

class Events extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isSide: false,
            isEvent: false,
            selectedDate: Moment(new Date()).format("YYYY-MM-DD"),
            // selectedDate: '2019-12-18',
            items: {
                // '2019-12-07': [{text: 'item 1 - any js object'}],
                // '2019-12-08': [{text: 'item 2 - any js object'}],
                // '2019-12-09': [],
                // '2019-12-10': [{text: 'item 3 - any js object'},{text: 'any js object'}]
            },
            markedDates: {

            },
            theme: {
                backgroundColor: '#F3F3F3',
                calendarBackground: colors.white,
                monthTextColor: colors.primary,
                textSectionTitleColor: colors.primary,
                selectedDayBackgroundColor: colors.secondary,
                selectedDayTextColor: colors.white,
                selectedDotColor: colors.white,
                todayTextColor: colors.black,
                dayTextColor: colors.black,
                textDisabledColor: colors.gray_middle,
                dotColor: colors.primary,
                arrowColor: colors.black,
                indicatorColor: colors.white,
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 14,
                textDayHeaderFontSize: 14,
                agendaDayTextColor: colors.primary,
                agendaDayNumColor: colors.black,
                agendaTodayColor: colors.black,
                agendaKnobColor: colors.primary
            },
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

    onClose() {
        this.setState({ isSide: false });
    }


    onEvent(item, users) {
        this.props.setEvent(item);
        this.props.setEventUsers(users);
        const navigateAction = NavigationActions.navigate({ routeName: "EventDetail" });
        this.props.navigation.dispatch(navigateAction);
    }

    async loadItems(day) {
        this.setState({ selectDate: day.dateString });
        for (let i = 0; i < 5; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
                let numItems = 0;
                let eventsResponse = await API.post('/events.php', {
                    "user": {
                        "unique_id": this.props.user.unique_id
                    },
                    "event_list": {
                        "event_date": strTime
                    }
                });
                if (eventsResponse.data.result == "success") {
                    numItems = eventsResponse.data.event_list.length;
                } else {
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
                        this.state.items[strTime].push({
                            events: eventsResponse.data.event_list[j],
                            users: usersResponse.data.users_list,
                            height: Math.max(10, Math.floor(Math.random() * 150))
                        });
                    } else {
                        this.state.items[strTime].push({
                            events: eventsResponse.data.event_list[j],
                            users: [],
                            height: Math.max(10, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
        this.setState({
            items: newItems,
            isLoading: false
        });
    }

    renderItem(item) {
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
                <TouchableOpacity key={item.events.EVNT_OBJID} onPress={() => this.onEvent(item.events, item.users)}>
                    <View style={styles.item}>
                        <Image source={{ uri: configs.baseURL + 'images/classes/' + item.events.CLSS_IMG }} style={styles.image}></Image>
                        <View style={styles.darkView} />
                        <View style={styles.content}>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                                    <View style={[styles.eventTimeCard, { backgroundColor: colors.white }]}>
                                        <Text style={styles.eventTime}>{item.events.EVNT_START_TIME}</Text>
                                    </View>
                                    <View style={[styles.eventButton, { backgroundColor: color }]} >
                                        <Text style={styles.eventStatusTitle}>{i18n.translate(status)}</Text>
                                    </View>
                                </View>
                                <Text style={styles.eventDate}>{item.events.EVNT_DATE}</Text>
                            </View>
                            <Text style={[styles.className, { width: '100%', textAlign: !isRTL ? 'left' : 'right' }]}>{item.events.CLSS_NAME}</Text>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.coachName}>{item.events.COACH_NAME}</Text>
                                <Text style={styles.coachName}>{item.events.PLCE_NAME}</Text>
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
                                                    <Image key={key} source={{ uri: configs.baseURL + 'images/users/' + user.EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                );
                                            })}
                                        </View>
                                        :
                                        item.users.length > 3 ?
                                            <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse' }}>
                                                <Image key={1} source={{ uri: configs.baseURL + 'images/users/' + item.users[1].EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                <Image key={2} source={{ uri: configs.baseURL + 'images/users/' + item.users[2].EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                <Image key={3} source={{ uri: configs.baseURL + 'images/users/' + item.users[3].EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                                <View style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]}><Text style={{ fontSize: 14, color: colors.white }}>+{item.users.length - 3}</Text></View>
                                            </View>
                                            :
                                            <View />
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                :
                <View style={styles.item}>
                    <Image source={{ uri: configs.baseURL + 'images/classes/' + item.events.CLSS_IMG }} style={styles.image}></Image>
                    <View style={[styles.darkView, { backgroundColor: '#00000090' }]} />
                    <View style={styles.content}>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                                <View style={[styles.eventTimeCard, { backgroundColor: '#999' }]}>
                                    <Text style={[styles.eventTime, { color: '#555' }]}>{item.events.EVNT_START_TIME}</Text>
                                </View>
                                <View style={[styles.eventButton, { backgroundColor: color }]} >
                                    <Text style={[styles.eventStatusTitle]}>{i18n.translate(status)}</Text>
                                </View>
                            </View>
                            <Text style={[styles.eventDate, { color: '#888' }]}>{item.events.EVNT_DATE}</Text>
                        </View>
                        <Text style={[styles.className, { width: '100%', textAlign: !isRTL ? 'left' : 'right' }, { color: '#888' }]}>{item.events.CLSS_NAME}</Text>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.coachName, { color: '#888' }]}>{item.events.COACH_NAME}</Text>
                            <Text style={[styles.coachName, { color: '#888' }]}>{item.events.PLCE_NAME}</Text>
                        </View>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20}}>
                            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ionicons name="md-heart" color={"#888"} size={20} />
                                <View style={{ width: 10 }} />
                                <Ionicons name="md-share" color={"#888"} size={20} />
                            </View>
                            {
                                item.users.length > 0 && item.users.length < 4 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        {item.users.map((user, key) => {
                                            return (
                                                <Image key={key} source={{ uri: configs.baseURL + 'images/users/' + user.EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            );
                                        })}
                                    </View>
                                    :
                                    item.users.length > 3 ?
                                        <View style={{ flexDirection: !isRTL ? 'row' : 'row-reverse' }}>
                                            <Image key={1} source={{ uri: configs.baseURL + 'images/users/' + item.users[1].EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            <Image key={2} source={{ uri: configs.baseURL + 'images/users/' + item.users[2].EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            <Image key={3} source={{ uri: configs.baseURL + 'images/users/' + item.users[3].EMAIL }} style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]} />
                                            <View style={[styles.profileImage, !isRTL ? { marginLeft: -15 } : { marginRight: -15 }]}><Text style={{ fontSize: 14, color: colors.white }}>+{item.users.length - 3}</Text></View>
                                        </View>
                                        :
                                        <View />
                            }
                        </View>
                    </View>
                </View>
        );
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
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST010)}</Title>
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
                    <Agenda
                        items={this.state.items}
                        selected={this.state.selectedDate}
                        minDate={Moment(new Date()).format("YYYY-MM-DD")}
                        // selected={"2019-12-15"}
                        // minDate={"2019-12-15"}
                        // minDate={"2019-12-18"}
                        maxDate={'2030-12-31'}
                        // callback that fires when the calendar is opened or closed
                        // onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }} // true or false
                        // callback that gets called on day press
                        // onDayPress={(day) => { console.log('day pressed') }}
                        // callback that gets called when day changes while scrolling agenda list
                        // onDayChange={(day) => { console.log('day changed') }}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={2}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        renderItem={this.renderItem.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        // specify how agenda knob should look like
                        // renderKnob={() => {return (<View />);}}
                        // specify what should be rendered instead of ActivityIndicator
                        renderEmptyData={() => { return (<View />); }}
                        rowHasChanged={this.rowHasChanged.bind(this)}
                        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                        // markedDates={{
                        //     '2019-12-07': { marked : true },
                        //     // '2019-12-06': { selected: true, marked: true },
                        //     // '2019-12-17': { marked: true },
                        //     // '2019-12-18': { disabled: true }
                        // }}
                        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                        // onRefresh={() => this.loadItems("2019-12-05")}
                        // Set this true while waiting for new data from a refresh
                        refreshing={false}
                        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                        refreshControl={null}
                        theme={this.state.theme}
                        style={{
                            width: wp('100.0%'),
                        }}
                    />
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

    // onShare(events) {
    //     this.setState({
    //         shareOptions: {
    //             title: events.CLSS_NAME,
    //             message: events.CLSS_NAME,
    //             url: configs.baseURL + 'images/classes/' + events.CLSS_IMG,
    //             subject: "Share Link"
    //         }
    //     })
    //     this.setState({ shareVisible: true });
    //     // this.openShare();
    // }

    // openShare() {
    //     const { shareOptions } = this.state;
    //     Share.open(shareOptions);
    // }

    // onCancel() {
    //     this.setState({ shareVisible: false });
    // }

    renderEmptyDate() {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyTitle}>{i18n.translate(strings.ST016)}</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
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

export default connect(mapStateToProps, mapDispatchToProps)(Events);