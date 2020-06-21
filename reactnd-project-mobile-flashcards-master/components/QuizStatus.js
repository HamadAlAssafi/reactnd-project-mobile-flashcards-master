import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {white, purple} from '../utils/colors'

function QuizStatus(props) {
	return (
		<View>
			<Text style={styles.dataText}>
				{props.status === null ? 'No questions left' : `${props.status} questions left`}
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

export default QuizStatus