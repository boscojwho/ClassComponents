import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import { getAllItems, localDB, updateDoc } from '../database';

class HomeScreen extends Component {
  state = { 
    data: [] 
  }

  /// Use arrow function syntax to auto-bind function to `this`.
  reloadData = () => {
    getAllItems((items) => {
      this.setState({ data: items });
    })
  }

  componentDidMount() {
    console.log('componentDidMount home screen')

    this.changeEmitter = localDB.changes({
      since: 'now',
      live: true
    }).on('change', this.reloadData);

    this.reloadData();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount home screen')
    /// Avoid event emiiter memory leak.
    this.changeEmitter.cancel()
  }

  /// Destructure the `item` object from props. Other props include `index`, `separators`, etc.
  renderItem({ item }) {
    return (
      <View style={styles.row}>
        <Text>{item.itemName} [{item._id}]</Text>
        <Switch value={item.isFavourite} onValueChange={(isOn) => {
          item.isFavourite = !item.isFavourite
          updateDoc(item, (response) => {
            console.log(`pressed ${response}`)
          })
        }} />
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item._id} />
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4
  }
});

export default HomeScreen;