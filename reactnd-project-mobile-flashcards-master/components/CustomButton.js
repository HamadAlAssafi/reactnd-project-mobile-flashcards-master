import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

function CustomButton ({onPress, buttonText, styleTxt, styleBtn}) {

	return (
		<TouchableOpacity onPress={onPress} style={styleBtn}>
			<View>
				<Text style={styleTxt}>
					{buttonText}
				</Text>
			</View>
		</TouchableOpacity>

	)

}

export default CustomButton