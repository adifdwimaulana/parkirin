import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Image, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';


import { auth, db } from '../config';

const { width, height } = Dimensions.get('window');

const home = {
    latitude: -7.289144,
    longitude: 112.812393,
    latitudeDelta: 0.045,
    longitudeDelta: 0.045
}
const locations = [
    { id: 1, name: 'Dharmahusada' },
    { id: 2, name: 'Kenjeran' },
    { id: 3, name: 'Keputih' },
    { id: 4, name: 'Klampis' },
    { id: 5, name: 'Manyar' },
    { id: 6, name: 'Mulyosari' },
]

const API_KEY = 'AIzaSyDf8UOiJrm6eJVdZ3ZMJdKqczzrcC9jqms';

const parkiranInfo = [
    {
        id: 1,
        imageUrl: '../assets'
    }
]

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        Geolocation.watchPosition(
            (position) => {
                const myLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.045,
                    longitudeDelta: 0.045
                }
                this.setState({ origin: myLocation })
            },
            (error) => {
                console.log(error.code, error.message)
            },
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 2000
            }
        )

        this.state = {
            destination: null,
            origin: null,
            parks: []
        }
    }

    componentDidMount() {
    }

    handleLokasi(item) {
        console.log(item.name)
        db.ref(`/${item.name}`).once('value', (snap) => {
            const coordinate = snap.val();
            this.setState({ destination: coordinate })
            console.log(coordinate)
        })

        db.ref(`/${item.name}/Parkir`).once('value', (snap) => {
            let parkArr = []
            const data = snap.val();

            data.forEach(item => {
                console.log(item)
                parkArr.push(item)
            });
            this.setState({ parks: parkArr })
        })
    }

    handlePickPark(item) {
        console.log(item)
    }

    render() {
        const { origin, destination, parks } = this.state;
        if (origin == null) {
            return null;
        }
        return (
            <View
                style={styles.container}
            >
                <MapView
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    region={home}
                >
                    <Marker
                        coordinate={home}
                        title={"You"}
                        description={"Your Current Location"}
                    >
                        <Image
                            source={require('../assets/car-icon.png')}
                            style={{ height: 25, width: 25 }}
                        />
                    </Marker>
                    {
                        destination ?
                            <Marker
                                coordinate={destination}
                                title={"Your Destination"}
                                onPress={() => console.log("Clicked")}
                            >

                            </Marker> : null
                    }
                    {
                        destination ?
                            <MapViewDirections
                                origin={home}
                                destination={destination}
                                apikey={API_KEY}
                                strokeWidth={5}
                                strokeColor="hotpink"
                            /> : null
                    }
                    {
                        parks ?
                            parks.map((item) =>
                                <Marker
                                    coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude
                                    }}
                                    title={`${item.name}`}
                                    onPress={() => {
                                        const lat = item.latitude;
                                        const long = item.longitude;
                                        const coordinate = {
                                            latitude: lat,
                                            longitude: long
                                        }
                                        this.setState({ destination: coordinate })
                                        console.log(coordinate)
                                    }}
                                >
                                    <Image
                                        source={require('../assets/parking-icon.png')}
                                        style={{ height: 40, width: 40 }}
                                    />
                                </Marker>
                            ) : null
                    }
                </MapView>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <SearchableDropdown
                        onTextChange={text => console.log(text)}
                        onItemSelect={item => this.handleLokasi(item)}
                        textInputStyle={{
                            borderBottomColor: "#000",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            fontSize: 16,
                            paddingLeft: 16,
                            backgroundColor: '#FAF9F8',
                            marginHorizontal: 24,
                            marginTop: 12,
                            marginBottom: 4,
                            borderRadius: 4,
                            elevation: 8
                        }}
                        itemStyle={styles.itemStyle}
                        itemTextStyle={{
                            color: '#222',
                        }}
                        items={locations}
                        defaultIndex={0}
                        placeholder="Masukkan Tujuan"
                        resetValue={false}
                        underlineColorAndroid="transparent"
                    />

                    <ScrollView
                        style={{ height: height * 0.2, position: 'absolute', marginTop: height * 0.68, marginHorizontal: 20 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            parks ?
                                parks.map((item) =>
                                    <View style={styles.card}>
                                        <Image
                                            source={{
                                                uri: `${item.imageUrl}`
                                            }}
                                            style={{ width: '100%', height: 70, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                                        />
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.itemTitle}>{item.name}</Text>
                                            {
                                                item.type == 'motor' ?
                                                    <Icon style={[{ color: '#725E5E' }]} size={18} name={'motorcycle'} />
                                                    : <Icon style={[{ color: '#725E5E' }]} size={18} name={'car'} />
                                            }
                                        </View>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.empty}>Tersedia : {item.empty}</Text>
                                            <Text style={styles.cost}>Tarif : {item.cost}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.btnDestination}
                                            onPress={() => {
                                                const lat = item.latitude;
                                                const long = item.longitude;
                                                const coordinate = {
                                                    latitude: lat,
                                                    longitude: long
                                                }
                                                this.setState({ destination: coordinate })
                                                console.log(coordinate)
                                            }}
                                        >
                                            <Icon style={[{ color: '#725E5E' }]} size={18} name={'arrow-right'} />
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                        }

                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor: '#fff',
    },
    itemStyle: {
        marginHorizontal: 24,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    card: {
        height: '100%',
        width: 200,
        backgroundColor: '#FAF9F8',
        borderRadius: 4,
        elevation: 8,
        marginHorizontal: 4,
    },
    titleContainer: {
        marginHorizontal: 8,
        marginTop: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#725E5E'
    },
    itemContainer: {
        marginHorizontal: 8,
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    empty: {
        fontSize: 12,
        fontWeight: '600',
        color: '#725E5E'
    },
    cost: {
        fontSize: 12,
        fontWeight: '400',
        color: '#725E5E'
    },
    btnDestination: {
        marginHorizontal: 8,
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
})