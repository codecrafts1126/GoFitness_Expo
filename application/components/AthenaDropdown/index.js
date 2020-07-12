import React from 'react';
import { View, TextInput, Text, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Dropdown } from 'react-native-material-dropdown';

import styles from "./styles";
import colors from "@constants/colors";

class AthenaDropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            value: '',
            color: colors.light_gray,
            underline: colors.light_gray,
            fontSize: new Animated.Value(16),
            animationY: new Animated.Value(-40)
        }
    }

    _start = () => {
        this.setState({ color: colors.blue, underline: colors.blue })
        Animated.timing(this.state.animationY, {
            toValue: -15,
            duration: 300
        }).start();
        Animated.timing(this.state.fontSize, {
            toValue: 14,
            duration: 300
        }).start();
    }

    _end = () => {
        if (this.state.value == "") {
            this.setState({ color: colors.light_gray, underline: colors.light_gray })
            Animated.timing(this.state.animationY, {
                toValue: -40,
                duration: 300
            }).start();
            Animated.timing(this.state.fontSize, {
                toValue: 16,
                duration: 300
            }).start();
        }
    }
    onChangeText(value) {
        this.setState({ value: value })
        this.props.onChangeText(value)
    }

    render() {
        const { isRTL, label, data, value, onChangeText,
            width, height, marginTop,
            leftIconName, leftIconType, leftIconColor,
            rightIconName, rightIconType, rightIconColor,
        } = this.props;
        return (
            <View style={[styles.container,
            marginTop != null ? { marginTop: marginTop } : { marginTop: 10 },
            width != null ? { width: width } : { width: wp('90.0%') }]}>
                <Animated.Text
                    style={[!isRTL ? { textAlign: 'left' } : { textAlign: 'right' },
                    {
                        width: "100%",
                        bottom: this.state.animationY,
                        fontSize: this.state.fontSize,
                        color: this.state.color,
                    }]}>
                    {label}
                </Animated.Text>
                <View style={[!isRTL ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}, styles.textField]}>
                    {!isRTL && leftIconName != null ? <Icon name={leftIconName} type={leftIconType} color={leftIconColor} size={hp('3.0%')} /> : <View />}
                    <Dropdown
                        isRTL={isRTL}
                        data={data}
                        value={this.state.value}
                        containerStyle={[styles.textInput, !isRTL ? { textAlign: 'left' } : { textAlign: 'right' }, { marginBottom: 0, width: '100%', borderBottomColor: this.state.underline }]}
                        onChangeText={(value) => this.onChangeText(value)}
                        onFocus={() => this._start()}
                        onBlur={() => this._end()} />
                    {isRTL && leftIconName != null ? <Icon name={leftIconName} type={leftIconType} color={leftIconColor} size={hp('3.0%')} /> : <View />}
                    <View style={{ left: -10, marginTop: 30 }} >
                        <Icon name='chevron-down' type="material-community" size={hp('2.0%')} />
                    </View>
                </View>
            </View>
        )
    }
}

export default AthenaDropdown;