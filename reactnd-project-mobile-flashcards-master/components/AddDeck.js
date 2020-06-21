import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import CustomButton from './CustomButton'
import {addDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addDeckAction} from '../actions'
import {white, purple, sky, input} from '../utils/colors'

class AddDeck extends Component {
	state = {
		deckTitle: ''
	}

	handleTitleChange = (text) => {
		this.setState({deckTitle: text})
	}

	handleSubmit = () => {
		const key = this.state.deckTitle
		const value = {title: key, questions: []}
		// Save the value to the local storage
		addDeck({value, key})
		// Update the redux store
		this.props.dispatch(addDeckAction({key, value}))
		// navigate to indivudual deck with params of this deck
		this.props.navigation.push('IndividualDeck', {entryId: key, value})
		// Reset state
		this.setState({deckTitle: ''})
	}

	render () {
		return(
			<View style={styles.container}>
				<View style={styles.form}>
					<Text style={styles.titleHead}>Add name of the deck</Text>
					<TextInput 
						value={this.state.deckTitle}  
						onChangeText={this.handleTitleChange}
						style={styles.input}
					/>
				</View>
				<CustomButton 
					buttonText={'Submit Button'} 
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
	}
})

export default connect()(AddDeck)