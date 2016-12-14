/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

let login = require( './APP/login' )

class sectong extends Component {
  render(){
    return(
      <Navigator
          initialRoute={{
            name:"登陆页",
            component:login
          }}
          configureScene={(route)=>{
            return Navigator.SceneConfigs.FloatFromBottom
          }}
          renderScene={(route,navigator) => {
              let Component = route.component;
              return(
                  <Component {...route.params} navigator={navigator} />
              )
          }}/>
      )
  }
}


AppRegistry.registerComponent('sectong', () => sectong);
