import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import IndividualDeck from './components/IndividualDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {setLocalNotification} from './utils/helpers'



// Stacks
const DeckStack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Deck List'
    }
  },
  IndividualDeck: {
    screen:  IndividualDeck,
  },
  Quiz: Quiz,
  AddCard: AddCard
})

const AddStack = createStackNavigator({
  AddDeck: AddDeck
})

// Tabs
const ComboStackTabs = createBottomTabNavigator(
  {
    
    Decks: DeckStack,
    AddDeck: AddStack
  }
)

// Container

const MainAppNavigator = createAppContainer(ComboStackTabs)



export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MainAppNavigator />
        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
