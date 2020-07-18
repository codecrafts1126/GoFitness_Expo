import React from 'react';
import { View, TextInput, Text, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import styles from "./styles";
import colors from "@constants/colors";

class AthenaDatepicker extends React.Component {

    constructor() {
        super();
        this.state = {
            value: '',
            color: colors.middle_gray,
            underline: colors.middle_gray,
            fontSize: new Animated.Value(16),
            animationY: new Animated.Value(-40)
        }
    }

    _start = () => {
        this.setState({ color: colors.textfield_highlight, underline: colors.textfield_highlight })
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
            this.setState({ color: colors.middle_gray, underline: colors.middle_gray })
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
                {/* <Animated.Text
                    style={[!isRTL ? { textAlign: 'left' } : { textAlign: 'right' },
                    {
                        width: "100%",
                        bottom: this.state.animationY,
                        fontSize: this.state.fontSize,
                        color: this.state.color,
                    }]}>
                    {label}
                </Animated.Text> */}
                <View style={[!isRTL ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'}, styles.textField]}>
                    {!isRTL && leftIconName != null ? <Icon name={leftIconName} type={leftIconType} color={leftIconColor} size={hp('3.0%')} /> : <View />}
                    <DatePicker
                        isRTL={isRTL}
                        style={{width: 500}}
                        customStyles={{dateText: !isRTL ? { textAlign: 'left' } : { textAlign: 'right' },
                                        placeholderText: !isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}}
                        date={this.state.value}
                        mode="date" placeholder={moment().format("YYYY-MM-DD")}
                        confirmBtnText="Confirm" cancelBtnText="Cancel"
                        minDate="1820-01-01" maxDate={moment().format("YYYY-MM-DD")}
                        onDateChange={(date) => this.onChangeText({ value: date }) }
                        onFocus={() => this._start()}
                        onBlur={() => this._end()} 
                    />
                    {isRTL && leftIconName != null ? <Icon name={leftIconName} type={leftIconType} color={leftIconColor} size={hp('3.0%')} /> : <View />}
                </View>
            </View>
        )
    }
}

export default AthenaDatepicker;