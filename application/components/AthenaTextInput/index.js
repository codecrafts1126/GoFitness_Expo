import React from 'react';
import { View, TextInput, Text, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from "./styles";
import colors from "@constants/colors";

class AthenaTextInput extends React.Component {

    constructor() {
        super();
        this.state = {
            value: '',
            color: colors.light_gray,
            underline: colors.light_gray,
            fontSize: new Animated.Value(16),
            animationY: new Animated.Value(-25)
        }
    }

    _start = () => {
        this.setState({color: colors.blue, underline: colors.blue})
        Animated.timing(this.state.animationY, {
            toValue: 0,
            duration: 300
        }).start();
        Animated.timing(this.state.fontSize, {
            toValue: 14,
            duration: 300
        }).start();
    }

    _end = () => {
        if(this.state.value == "") {
            this.setState({color: colors.light_gray, underline: colors.light_gray})
            Animated.timing(this.state.animationY, {
                toValue: -25,
                duration: 300
            }).start();
            Animated.timing(this.state.fontSize, {
                toValue: 16,
                duration: 300
            }).start();
        }
    }
    onChangeText(value){
        this.setState({value: value})
        this.props.onChangeText(value)
    }

    render() {
        const { isRTL, placeholder, keyboardType, secureTextEntry, autoCapitalize, value, onChangeText,
            width, height, marginTop,
            leftIconName, leftIconType, leftIconColor,
            rightIconName, rightIconType, rightIconColor,
        } = this.props;
        return (
            <View style={[styles.container,
            marginTop != null ? { marginTop: marginTop } : { marginTop: 10 },
            width != null ? { width: width } : { width: wp('90.0%') }]}>
                <Animated.Text
                    style={[!isRTL ? {textAlign: 'left'}: {textAlign: 'right'},
                        { width: "100%",
                        bottom: this.state.animationY,
                        fontSize: this.state.fontSize,
                        color: this.state.color,
                    }]}>
                    {placeholder}
                </Animated.Text>
                <View style={styles.textField}>
                    {!isRTL && leftIconName != null ? <Icon name={leftIconName} type={leftIconType} color={leftIconColor} size={hp('3.0%')} /> : <View />}
                    <TextInput
                        value={this.state.value}
                        style={[styles.textInput, !isRTL ? { textAlign: 'left'} : { textAlign: 'right'}, {width: '100%', borderBottomColor: this.state.underline }]}
                        // placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize={autoCapitalize}
                        keyboardType={keyboardType}
                        onChangeText={(value) => this.onChangeText(value)}
                        onFocus={() => this._start()}
                        onBlur={() => this._end()} />
                    {isRTL && leftIconName != null ? <Icon name={leftIconName} type={leftIconType} color={leftIconColor} size={hp('3.0%')} /> : <View />}
                </View>
            </View>
        )
    }
}

export default AthenaTextInput;