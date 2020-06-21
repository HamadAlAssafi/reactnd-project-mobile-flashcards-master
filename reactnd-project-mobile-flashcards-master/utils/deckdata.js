import {AsyncStorage} from 'react-native'

export const DECK_STORAGE_KEY = 'MobileFlashCards:decks'

function setMockDecks () {
	const placeholderDeck = {}
	placeholderDeck['ArabicPharases'] = {
		title: 'ArabicPharases',
		questions: [
			{question: 'صباح الخير.', answer: 'Good morning.'},
			{question: 'مساء الخير.', answer: 'Good afternoon.'},
			{question: 'اسمي حمد', answer: 'My name is Hamad.'},
			{question: 'انا سعيد للقائك.', answer: 'I am pleased to meet you.'},
			{question: 'كيف حالك ؟', answer: 'How are you?'},
			{question: 'أين أنت؟', answer: 'Where are you?'},
			{question: 'أنا أسف', answer: 'I am sorry.'},
			{question: 'الى اللقاء', answer: 'See you soon!'},
			{question: 'وداعا', answer: 'Good-bye.'},
			{question: 'أفضل الشاي', answer: 'I would like Tea.'}
		]
	}
	AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(placeholderDeck))
	// return mock deck
	return placeholderDeck
}

export function checkForNull (results) {
	return results === null
		? setMockDecks()
		: JSON.parse(results)
}