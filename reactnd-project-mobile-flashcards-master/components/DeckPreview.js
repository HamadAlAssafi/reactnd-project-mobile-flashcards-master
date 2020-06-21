import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import {white, purple} from '../utils/colors'

class DeckPreview extends React.Component {	
	state = {
		bounceValue: new Animated.Value(1)
	}

	startAnimation(onPress) {
		const {bounceValue} = this.state
		Animated.sequence([
			Animated.timing(bounceValue, {duration: 100, toValue: 1.1}),
			Animated.spring(bounceValue, {toValue: 1, friction: 4})
		]).start(() => onPress())
	}

	render() {
		const {title, questions, onPress} = this.props
		const questLength = questions.length
		const {bounceValue}= this.state
		
		return(
			<TouchableOpacity onPress={() => {
				this.startAnimation(onPress)	
			}}>
			    <View style={styles.preview}>
			      <Animated.Text style={[styles.titleHead, {transform: [{scale: bounceValue}]}]}>{title}</Animated.Text>
			      <Text style={styles.dataText}>
			      	There {(questLength > 1  || questLength === 0 )? `are ${questLength} questions` : `is ${questLength} question` }
			      </Text>
			    </View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	preview: {
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

export default DeckPreview