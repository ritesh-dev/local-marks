import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import Header from '../components/Header'
import { AuthContext } from '../src/AuthProvider'
import { useIsFocused } from '@react-navigation/native'
import axios from "axios"

export default function MyOrders({navigation}) {

const {user} = useContext(AuthContext)

const [orders, setorders] = useState(null)

const [loading, setloading] = useState(true)

const isFocused = useIsFocused()

const fetchOrderHistory = () => {
    axios.post("https://local-marks.com/api/v1/get-user-order-history?api_token="+user.api_token).then((res) => {
        if(res.data.status == 'success'){
            setorders(res.data.data)
        }else{
            alert(res.data.message)
        }

        setloading(false)
    })
}

useEffect(() => {
  fetchOrderHistory()
}, [isFocused])

const renderOrders = ({item}) => {
    const ordt = new Date(item.order_details.order_date_time)
    return (
        <View style={{margin: 10, backgroundColor: '#fff', flexDirection: 'row'}}>
            <View style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: JSON.parse(item.item_details[0].order_details).product_details.product_image}} style={{height: 100, width: 100}} />
            </View>
            <View style={{padding: 10}}>
                <Text>Order Id: {item.order_details.order_id}</Text>
                <Text>Payment Status: {item.order_details.payment_status}</Text>
                <Text>Order Status: {item.order_details.status}</Text>
                <Text>Order Date: {ordt.toLocaleDateString("en-US")}</Text>
                <Text>Order Amount: {item.order_details.gross_amount}</Text>
            </View>
        </View>
    )
}



  return (
    <ScrollView>
        <Header navigation={navigation} />

        {loading && <Text style={{textAlign: 'center', marginTop: 20}}>Loading...</Text>}

        {!orders && !loading && <Text style={{textAlign: 'center', marginTop: 20}}>No Orders Found</Text>}

        <FlatList 
            data={orders}
            keyExtractor={(item) => item.order_details.id}
            renderItem={renderOrders}
        />
    </ScrollView>
  )
}
