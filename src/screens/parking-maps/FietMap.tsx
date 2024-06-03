import React, { useEffect, useState } from 'react';
import {
    GluestackUIProvider,
    Text,
    Box,
    Center,
    Button,
    ButtonText,
    Image,
    Heading,
    VStack,
    HStack,
    ButtonIcon,
    AddIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    Divider
} from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
import { StyleSheet } from 'react-native';

enum ParkingSpotStatus {
    FREE = 'Libre',
    OCCUPIED = 'Ocupado',
}

const FietMap = ({ navigation }: { navigation: any }) => {

    const [parkingSpots, setParkingSpots] = useState([
        { id: 2567148, status: ParkingSpotStatus.FREE }, // Es el espacio de parqueo que está conectado a thinkSpeak
        { id: 2, status: ParkingSpotStatus.FREE },
        { id: 3, status: ParkingSpotStatus.FREE },
        { id: 4, status: ParkingSpotStatus.FREE },
        { id: 5, status: ParkingSpotStatus.FREE },
        { id: 6, status: ParkingSpotStatus.FREE },
        { id: 7, status: ParkingSpotStatus.FREE },
        { id: 8, status: ParkingSpotStatus.FREE },
        { id: 9, status: ParkingSpotStatus.FREE },
        { id: 10, status: ParkingSpotStatus.FREE },
        { id: 11, status: ParkingSpotStatus.FREE },
        { id: 12, status: ParkingSpotStatus.FREE },
        { id: 13, status: ParkingSpotStatus.FREE },
        { id: 14, status: ParkingSpotStatus.FREE },
        { id: 15, status: ParkingSpotStatus.FREE },
        { id: 16, status: ParkingSpotStatus.FREE },
    ]);

    //Consumo servicio de thinkSpeak 
    const getStatusParkingSpots = async () => {
        
        try {

            const response = await fetch('https://api.thingspeak.com/channels/2567148/feeds.json?api_key=7M9DZZ7W7A0OYF2U&results=1');

            const data = await response.json();
            const updatedSpots = parkingSpots.map((spot, index) => {
                if (index === 0) {
                    return {
                        ...spot,
                        status: parseInt(data.feeds[0].field1) === 1 ?
                            ParkingSpotStatus.OCCUPIED : ParkingSpotStatus.FREE,
                    };
                }
                return spot;
            });

            setParkingSpots(updatedSpots);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        getStatusParkingSpots();

        const intervalId = setInterval(getStatusParkingSpots, 30000);
        return () => clearInterval(intervalId);

    }, []);

    return (
        <GluestackUIProvider config={config} >
            <VStack justifyContent='center' alignItems='center' h='$full' bg='$coolGray200'>
                <Box>
                    <Button
                        size="md"
                        variant="link"
                        action="secondary"
                        isDisabled={false}
                        isFocusVisible={false}
                    >
                        <ButtonText>Entrada</ButtonText>
                    </Button>
                </Box>
                <HStack style={styles.parkingContainer}>
                    <VStack style={styles.side}>
                        {parkingSpots.slice(0, 8).map(spot => (
                            <Box m='$1' bg='$white' key={spot.id} style={styles.parkingSpot}>
                                <Text style={spot.status === ParkingSpotStatus.FREE ? styles.free : styles.occupied}>
                                    {spot.status}
                                </Text>
                            </Box>
                        ))}
                    </VStack>
                    <Box my='$1' justifyContent='center' bg='$coolGray500' >
                        <HStack space='2xl' p='$8' reversed={false}>
                            <Text color='$white' size='5xl' bold>↑</Text>
                            <Text color='$white' size='5xl' bold>↓</Text>
                        </HStack>
                    </Box>
                    <VStack>
                        {parkingSpots.slice(8).map(spot => (
                            <Box m='$1' bg='$white' key={spot.id} style={styles.parkingSpot}>
                                <Text style={spot.status === 'Libre' ? styles.free : styles.occupied}>{spot.status}</Text>
                            </Box>
                        ))}
                    </VStack>
                </HStack>
                <Box pt='$2'>
                    <Button
                        size="md"
                        variant="link"
                        action="secondary"
                        isDisabled={false}
                        isFocusVisible={false}
                    >
                        <ButtonText>Salida</ButtonText>
                    </Button>
                </Box>
            </VStack>

        </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signBox: {
        margin: 10,
    },
    sign: {
        fontSize: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    parkingContainer: {
        justifyContent: 'space-between',
    },
    side: {
        justifyContent: 'space-between',
    },
    parkingSpot: {
        width: 120,
        height: 70,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 30,
        color: 'white',
    },
    free: {
        color: 'green',
        fontWeight: 'bold',
    },
    occupied: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default FietMap;