import React from 'react';
import { View, ImageBackground, TouchableOpacity, AsyncStorage, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';
import { Container, Header, Body, Footer, Left, Right, Title, Text, List, Button, Thumbnail, ListItem } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Video } from 'expo-av';
import { Grid, Row, Col } from 'react-native-easy-grid';
import DropdownAlert from 'react-native-dropdownalert';
import { LinearGradient } from 'expo-linear-gradient';

import { connect } from 'react-redux';
import { setEvent, setEventUsers } from '@modules/event/actions';
import { AppPreLoader, AthenaBannerAd } from "@components";
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

class ExerciseDetails extends React.Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            item: params.item,
            mute: true,
            shouldPlay: false,
        }
    }

    handlePlayAndPause = () => {
        this.setState((prevState) => ({
            shouldPlay: !prevState.shouldPlay
        }));
    }

    componentDidMount() {

        return fetch(configs.baseURL + 'json/data_bodypart.php?exercise=' + this.props.navigation.state.params.item.exercise_id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // async componentDidMount() {
    //     let bodyPartResponse = await API.post('/data_bodyparts.php', {
    //         "user": {
    //             "unique_id": this.props.user.unique_id
    //         }
    //     });
    //     if (bodyPartResponse.data.result == "success") {
    //         this.setState({ isLoading: true, dataSource: bodyPartResponse.data })
    //     }
    // }

    render() {
        const { item } = this.state;
        const { isRTL } = this.props;

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
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST002)}</Title>
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
                <ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: 15 }}>
                        <AthenaBannerAd />
                    </View>
                    <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 15, paddingBottom: 0, marginBottom: 15 }}>
                        <Text style={{ color: 'rgba(0,0,0,0.3)' }}>{item.exercise_title}</Text>
                    </View>

                    <Video usePoster={true} source={{ uri: item.exercise_video }} posterSource={{ uri: configs.baseURL + 'images/' + item.exercise_image }} shouldPlay={this.state.shouldPlay} resizeMode="contain" style={{ width: hp('30.0%'), height: hp('30.0%'), borderWidth: 1, borderColor: '#FFF', borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
                        isMuted={this.state.mute}
                    />

                    <Grid>
                        <Row style={{ height: 110 }}>
                            <Col style={Styles.col_exercise}>
                                <Image source={require('@assets/images/sets.png')} resizeMode="contain" style={Styles.icon_exercise} />
                                <Text style={Styles.titlecol_exercise}>{i18n.translate(strings.ST097)}</Text>
                                <Text>{item.exercise_sets}</Text>
                            </Col>
                            <Col style={Styles.col_exercise}>
                                <Image source={require('@assets/images/reps.png')} resizeMode="contain" style={Styles.icon_exercise} />
                                <Text style={Styles.titlecol_exercise}>{i18n.translate(strings.ST098)}</Text>
                                <Text>{item.exercise_reps}</Text>
                            </Col>
                            <Col style={Styles.col_exercise}>
                                <Image source={require('@assets/images/chrono.png')} resizeMode="contain" style={Styles.icon_exercise} />
                                <Text style={Styles.titlecol_exercise}>{i18n.translate(strings.ST099)}</Text>
                                <Text>{item.exercise_rest}</Text>
                            </Col>
                        </Row>
                        <Row style={{ backgroundColor: '#FFF', borderTopWidth: 0, borderColor: 'rgba(0,0,0,0.2)', marginBottom: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20, paddingTop: 16, paddingBottom: 20 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{i18n.translate(strings.ST100)}</Text>
                                <Text>{item.equipment_title}</Text>
                                <View style={{ padding: 8 }} />
                                <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{i18n.translate(strings.ST101)}</Text>
                                <FlatList data={this.state.dataSource} refreshing="false" renderItem={({ item }) => <Text>{item.bodypart_title}</Text>} keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </Row>
                    </Grid>
                </ScrollView>
                {/* </Body> */}
                <Footer style={{ height: hp('10.0%'), backgroundColor: '#FFF', borderColor: '#FFF', borderTopWidth: 0, elevation: 0, shadowOpacity: 0 }}>
                    <Grid>
                        <Row>
                            <Col style={Styles.playCol_exercise}>
                                {this.state.shouldPlay ? (
                                    <Button rounded block onPress={this.handlePlayAndPause} style={Styles.playButton}>
                                        <Text>{i18n.translate(strings.ST103)}</Text>
                                    </Button>
                                ) : (
                                        <Button rounded block onPress={this.handlePlayAndPause} style={Styles.playButton}>
                                            <Text>{i18n.translate(strings.ST102)}</Text>
                                        </Button>
                                    )}
                            </Col>
                        </Row>
                    </Grid>
                </Footer>
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

export default connect(mapStateToProps, undefined)(ExerciseDetails);