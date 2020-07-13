import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, FlatList, ScrollView, AsyncStorage, SafeAreaView } from 'react-native';
import { Container, Header, Body, Left, Right, Title, List, ListItem, Thumbnail, Tab, Tabs } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import SwiperFlatList from 'react-native-swiper-flatlist';
import DropdownAlert from 'react-native-dropdownalert';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, Row, Col } from 'react-native-easy-grid';
import HTML from 'react-native-render-html';
import Toast from 'react-native-root-toast';

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

class DietDetails extends React.Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            isLoading: false,
            item: params.item
        };
    }

    saveDiets = async (diet_id, diet_title, diet_image, diet_servings, diet_time, diet_calories, diet_protein, diet_fat, diet_carbs, diet_ingredients, diet_directions, diet_description, uid) => {
        try {
            let diet = {
                userId: uid,
                diet_id: diet_id,
                diet_title: diet_title,
                diet_image: diet_image,
                diet_servings: diet_servings,
                diet_time: diet_time,
                diet_calories: diet_calories,
                diet_protein: diet_protein,
                diet_fat: diet_fat,
                diet_carbs: diet_carbs,
                diet_ingredients: diet_ingredients,
                diet_directions: diet_directions,
                diet_description: diet_description

            }
            const diets = await AsyncStorage.getItem('diets') || '[]';
            let dietsFav = JSON.parse(diets);
            dietsItems = dietsFav.filter(function (e) { return e.diet_id !== diet_id && e.userId == uid })
            dietsItems.push(diet);
            AsyncStorage.setItem('diets', JSON.stringify(dietsItems)).then(() => {
                Toast.show(Strings.ST53, { duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true })
            });

        } catch (error) {

        }
    };

    render() {
        const { isLoading, isSide, item } = this.state;
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
                            <TouchableOpacity style={[styles.back, { marginLeft: 10, marginBottom: -5 }]} onPress={() => this.props.navigation.goBack()} >
                                <MaterialIcons name='chevron-left' style={{ transform: [{ scaleX: 1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Left>
                    <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                        <Title style={{ fontSize: 20, color: colors.white }}>{this.props.navigation.state.params.item.diet_title}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ?
                            <TouchableOpacity style={[styles.back, { marginRight: -25, marginBottom: -5 }]} onPress={() => this.props.navigation.goBack()} >
                                <MaterialIcons name='chevron-left' style={{ transform: [{ scaleX: -1 }], fontSize: 22, color: colors.white }} />
                            </TouchableOpacity> : <View />
                        }
                    </Right>
                </Header>
                {/* <Body> */}
                <ImageBackground source={{ uri: configs.baseURL + 'images/' + item.diet_image }} style={Styles.background_diets_col}>
                    <TouchableOpacity activeOpacity={1} style={Styles.touchBookmarkTran} onPress={this.saveDiets.bind(this, item.diet_id, item.diet_title, item.diet_image, item.diet_servings, item.diet_time, item.diet_calories, item.diet_protein, item.diet_fat, item.diet_carbs, item.diet_ingredients, item.diet_directions, item.diet_description, this.props.user.unique_id)}>
                        <Ionicons name="md-star" size={25} color="white" />
                    </TouchableOpacity>

                    <Grid style={{ position: 'absolute', bottom: 0, zIndex: 2 }}>
                        <Col style={Styles.info_diets}>
                            <Text style={{ color: '#FFF' }}> {i18n.translate(strings.ST043)} {item.diet_servings}</Text>
                        </Col>
                        <Col style={Styles.info_diets}>
                            <Text style={{ color: '#FFF' }}> {i18n.translate(strings.ST044)} {item.diet_time}</Text>
                        </Col>
                    </Grid>
                </ImageBackground>

                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#4284d5' }} tabContainerStyle={{ elevation: 0 }}>
                    <Tab heading={i18n.translate(strings.ST046)} tabStyle={Styles.tabs_diets} activeTabStyle={Styles.activetabs_diets} textStyle={Styles.tabs_text_diets} activeTextStyle={Styles.activetabs_text_diets}>
                        <ScrollView>
                            <View style={{ margin: 15, marginTop: 5 }}>
                                <Grid>
                                    <Row style={{ height: 75, backgroundColor: '#fff' }}>
                                        <Col style={Styles.col_diets}>
                                            <Text>{item.diet_calories}</Text>
                                            <Text style={Styles.titlecol_diets}>{i18n.translate(strings.ST049)}</Text>
                                        </Col>

                                        <Col style={Styles.col_diets}>
                                            <Text>{item.diet_protein}</Text>
                                            <Text style={Styles.titlecol_diets}>{i18n.translate(strings.ST050)}</Text>
                                        </Col>

                                        <Col style={Styles.col_diets}>
                                            <Text>{item.diet_fat}</Text>
                                            <Text style={Styles.titlecol_diets}>{i18n.translate(strings.ST051)}</Text>
                                        </Col>

                                        <Col style={Styles.col_diets}>
                                            <Text>{item.diet_carbs}</Text>
                                            <Text style={Styles.titlecol_diets}>{i18n.translate(strings.ST052)}</Text>
                                        </Col>
                                    </Row>
                                    <Text style={Styles.title_diets_detail}>{item.diet_title}</Text>
                                    <HTML html={item.diet_description} />
                                </Grid>
                            </View>
                        </ScrollView>
                    </Tab>

                    <Tab heading={i18n.translate(strings.ST047)} tabStyle={Styles.tabs_diets} activeTabStyle={Styles.activetabs_diets} textStyle={Styles.tabs_text_diets} activeTextStyle={Styles.activetabs_text_diets}>
                        <ScrollView>
                            <View style={{ margin: 15, marginTop: 20 }}>
                                <HTML html={item.diet_ingredients} />
                            </View>
                        </ScrollView>
                    </Tab>

                    <Tab heading={i18n.translate(strings.ST048)} tabStyle={Styles.tabs_diets} activeTabStyle={Styles.activetabs_diets} textStyle={Styles.tabs_text_diets} activeTextStyle={Styles.activetabs_text_diets}>
                        <ScrollView>
                            <View style={{ marginTop: 20, marginRight: 15 }}>
                                <HTML html={item.diet_directions} />
                            </View>
                        </ScrollView>
                    </Tab>
                </Tabs>

                <SafeAreaView>
                    <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <AthenaBannerAd />
                    </View>
                </SafeAreaView>
                {/* </Body> */}
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

export default connect(mapStateToProps, undefined)(DietDetails);