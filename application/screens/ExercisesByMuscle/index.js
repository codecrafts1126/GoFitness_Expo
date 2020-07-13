import React from 'react';
import { View, ImageBackground, TouchableOpacity, AsyncStorage, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Container, Header, Body, Left, Right, Title, Text, List, ListView, Thumbnail, ListItem } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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

class ExercisesByMuscle extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {

        return fetch(configs.baseURL + 'json/data_muscle.php?muscle=' + this.props.navigation.state.params.IdMuscle)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
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

    ExerciseDetails(item) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'ExerciseDetailsScreen',
            params: { item }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const { isLoading } = this.state;
        const { isRTL } = this.props;
        const { params } = this.props.navigation.state;
        const IdMuscle = params ? params.IdMuscle : null;
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
                        <Title style={{ fontSize: 20, color: colors.white }}>{this.props.navigation.state.params.TitleBodypart}</Title>
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
                    <List>
                        <FlatList
                            data={this.state.dataSource}
                            refreshing="false"
                            renderItem={({ item }) =>

                                <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={() => this.ExerciseDetails(item)} >
                                    <Thumbnail square size={80} source={{ uri: configs.baseURL + 'images/' + item.exercise_image }} style={{ paddingLeft: 10, marginLeft: 10 }} />
                                    <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 14, marginBottom: 3 }}>
                                            {item.exercise_title}
                                        </Text>
                                        <Text note>
                                            {item.level_title}
                                        </Text>
                                    </Body>
                                    <Right>
                                        <Text note>
                                            <Icon name="arrow-right" style={{ fontSize: 16 }} />
                                        </Text>
                                    </Right>
                                </ListItem>

                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </List>
                </ScrollView>
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

export default connect(mapStateToProps, undefined)(ExercisesByMuscle);