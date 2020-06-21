import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CustomButton from './CustomButton'
import {white, purple} from '../utils/colors'

function QuizScore(props) {
	const singular = ' question'
	const plural = ' questions'
	return (
		<View style={styles.quizScore}>
			<Text style={styles.dataText}>
				{`You have answered ${props.right} correct ${props.right === 1 ? singular : plural} out of ${props.total}`}
			</Text>
			<View style={styles.btnContainer}>
				<CustomButton 
					buttonText={'Reset'} 
					onPress={props.reset}
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
				<CustomButton 
					buttonText={'Go Back'} 
					onPress={props.back}
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	quizScore: {
		backgroundColor: white,
		borderRadius: 16,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		marginBottom: 17,
		justifyContent: 'center',
		alignItems: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 5,
		marginRight: 5,
		flex: 1
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	dataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	btnContainer: {
		flexDirection: 'row'
	}
})

export default QuizScore