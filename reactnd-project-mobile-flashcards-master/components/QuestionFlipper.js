import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

function QuestionFlipper(props) {
	const value = props.value
	
	return (
		<View>
			<Text style={styles.dataText}>
				{props.question ? `Question: ${value}` : `Answer: ${value}` }
			</Text>
		</View>
	)

}

const styles = StyleSheet.create({
	dataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	}
})

export default QuestionFlipper