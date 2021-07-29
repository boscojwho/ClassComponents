import React, { Component } from 'react';
import { Button, Switch, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PouchDB, { localDB } from '../database';

class NewItemConfirmScreen extends Component {
  state = { 
    itemName: this.props.route.params.state.itemName,
    isFavourite: this.props.route.params.state.isFavourite,
    _id: this.props.route.params.state._id
  }
  render() {
    return (
      <>
        <Text>Confirm Changes</Text>
        <Text>Item Name: {this.state.itemName}</Text>
        <Text>Favourite: {this.state.isFavourite ? "Yes" : "No"}</Text>
        <Text>Item ID: {this.state._id}</Text>
        <Button title={'Confirm New Item'} onPress={() => {
          saveNewItem(this.state)
          dismissScreen(this.props.navigation)
        }} />
      </>
    )
  }
}

function saveNewItem(item) {
  localDB.put(item, (err, doc) => {
    if (!err) {
      console.log('Save new item succeeded!')
      localDB.info().then(function (info) {
        console.log(info);
      })
    }
  });
}

function dismissScreen(navigation) {
  navigation.navigate('mainStack.screen.main')
}

export default NewItemConfirmScreen;