import { View, Text, TouchableOpacity, Modal, ToastAndroid, TextInput, FlatList, Image, Alert } from 'react-native'
import React, { useState } from 'react'


export default function List() {

    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState("")



    React.useEffect(() => {
        get();
    }, [])

    const url = "http://192.168.1.15:3000/DEVICE/"

    const get = async () => {
        await fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const deleteDvice = (id) => {
        fetch(url + id, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    ToastAndroid.show('Đã Xóa!', ToastAndroid.SHORT);
                    get();
                }
            })
            .catch((ex) => {
                console.log(ex);
            })
    }

    const update = (id, imageUrl, name, number, price, date) => {
        fetch(url + id, {
            method: "PUT",
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
        }).then((res) => {
            if (res.status == 200) {
                ToastAndroid.show('Sửa Thành Công!', ToastAndroid.SHORT);
                get();
            }
        })
            .catch((ex) => {
                console.log(ex);
            })
    }


    const edit = (id, imageUrl, name, number, price, date) => {
        setVisible(true)
        setId(id)
        setImageUrl(imageUrl)
        setName(name)
        setNumber(number)
        setPrice(price)
        setDate(date)
    }


    function Item({ id, imageUrl, name, number, price, date}) {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#C0C0C0',
                padding: 0,
                marginVertical: 3,
                marginHorizontal: 5,
                flexDirection: 'row',
                borderRadius: 10
            }}>
                <Image style={{
                    height: 100,
                    width: 100
                }} source={{ uri: imageUrl }} />

                <View style={{
                    flex: 3,
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: '#C0C0C0',
                    padding: 0,
                    marginVertical: 3,
                    marginHorizontal: 5,
                    flexDirection: 'row',
                    borderRadius: 2
                }}>

                    <View style={{
                        margin: 5,
                        marginLeft: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Tên:  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {name}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Số lượng:  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {number}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Ngày mua:  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {date}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 3
                        }}>
                            <Text style={{
                                fontSize: 12,
                                color: '#666666',
                                marginRight: 10
                            }}>
                                Giá mua:  </Text>
                            <Text style={{
                                fontSize: 13,
                                color: 'black',

                            }}>
                                {price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flex: 0.5,
                }}>
                    <TouchableOpacity
                        style={{
                            marginBottom: 10
                        }}

                        onPress={() => {
                            Alert.alert('Cảnh Báo !', 'Bạn muốn xóa mục này.', [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        deleteDvice(id);
                                        get();
                                    }
                                },
                            ]);
                        }}
                    >
                        <Image source={require("../ImageEX/Delete.png")} style={{
                            width: 20,
                            height: 20,
                            marginRight: 20
                        }} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            edit(id, imageUrl, name, number, price, date)
                        }}
                    >
                        <Image source={require("../ImageEX/Note.png")} style={{
                            width: 20,
                            height: 20,
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }




    return (
        <View style={{
            backgroundColor: '#fff',
            flex: 1
        }}>
            <View style={{
                flex: 1,

                borderWidth: 1,
                marginLeft: 10,
                marginRight: 10,
            }}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <View style={{
                            margin: 30,
                            backgroundColor: "#CCCCCC",
                            borderRadius: 10,
                            padding: 20,
                        }}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: "center",
                                marginBottom: 30
                            }}>
                                {"Chỉnh Sửa"}
                            </Text>

                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5
                                }}
                                label="Tên Môn Học"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />

                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5
                                }}
                                label="Link Ảnh"
                                value={imageUrl}
                                onChangeText={(text) => setImageUrl(text)}
                            />

                            

                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5

                                }}
                                label="Số lượng"
                                value={number}
                                onChangeText={(text) => setNumber(text)}
                            />
                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginBottom: 5

                                }}
                                label="Ngày mua"
                                value={date}
                                onChangeText={(text) => setDate(text)}
                            />

                            <TextInput
                                style={{
                                    padding: 10,
                                    height: 50,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                }}
                                label="Giá mua"
                                value={price}
                                onChangeText={(text) => setPrice(text)}
                            />

                            

                            <View style={{ justifyContent: "space-around", alignItems: 'center', flexDirection: 'row', }}>
                                <TouchableOpacity style={{
                                    borderRadius: 10,
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    marginTop: 20,
                                    backgroundColor: 'blue',
                                    marginLeft: 10
                                }}
                                    onPress={() => {
                                        if (!imageUrl || !name || !number || !price  || !date) {
                                            Alert.alert("Lỗi", "Vui Lòng Nhập đầy đủ thông tin.")
                                       } else {
                                            update(id, imageUrl, name, number, price, date)
                                            get()
                                            setVisible(false)
                                        }
                                    }}
                                >
                                    <Text style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}>SAVE</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    borderRadius: 10,
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    marginTop: 20,
                                    marginLeft: 10,
                                    backgroundColor: 'blue'
                                }}

                                    onPress={() => {
                                        setVisible(false)
                                        get()
                                    }}
                                >
                                    <Text style={{
                                        color: '#f44', color: "white",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}>Cancle</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    (
                        <Item imageUrl={item.imageUrl} name={item.name} number={item.number} price={item.price} date={item.date} id={item.id} />
                    )
                    }
                />
            </View>

        </View>
    )
}