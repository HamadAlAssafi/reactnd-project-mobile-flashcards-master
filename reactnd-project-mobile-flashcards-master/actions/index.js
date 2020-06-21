export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

// Action creators
export function receiveDecksAction(payload) {
	return {
		type: RECEIVE_DECKS,
		payload
	}
}

export function addCardAction(payload) {
	return {
		type: ADD_CARD,
		payload
	}
}

export function addDeckAction(payload) {
	return {
		type: ADD_DECK,
		payload
	}
}

export function removDeckAction(payload) {
	return {
		type: REMOVE_DECK,
		payload
	}
}