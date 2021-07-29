import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import HomeScreen from './components/HomeScreen';
import NewItemFormScreen from './components/NewItemFormScreen';
import NewItemConfirmScreen from './components/NewItemConfirmScreen';

/// Root entry point.
const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreens />
    </NavigationContainer>
  )
}

/// Allows us to modally present screens.
const RootStack = createStackNavigator();
const RootStackScreens = () => {
  return (
    <RootStack.Navigator mode='modal' initialRouteName='rootStack.screen.mainStackScreens'>
        <RootStack.Screen name='rootStack.screen.mainStackScreens' component={MainStackScreens} options={{ headerShown: false }}/>
        <RootStack.Screen name='rootStack.screen.newItemFormStackScreens' component={NewItemFormStackScreens} options={{ headerShown: false }}/>
    </RootStack.Navigator>
  )
}

const MainStack = createStackNavigator();
const MainStackScreens = () => {
  return (
    <MainStack.Navigator initialRouteName='mainStack.screen.main'>
      <MainStack.Screen name='mainStack.screen.main' component={HomeScreen} 
        options={({ navigation }) => ({
          headerRight: () => (
            <Button 
              title='New' 
              onPress={() => { 
                navigation.navigate('rootStack.screen.newItemFormStackScreens') 
              }}/>
          )
        })} />
    </MainStack.Navigator>
  )
}

/// Modal navigation stack that manages form(s) screens for creating new item(s).
const NewItemFormStack = createStackNavigator();
const NewItemFormStackScreens = () => {
  return (
    <NewItemFormStack.Navigator>
      <NewItemFormStack.Screen 
        name='newItemFormStack.screen.main'
        component={NewItemFormScreen} />
      <NewItemFormStack.Screen
        name="newItemFormStack.screen.confirm" 
        component={NewItemConfirmScreen} />
    </NewItemFormStack.Navigator>
  )
}

export default App;