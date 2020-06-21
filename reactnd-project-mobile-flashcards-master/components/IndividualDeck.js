import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CustomButton from './CustomButton'
import {removeDeck} from '../utils/api'
import {connect} from 'react-redux'
import {removDeckAction} from '../actions'
import {white, purple, sky} from '../utils/colors'

class IndividualDeck extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {entryId} = navigation.state.params

		return {
			title: entryId
		}
	}
	
	render () {
		//const {entryId, value} = this.props.navigation.state.params
		const {storeDeck, entryId} = this.props
		return(
			<View style={styles.container}>
				<View style={styles.deckInfo}>
					<Text style={styles.titleHead}>
						{entryId}
					</Text>
					<Text style={styles.dataText}>
						Number of cards: {storeDeck && storeDeck.questions.length}
					</Text>
				</View>
				<CustomButton 
					buttonText={'Add a card'} 
					onPress={() => {
						// method to add a card to the deck
						this.props.navigation.push('AddCard', {entryId: entryId})
					}} 
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
				<CustomButton 
					buttonText={'Start Quiz'} onPress={() => {
						this.props.navigation.navigate(
							'Quiz',
							{storeDeck}
						)
					}} 
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
				<CustomButton 
					buttonText={'Delete this Deck'} onPress={() => {
						// method to delete a card to the deck from storage
						removeDeck(entryId)
						// method to delete a card to the deck from redux store
						this.props.dispatch(removDeckAction(entryId))
						// Redirect to the DeckList
						this.props.navigation.goBack()
					}} 
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
		marginRight: 10,
		marginTop: 10
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	deckInfo: {
		backgroundColor: white,
		borderRadius: 16,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
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
	dataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	titleHead: {
		color: purple,
		fontSize: 25
	}
})

function mapStateToProps(state, ownProps) {
	const {entryId} = ownProps.navigation.state.params
	const storeDeck = state[entryId]
	return {
		storeDeck,
		entryId
	}
}

export default connect(mapStateToProps)(IndividualDeck)