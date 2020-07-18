import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, FlatList, ScrollView, AsyncStorage, Animated } from 'react-native';
import { Container, Header, Body, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import SwiperFlatList from 'react-native-swiper-flatlist';
import DropdownAlert from 'react-native-dropdownalert';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, Row } from 'react-native-easy-grid';

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
var Styles = require('@utils/styles');
// const isRTL = true;

class Diets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSide: false,
        }
    }

    componentDidMount() {

        var request_1_url = configs.baseURL + 'json/data_diets.php';
        var request_2_url = configs.baseURL + 'json/data_categories.php';

        fetch(request_1_url).then((response) => response.json()).then((responseJson) => {
            this.setState({
                diets: responseJson.filter(x => x.diet_featured == '1')
            });
        }).then(() => {
            fetch(request_2_url).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    categories: responseJson,
                    isLoading: false,
                });
            }).done();
        }).done();
    }

    onClose() {
        this.setState({ isSide: false });
    }

    DietDetails(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'DietDetailsScreen',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    DietsByCategory = (category_id, category_title) => {
        this.props.navigation.navigate('DietsByCategoryScreen', { IdCategory: category_id, TitleCategory: category_title });
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
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST003)}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ?
                            <TouchableOpacity style={[styles.back, { marginRight: -25, marginBottom: -5 }]} onPress={() => this.setState({ isSide: true })} >
                                <Ionicons name='md-menu' style={{ transform: [{ scaleX: -1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Right>
                </Header>
                {/* <Body> */}
                <ScrollView>
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={5}
                        autoplayLoop
                        data={this.state.diets}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this.DietDetails(item)} activeOpacity={1}>
                                <ImageBackground source={{ uri: configs.baseURL + 'images/' + item.diet_image }} style={Styles.background_diets}>
                                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={Styles.gradient_diets}>
                                        <Text style={Styles.category_diets}>{item.category_title}</Text>
                                        <Text style={Styles.title_diets}>{item.diet_title}</Text>
                                        <Text style={Styles.subcategory_diets}>{i18n.translate(strings.ST043)} {item.diet_servings} | {i18n.translate(strings.ST044)} {item.diet_time}</Text>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <View style={{ margin: 7, marginTop: 5 }}>
                        <Text style={{ padding: 8, fontSize: 18, fontWeight: 'bold' }}>{i18n.translate(strings.ST041)}</Text>
                        <SwiperFlatList
                            data={this.state.categories}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={this.DietsByCategory.bind(this, item.category_id, item.category_title)} activeOpacity={1} style={{ flex: 1 }}>
                                    <View style={{ margin: 5, marginLeft: 4 }}>
                                        <ImageBackground source={{ uri: configs.baseURL + 'images/' + item.category_image }} style={Styles.background_diets_2columns}>
                                            <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={Styles.gradient_diets_2columns}>
                                                <Text numberOfLines={1} style={Styles.title_diets_categories}>{item.category_title}</Text>
                                            </LinearGradient>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', padding: 5, marginBottom: 4 }}>
                        <AthenaBannerAd />
                    </View>

                    <Text style={{ padding: 8, fontSize: 18, fontWeight: 'bold' }}>{i18n.translate(strings.ST042)}</Text>

                    <List>
                        <FlatList
                            data={this.state.diets}
                            refreshing="false"
                            renderItem={({ item }) =>

                                <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={() => this.DietDetails(item)} >
                                    <Thumbnail rounded size={80} source={{ uri: configs.baseURL + 'images/' + item.diet_image }} style={{ paddingLeft: 10, marginLeft: 10 }} />
                                    <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 14, marginBottom: 3 }}>
                                            {item.diet_title}
                                        </Text>
                                        <Text note>
                                            <Icon name="ios-flame" /> {item.diet_calories} {i18n.translate(strings.ST045) + "."}
                                        </Text>
                                    </Body>
                                    <Right>
                                        <Text note>
                                            <Icon name="ios-arrow-forward" style={{ fontSize: 16 }} />
                                        </Text>
                                    </Right>
                                </ListItem>

                            }
                            keyExtractor={(item, index) => index.toString()}

                        />

                    </List>

                </ScrollView>
                {/* </Body> */}
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

export default connect(mapStateToProps, undefined)(Diets);