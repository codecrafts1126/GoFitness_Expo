import React from 'react';
import { View, ImageBackground, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import { Container, Header, Body, Left, Right, Title, Text, List, Thumbnail, ListItem } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import DropdownAlert from 'react-native-dropdownalert';

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

class Equipments extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {

        return fetch(configs.baseURL + 'json/data_equipments.php')
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
    //     let equipmentsResponse = await API.post('/data_equipments.php', {
    //         "user": {
    //             "unique_id": this.props.user.unique_id
    //         }
    //     });
    //     if (equipmentsResponse.data.result == "success") {
    //         this.setState({ isLoading: true, dataSource: equipmentsResponse.data })
    //     }
    // }

    ListExercisesByEquipment = (equipment_id, equipment_title) => {
        this.props.navigation.navigate('ExercisesByEquipmentScreen', { IdEquipment: equipment_id, TitleEquipment: equipment_title });
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
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST067)}</Title>
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
                    <List>
                        <FlatList
                            data={this.state.dataSource}
                            refreshing="false"
                            renderItem={({ item }) =>

                                <ListItem style={{ paddingLeft: 0, marginLeft: 0, backgroundColor: '#FFF', opacity: 1, borderColor: 'rgba(0,0,0,0.05)', borderBottomWidth: 1 }} onPress={this.ListExercisesByEquipment.bind(this, item.equipment_id, item.equipment_title)} >
                                    <Thumbnail square size={80} source={{ uri: configs.baseURL + 'images/' + item.equipment_image }} style={{ paddingLeft: 10, marginLeft: 15 }} />
                                    <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 16, marginTop: 3, marginLeft: 20 }}>
                                            {item.equipment_title}
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

export default connect(mapStateToProps, undefined)(Equipments);