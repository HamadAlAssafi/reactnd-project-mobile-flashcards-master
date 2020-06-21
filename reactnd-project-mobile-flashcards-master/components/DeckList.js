import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {getDecks} from '../utils/api'
import {connect} from 'react-redux'
import {receiveDecksAction} from '../actions'
import {sky} from '../utils/colors'
import FlatListComp from './FlatListComp'


class DeckList extends Component {
	componentDidMount() {
		const {dispatch} = this.props
		getDecks()
			.then((decks) =>dispatch(receiveDecksAction(decks)))

	}

	renderedItem = ({item}) => {
		let {key, value} = item
		return <FlatListComp item={item} onPress={() => {
					this.props.navigation.navigate(
						'IndividualDeck',
						{entryId: key, value}
					)}}/>
	}
	
	render () {
		
		const {storeDecks} = this.props
		const keys = Object.keys(storeDecks)
    	const allDecks = keys.map((key) => {
    		return {
    			key: key,
    			value: storeDecks[key]
    		}
    	} )
		return(
			<View style={styles.container}>
					<FlatList 
						data={allDecks} 
						renderItem={this.renderedItem} 
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
	}
})

function mapStateToProps(storeDecks) {
	return {
		storeDecks
	}
} 
export default connect(mapStateToProps) (DeckList)