import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Geolocation from 'react-native-geolocation-service';

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

if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
    });
}

if (Platform.OS === 'android') {
    PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
}

export default class Park extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: null,
            origin: null,
            region: null,
            showDestination: false,
            showDirection: false,
            lokasi: ''
        };
    }

    componentDidMount() {
        Geolocation.watchPosition(
            (position) => {
                console.log(position);
                this.setState({ origin: position.coords })
            },
            (error) => {
                console.log(error.code, error.message)
            },
            {
                enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
            }
        )
    }

    handleLokasi(item) {
        console.log(item);
        this.setState({ lokasi: item.name })
    }



    render() {
        const { region, origin, destination, showDestination, showDirection } = this.state;
        if (region == null) {
            return null;
        }
        return (
            <>
                {/* <MapView
                    style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                /> */}
                <Text>{origin.latitude}</Text>
                <Text>{origin.longitude}</Text>
                <SearchableDropdown
                    onTextChange={text => console.log(text)}
                    onItemSelect={item => this.handleLokasi(item)}
                    textInputStyle={{
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        fontSize: 16,
                        paddingLeft: 16,
                        backgroundColor: '#fff',
                    }}
                    itemStyle={styles.itemStyle}
                    itemTextStyle={{
                        color: '#222',
                    }}
                    items={locations}
                    defaultIndex={0}
                    placeholder="Masukkan Lokasi"
                    resetValue={false}
                    underlineColorAndroid="transparent"
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginTop: 0,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderBottomColor: "#000",
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})