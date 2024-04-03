import React, { useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import { TextInput } from 'react-native'
import axios from 'axios'

export default function SearchScreen({ navigation }) {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const fetchSearchResults = () => {
        axios.get('https://local-marks.com/api/v1/search?search=' + search, {
            headers: {
                'custom-token': '295828be2ad95b95abcfe20ed09d4df8'
            }
        }).then(res => {
            console.log("--------------------------------------");
            console.log(res.data.data);
            setSearchResults(res.data.data)
        })
    }

  return (
    <ScrollView>
        <Header navigation={navigation} />

        <View style={{ padding: 10 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TextInput style={{ width: "100%", height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10 }} placeholder="Search" value={search} onChangeText={setSearch} onKeyPress={fetchSearchResults} />
            </View>

            <View style={{ padding: 10 }}>
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('VendorDetailId', { id: item.id })} style={{ backgroundColor: "#fff", marginBottom: 10, borderRadius: 10 }}>
                                <View style={{ padding: 10, flexDirection: "row" }}>
                                    <View style={{ marginRight: 10 }}>
                                        <Image source={{ uri: item.profile_image }} style={{ height: 50, width: 50 }} resizeMode="cover" />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                            {item.f_name}
                                        </Text>
                                        <Text>{item.address}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </View>
    </ScrollView>
  )
}
