import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from "./styles";

class AthenaButton extends React.Component {
    render() {
        const { isRTL, isDisabled, title, color, fontColor, width, height, marginTop, onPress,
            leftRadius, rightRadius,
            leftIconName, leftIconType, leftIconColor,
            rightIconName, rightIconType, rightIconColor,
        } = this.props;
        return (
            <View style={styles.container}>
                {!isDisabled ?
                    <TouchableOpacity
                        style={[styles.button,
                        color != null ? { backgroundColor: color } : { backgroundColor: '#4284d5' },
                        width != null ? { width: width } : { width: wp('90.0%') - hp('3.0%') },
                        height != null ? { height: height } : { height: 40 },
                        marginTop != null ? { marginTop: marginTop } : { marginTop: 10 },
                        leftRadius == null && rightRadius == null ? { borderRadius: 50 } :
                        leftRadius == true && rightRadius == null ? { borderTopLeftRadius: 50, borderBottomLeftRadius: 50 } :
                        rightRadius == true && leftRadius == null ? { borderTopRightRadius: 50, borderBottomRightRadius: 50 } :
                        { borderRadius: 50 }]}
                        onPress={onPress}>
                        <Text style={[fontColor != null ? { color: fontColor } : { color: "#FFFFFF" }, { fontSize: 18 }]}>{title}</Text>
                    </TouchableOpacity> : 
                    <View style={[styles.button,
                        { backgroundColor: '#888' },
                        width != null ? { width: width } : { width: wp('90.0%') - hp('3.0%') },
                        height != null ? { height: height } : { height: 40 },
                        marginTop != null ? { marginTop: marginTop } : { marginTop: 10 },
                        leftRadius == null && rightRadius == null ? { borderRadius: 50 } :
                        leftRadius == true && rightRadius == null ? { borderTopLeftRadius: 50, borderBottomLeftRadius: 50 } :
                        rightRadius == true && leftRadius == null ? { borderTopRightRadius: 50, borderBottomRightRadius: 50 } :
                        { borderRadius: 50 }]}>
                        <Text style={[fontColor != null ? { color: fontColor } : { color: "#FFFFFF" }, { fontSize: 18 }]}>{title}</Text>
                    </View>
                }
            </View>
        )
    }
}

export default AthenaButton;