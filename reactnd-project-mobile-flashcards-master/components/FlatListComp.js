import React from 'react'
import DeckPreview from './DeckPreview'

function FlatListComp({item, onPress}) {
	let {key, value} = item
	return (
		<DeckPreview 
			key={key} 
			title={value.title} 
			questions={value.questions} 
			onPress={onPress}
		/>
	)
}

export default FlatListComp