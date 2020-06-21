import {AsyncStorage} from 'react-native'
import {DECK_STORAGE_KEY, checkForNull} from './deckdata'


export function addDeck ({value, key}) {
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[key]: value
	}))
}

export function removeDeck (key) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[key] = undefined
			delete data[key]
			AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
		})
}

export function addCardToDeck ({key, value}) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			let questionsArray = data[key].questions
			questionsArray.push(value)
			AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
		})
}

export function getDecks () {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(checkForNull)
}

export function getDeck (key) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			const decks = JSON.parse(results)
			const deck = decks[key]
		})
}