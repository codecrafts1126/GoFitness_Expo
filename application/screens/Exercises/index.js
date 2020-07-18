import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, AsyncStorage, Animated } from 'react-native';
import { Container, Header, Body, Left, Right, Title, List, ListItem, Thumbnail } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import DropdownAlert from 'react-native-dropdownalert';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid, Row } from 'react-native-easy-grid';

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

class Exercises extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isSide: false,
        }
    }

    componentDidMount() {
        // this.setState({ isLoading: true })
    }

    onClose() {
        this.setState({ isSide: false });
    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
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
                        <Title style={{ fontSize: 20, color: colors.white }}>{i18n.translate(strings.ST002)}</Title>
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
                    <Grid>
                        <Row onPress={this.navigateToScreen('EBodypartsScreen')} activeOpacity={1}>
                            <ImageBackground source={require('@assets/images/bodyparts.jpg')} style={Styles.card_general}>
                                <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={Styles.gradient_general}>
                                    <Text style={Styles.title_general}>{i18n.translate(strings.ST065)}</Text>
                                    <Text style={Styles.subtitle_general}>{i18n.translate(strings.ST066)}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </Row>
                        <Row onPress={this.navigateToScreen('EquipmentsScreen')} activeOpacity={1}>
                            <ImageBackground source={require('@assets/images/equipments.jpg')} style={Styles.card_general}>
                                <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']} style={Styles.gradient_general}>
                                    <Text style={Styles.title_general}>{i18n.translate(strings.ST067)}</Text>
                                    <Text style={Styles.subtitle_general}>{i18n.translate(strings.ST068)}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </Row>

                    </Grid>
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

export default connect(mapStateToProps, undefined)(Exercises);