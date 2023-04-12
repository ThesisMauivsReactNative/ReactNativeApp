import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import GPS from './components/GPS';

const App = () => {
 return (
   <View style={styles.container}>
     <GPS />
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
});

export default App;
