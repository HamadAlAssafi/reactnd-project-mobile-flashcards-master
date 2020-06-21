import {AsyncStorage} from 'react-native'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY ='MobileFlashCards:notifications'

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createLocalNotification () {
	return {
		title: 'Memorize your cards',
		body: '📈 do not forget to memorize your cards today!',
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if(data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({status}) => {
						if(status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(20)
							tomorrow.setMinutes(30)

							Notifications.scheduleLocalNotificationAsync(
								createLocalNotification(),
								{
									time: tomorrow
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}