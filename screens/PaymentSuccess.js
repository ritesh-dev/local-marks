import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import {MaterialCommunityIcons} from "@expo/vector-icons"

export default function PaymentSuccess({navigation}) {
  return (
    <ScrollView>
        <Header navigation={navigation} />

        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 20}}>
            <MaterialCommunityIcons size={32} color="green" name='check-circle' />
            <Text style={{textAlign: 'center'}}>PaymentSuccess</Text>
        </View>

        <View style={{padding: 20}}>
            <TouchableOpacity style={{backgroundColor: '#000'}} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={{color: '#fff', textAlign: 'center', fontWeight: '800', padding: 10}}>Go Home</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}
