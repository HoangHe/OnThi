import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Add from './ClassEX/Add';
import List from './ClassEX/List';
import { SafeAreaView, StyleSheet } from 'react-native';






const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Add'>
      <Stack.Screen options={{ title: "Thêm Môn Học", headerStyle: { backgroundColor: '#3d3f4c' }, headerTintColor: '#fff' }} name="Add" component={Add} />
      <Stack.Screen options={{ title: "Danh Sách Môn Học", headerStyle: { backgroundColor: '#3d3f4c' }, headerTintColor: '#fff' }} name="List" component={List} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MyStack></MyStack>
      </NavigationContainer>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:
  {
    flex: 1,
  }
});

