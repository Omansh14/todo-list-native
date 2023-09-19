import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Todoscreen from './Todoscreen'

const Index = () => {
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, marginVertical: 6 }}>
        <Todoscreen />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})