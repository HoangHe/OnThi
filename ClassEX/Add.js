import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Add() {

    const [imageUrl, setImageUrl] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState("")
    const navigation = useNavigation();


    const url = 'http://192.168.1.15:3000/DEVICE'

    const Add = (imageUrl, name, number, price, date) => {
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "imageUrl": imageUrl,
                "name": name,
                "number": number,
                "price": price,
                "date": date
            })
        })
            .then((res) => {
                if (res.status == 201) {
                    ToastAndroid.show('Thêm Thành Công.', ToastAndroid.SHORT);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            

            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Tên thiết bị"
                placeholderTextColor={"#BBBBBB"}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <TextInput
                style={{
                    borderWidth: 1,
                    marginTop: 10,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Nhập Link Ảnh"
                placeholderTextColor={"#BBBBBB"}
                value={imageUrl}
                onChangeText={(text) => setImageUrl(text)}
            />
            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Số lượng"
                placeholderTextColor={"#BBBBBB"}
                value={number}
                onChangeText={(text) => setNumber(text)}
            />
            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    marginTop: 10,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Ngày mua"
                placeholderTextColor={"#BBBBBB"}
                value={date}
                onChangeText={(text) => setDate(text)}
            />
            <TextInput
                style={{
                    borderWidth: 1,
                    borderRadius: 1,
                    width: 300,
                    height: 50,
                    marginLeft: 30,
                    marginRight: 30,
                    marginTop: 10,
                    color: "black",
                    paddingLeft: 20
                }}
                placeholder="Giá mua"
                placeholderTextColor={"#BBBBBB"}
                value={price}
                onChangeText={(text) => setPrice(text)}
            />
            

            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 30,
                    alignItems: "center",
                    margin: 40,
                    justifyContent: 'center'
                }}
                    onPress={() => {
                        if (!imageUrl || !name || !number || !price  || !date) {
                            Alert.alert("Lỗi", "Vui Lòng Nhập đầy đủ thông tin.")
                        } else {
                            Add(imageUrl, name, number, price, date)
                        }
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 20,
                    }}>
                        SAVE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 30,
                    alignItems: "center",
                    margin: 40
                }}
                    onPress={() => {
                        navigation.navigate("List")
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 20,
                    }}>
                        SHOW
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}
