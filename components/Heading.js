import React from 'react'
import { Text, View } from 'react-native'

export default function Heading({title}) {
  return (
    <View style={{padding: 10, backgroundColor: '#fff', marginVertical: 10}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>{title}</Text>
    </View>
  )
}
