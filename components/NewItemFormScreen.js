import React, { Component } from 'react';
import { Button, Switch, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class NewItemFormScreen extends Component {
  /* Save to local component state as a "draft" before commiting new item to local/remote store. */
  state = { 
    itemName: '',
    isFavourite: false,
    _id: new Date().toISOString()
  }
  render() {
    return (
      <>
        <Text>Item Name</Text>
        <TextInput placeholder={'e.g. name'} autoCorrect={false} onChangeText={text => { this.setState({ itemName: text }) }} />
        <Text>Favourite</Text>
        <Switch value={this.state.isFavourite} onValueChange={isOn => {
          this.setState({ isFavourite: isOn })
        }} />
        <Button title={'Save'} onPress={() => {
          this.props.navigation.navigate('newItemFormStack.screen.confirm', { state: this.state })
        }} />
      </>
    )
  }
}

export default NewItemFormScreen;