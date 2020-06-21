import {RECEIVE_DECKS, ADD_CARD, ADD_DECK, REMOVE_DECK} from '../actions'

function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS :
			return {
				...state,
				...action.payload
			}
		case ADD_CARD :
			const {key, value} = action.payload
			let deckQuestions = [
				...state[key].questions
			]
			deckQuestions.push(value)
			return {
				...state,
				[key]: {
					...state[key],
					questions: [...deckQuestions]
				}
			}
		case ADD_DECK :
			const deckKey = action.payload.key
			const deckValue = action.payload.value
 			return {
				...state,
				[deckKey]: deckValue
			}
		case REMOVE_DECK :
			const remKey = action.payload
			let copiedDecks = {...state}
			delete copiedDecks[remKey]
			return {
				...copiedDecks
			}
		default :
			return state
	}
}

export default decks