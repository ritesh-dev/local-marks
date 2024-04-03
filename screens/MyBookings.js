import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import Header from '../components/Header'
import { AuthContext } from '../src/AuthProvider'
import { useIsFocused } from '@react-navigation/native'
import axios from "axios"
import moment from "moment"

export default function MyBookings({navigation}) {

    const {user} = useContext(AuthContext)

const [orders, setorders] = useState(null)

const [loading, setloading] = useState(true)

const isFocused = useIsFocused()

const fetchOrderHistory = () => {
    axios.get("https://local-marks.com/api/v1/get-booking-history?api_token="+user.api_token).then((res) => {
        if(res.data.status == 'success'){
            setorders(res.data.data)
        }else{
            alert(res.data.message)
        }
        
        setloading(false)
    })
}

const renderOrders = ({item}) => {
    return (
        <View style={{margin: 10, backgroundColor: '#fff', flexDirection: 'row'}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: '800'}}>Booking ID: {item.booking_booking.id}</Text>
                <Text style={{fontWeight: '800'}}>Provider Name: {item.vendor_data.f_name} {item.vendor_data.l_name}</Text>
                <Text style={{fontWeight: '400'}}>Provider Email: {item.vendor_data.email}</Text>
                <Text style={{fontWeight: '400'}}>Provider Phone: {item.vendor_data.phone}</Text>
                <Text style={{fontWeight: '400'}}>Provider Address: {item.vendor_data.address}</Text>
                <Text style={{fontWeight: '800'}}>Service Name: {item.service_data.service_name}</Text>
                <Text style={{fontWeight: '400'}}>Service Description: {item.service_data.service_description}</Text>
                <Text style={{fontWeight: '400'}}>Service Cost: {item.service_data.service_sale_cost}</Text>
                <Text style={{fontWeight: '800'}}>Booking Date: {moment(item.booking_booking.booking_date).format("DD MM YYYY")}</Text>
                {item.slot_data && (<Text style={{fontWeight: '800'}}>Slot: {item.slot_data.slot_start_time}-{item.slot_data.slot_end_time}</Text>)}
                <Text style={{fontWeight: '800'}}>Payment Status: {item.booking_booking.payment_status}</Text>
                <Text style={{fontWeight: '800'}}>Booking Status: {item.booking_booking.booking_status}</Text>
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

        {loading && <Text style={{textAlign: 'center', marginTop: 20}}>Loading...</Text>}

        {!orders && !loading && <Text style={{textAlign: 'center', marginTop: 20}}>No Orders Found</Text>}

        <FlatList 
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrders}
        />
    </ScrollView>
  )
}
