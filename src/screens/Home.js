import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { auth } from '../config';

const { width, height } = Dimensions.get('window');

const locations = [
    { id: 1, name: 'Dharmahusada' },
    { id: 2, name: 'Kenjeran' },
    { id: 3, name: 'Keputih' },
    { id: 4, name: 'Klampis' },
    { id: 5, name: 'Manyar' },
    { id: 6, name: 'Mulyosari' },
    { id: 7, name: 'Ngagel' },
    { id: 8, name: 'Rungkut' },
    { id: 9, name: 'Semampir' },
    { id: 10, name: 'Sutorejo' },
]

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        Geolocation.watchPosition(
            (position) => {

                const myLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
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
        }
    }

    componentDidMount() {
    }

    render() {
        const { origin, destination } = this.state;
        if (origin == null) {
            return null;
        }
        return (
            <View style={styles.container}>
                <MapView
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    region={origin}
                >
                    <Marker
                        coordinate={origin}
                        title={"You"}
                        description={"Your Current Location"}
                    >
                        <Image
                            source={require('../assets/car-icon.png')}
                            style={{ height: 25, width: 25 }}
                        />
                    </Marker>
                </MapView>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height,
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
    }
})