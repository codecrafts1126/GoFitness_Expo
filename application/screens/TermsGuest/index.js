import React from 'react';
import { I18nManager, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Left, Text, Title, Right, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import HTML from 'react-native-render-html';

import styles from "./styles";
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import { AppPreLoader } from "@components";
import i18n from "@utils/i18n";
import API from '@utils/API';
import ConfigApp from '@utils/ConfigApp';

class TermsGuest extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch(ConfigApp.URL + 'json/data_strings.php')
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


    render() {
        const isRTL = i18n.isRTL();
        if (this.state.isLoading) {
            return (
                <AppPreLoader />
            );
        }

        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left style={{ flex: 1 }}>
                        {!isRTL ? <TouchableOpacity style={[styles.back, { marginLeft: 10 }]} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: 1 }], fontSize: 22 }} />
                        </TouchableOpacity> : <View />}
                    </Left>
                    <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={{ color: colors.black }}>{i18n.translate(strings.ST326)}</Title>
                    </Body>
                    <Right style={{ flex: 1 }} >
                        {isRTL ? <TouchableOpacity style={[styles.back, { marginRight: -25 }]} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: -1 }], fontSize: 22 }} />
                        </TouchableOpacity> : <View />}
                    </Right>
                </Header>
                <Body>
                    <ScrollView>
                        <View style={{ padding: 20 }}>
                            <FlatList
                                data={this.state.dataSource}
                                refreshing="false"
                                renderItem={({ item }) =>
                                    <HTML html={item.st_termsofservice} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <FlatList
                                data={this.state.dataSource}
                                refreshing="false"
                                renderItem={({ item }) =>
                                    <HTML html={item.st_privacypolicy} />
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </ScrollView>
                </Body>
            </Container>
        );
    }
}

export default TermsGuest;