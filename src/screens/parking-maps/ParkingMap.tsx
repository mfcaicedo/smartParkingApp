import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";
const iconCar = require("../../../assets/car.png");
const iconParking = require("../../../assets/icono-smart-parking.png");
import Geolocation from 'react-native-geolocation-service';

const ParkingMap = ({ navigation }: { navigation: any }) => {

    const [origin, setOrigin] = useState<any>({
        latitude: 2.446196,
        longitude: -76.596386,
    });

    const [destination, setDestination] = useState<any>({
        latitude: 2.446345,
        longitude: -76.598054,
    });

    const [location, setLocation] = useState<any>(false);

    // Function to get permission for location
    const requestLocationPermission = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (granted === 'granted') {
                return true;
            } else {
                return false;
            }

        } catch (err) {
            return false;
        }
    };

    // function to check permissions and get Location
    const getLocation = () => {

        const result = requestLocationPermission();

        result.then(res => {
            if (res) {
                Geolocation.getCurrentPosition(
                    (position) => {

                        console.log("Ubicación", position);
                        setLocation(position);

                        const { latitude, longitude } = position.coords;
                        setOrigin({ latitude, longitude });

                    },
                    (error) => {
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
    };

    useEffect(() => {

        getLocation();

        const intervalId = setInterval(getLocation, 60000);
        return () => clearInterval(intervalId);

    }, []);

    return (
        <GluestackUIProvider config={config} >
            <Box justifyContent="center" w='$full' h='$full'>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                // followsUserLocation={true}
                // showsUserLocation={true}
                >
                    <Marker
                        draggable
                        icon={iconCar}
                        coordinate={origin}
                        onDragEnd={(e) => {
                            setOrigin(e.nativeEvent.coordinate);
                        }}
                    />
                    <Marker
                        draggable
                        icon={iconParking}
                        coordinate={destination}
                        onDragEnd={(e) => {
                            setDestination(e.nativeEvent.coordinate);
                        }}
                    />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor="hotpink"
                    />
                </MapView>
            </Box>
        </GluestackUIProvider>
    );
};

export default ParkingMap;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});