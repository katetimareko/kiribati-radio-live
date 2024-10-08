/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import NotFoundScreen from '../screens/NotFoundScreen'
import StationScreen from '../screens/StationScreen'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { requestUserPermission } from '../src/services/NotificationService'
import Home from '../screens/Home'
import GradientBackground from '../components/GradientBackground'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  React.useEffect(() => {
    requestUserPermission()
  }, [])
  return (
    <GradientBackground>
      <Stack.Navigator screenOptions={{
        
      }}>
        <Stack.Screen name="Root" component={Home} options={{
          headerShown: false,
          headerTitle: 'Kiribati Radio Live',
          headerTransparent: true,
          headerTitleStyle: {
            color: 'white'
          }
        }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </GradientBackground>
  )
}
