import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import CustomButton from './CustomButton'
import {addCardToDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addCardAction} from '../actions'
import {white, purple, sky, input} from '../utils/colors'

class AddCard extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {entryId} = navigation.state.params

		return {
			title: `Add card to ${entryId}`
		}
	}
	state = {
		question: '',
		answer: ''
	}
	handleQuestionChange = (text) => {
		this.setState({question: text})
	}
	handleAnswerChange = (text) => {
		this.setState({answer: text})
	}
	handleSubmit = () => {
		const key = this.props.navigation.state.params.entryId
		const value = this.state
		// Make method to update the store 
		this.props.dispatch(addCardAction({key, value}))
		// make method to update the async storage
		addCardToDeck({key, value})
		// Reset state
		this.setState({question: '', answer: ''})
		// Navigate back to individual deck view
		this.props.navigation.goBack()
	}
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={styles.titleHead}>Question Input</Text>
					<TextInput 
						value={this.state.question}  
						onChangeText={this.handleQuestionChange}
						style={styles.input}
					/>
					
					<Text style={styles.titleHead}>Answer Input</Text>
					<TextInput 
						value={this.state.answer} 
						onChangeText={this.handleAnswerChange}
						style={styles.input}
					/>
				</View>
				<CustomButton 
					buttonText={'Submit Card'} 
					onPress={this.handleSubmit}
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn} 
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: sky
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 10,
		marginRight: 10
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	form: {
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
	titleHead: {
		color: purple,
		fontSize: 25
	},
	input: {
		width: 250,
		height: 40,
		padding: 8,
		borderWidth: 1,
		borderColor: input,
		marginTop: 20,
		borderRadius: 8
	},
	
})

export default connect()(AddCard)