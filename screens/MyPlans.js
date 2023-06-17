import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import Header from '../components/Header'
import { AuthContext } from '../src/AuthProvider'
import { useIsFocused } from '@react-navigation/native'
import axios from "axios"

export default function MyPlans({navigation}) {

    const {user} = useContext(AuthContext)

const [orders, setorders] = useState(null)

const isFocused = useIsFocused()

const fetchOrderHistory = () => {
    axios.post("https://local-marks.com/api/v1/get-purchased-plans?api_token="+user.api_token).then((res) => {
        if(res.data.status == 'success'){
            setorders(res.data.data)
        }else{
            alert(res.data.message)
        }
    })
}

const renderOrders = ({item}) => {
    return (
        <View style={{margin: 10, backgroundColor: '#fff', flexDirection: 'row'}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: '800'}}>Plan Name: {item.plan_name}</Text>
                <Text>Plan Price: {item.plan_price}</Text>
                <Text>Place Description: {item.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                <Text>Expire Date: {item.expire_date}</Text>
                <Text>Status: {item.status}</Text>
            </View>
        </View>
    )
}

useEffect(() => {
  fetchOrderHistory()
}, [isFocused])

  return (
    <ScrollView>
        <Header navigation={navigation} />

        <FlatList 
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrders}
        />
    </ScrollView>
  )
}
