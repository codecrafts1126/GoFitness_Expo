import React from 'react';
import { View, ImageBackground, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import { Container, Header, Body, Left, Right, Title, Text } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import DropdownAlert from 'react-native-dropdownalert';
import { LinearGradient } from 'expo-linear-gradient';

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
var Styles = require('@utils/styles');
// const isRTL = true;

class EBodyparts extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
    
        return fetch(configs.baseURL + 'json/data_bodyparts.php')
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

    ListExercisesByMuscle = (bodypart_id, bodypart_title) => {
        this.props.navigation.navigate('ExercisesByMuscleScreen', { IdMuscle: bodypart_id, TitleBodypart: bodypart_title });
    }

    render() {
        const { isLoading } = this.state;
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
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST065)}</Title>
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
                    <FlatList
                        data={this.state.dataSource}
                        refreshing="false"
                        numColumns={2}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={this.ListExercisesByMuscle.bind(this, item.bodypart_id, item.bodypart_title)} activeOpacity={1} style={{ flex: 1 }}>
                                <ImageBackground source={{ uri: configs.baseURL + 'images/' + item.bodypart_image }} style={Styles.background_2columns}>
                                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={Styles.gradient_2columns}>
                                        <View style={Styles.title_categories_border}></View>
                                        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']} style={Styles.title_2columns_background}>
                                            <Text numberOfLines={1} style={Styles.title_categories}>{item.bodypart_title}</Text>
                                        </LinearGradient>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
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

export default connect(mapStateToProps, undefined)(EBodyparts);