import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CustomButton from './CustomButton'
import QuestionFlipper from './QuestionFlipper'
import QuizStatus from './QuizStatus'
import QuizScore from './QuizScore'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'
import {white, purple, sky} from '../utils/colors'


class Quiz extends React.Component {
	static navigationOptions = ({navigation}) => {
		const {storeDeck} = navigation.state.params
		return {
			title: `${storeDeck.title} Quiz`
		}
	}
	
	// My own state
	state = {
		showQuestion: true,
		quizStart: 0,
		right: 0
	}

	componentDidMount () {
		// Set notification
		clearLocalNotification()
			.then(setLocalNotification)
	}
	// Make a list of question components
	makeQuestion = (questionObject) => {
		return (
			<View>
				{this.state.showQuestion === true
					? <QuestionFlipper value={questionObject.question} question={true} />
					: <QuestionFlipper value={questionObject.answer}  question={false}/>
				}
			</View>
		)
	}
	// Make the questions array
	makeQuestionsArray = (questionArray) => {
		return questionArray.map((questionObject) => this.makeQuestion(questionObject))
	}

	// Create the generator function
	nextQuestionMaker = (quizLength) => {
		// generator function
		function* nextQuestion(quizLength) {
			while(this.state.quizStart < quizLength) {
				this.setState((prevState) => ({quizStart: prevState.quizStart + 1}))
				yield this.state.quizStart
			}
		}
		// Bind the generator to the quiz context
		this.nextQuestion = nextQuestion.bind(this)
		// return the generator
		return this.nextQuestion(quizLength)
	}

	// Create the genrator consumer
	useQuestionMaker = (quizLength) => {
		// Call next to run the generator a step
		this.nextQuestionMaker(quizLength).next()
	}

	statusCalculator = () => {
		const questions = this.props.navigation.state.params.storeDeck.questions
		let questionsLeft
		if (questions.length > 0) {
			questionsLeft = questions.length - this.state.quizStart
		}
		return questionsLeft >= 0 ? questionsLeft : null
	}
	// Go back
	previousStack = () => {
		this.props.navigation.goBack()
	}
	// Reset 
	resetQuizState = () => {
		this.setState(() => ({
			showQuestion: true,
			quizStart: 0,
			right: 0
		}))
	}

	render() {
		const questions = this.props.navigation.state.params.storeDeck.questions
		const questionsComponentArray = this.makeQuestionsArray(questions)
		
		return(
			<View style={styles.container}>
				<View style={styles.quizInfo}>
					<QuizStatus status={this.statusCalculator()} />
					{questionsComponentArray[this.state.quizStart]}
				</View>
				<CustomButton 
					buttonText={'FlipCard'} 
					onPress={() => {
						this.setState((prevState) => ({showQuestion: !prevState.showQuestion}))
					}} 
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
				<CustomButton 
					onPress={() => {
						this.useQuestionMaker(questionsComponentArray.length)
						this.setState((prevState) => ({right: prevState.right + 1}))
						// Reset the flip button
						this.setState({showQuestion: true})
					}} 
					buttonText={'Correct'} 
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
				<CustomButton 
					onPress={() => {
						this.useQuestionMaker(questionsComponentArray.length)
						// Reset the flip button
						this.setState({showQuestion: true})
					}} 
					buttonText={'Incorrect'}
					styleTxt={styles.submitBtnText}
					styleBtn={styles.iosSubmitBtn}
				/>
				{
					(questions.length > 0 && this.state.quizStart === questions.length) 
					&& <QuizScore 
						right={this.state.right} 
						total={questions.length}
						back={this.previousStack}
						reset={this.resetQuizState}
						/>
				}
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
		marginTop: 10,
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	quizInfo: {
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
})

export default Quiz