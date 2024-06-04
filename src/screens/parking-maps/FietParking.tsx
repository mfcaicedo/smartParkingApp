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
    RESERVED = 'Reservado'
}

const FietParking = ({ navigation }: { navigation: any }) => {

    const [parkingSpots, setParkingSpots] = useState([
        { id: 2567148, position: 1, status: ParkingSpotStatus.FREE }, // Es el espacio de parqueo que está conectado a thinkSpeak
        { id: 2, position: 2, status: ParkingSpotStatus.FREE },
        { id: 3, position: 3, status: ParkingSpotStatus.RESERVED },
        { id: 4, position: 4, status: ParkingSpotStatus.FREE },
        { id: 5, position: 5, status: ParkingSpotStatus.FREE },
        { id: 6, position: 6, status: ParkingSpotStatus.FREE },
        { id: 7, position: 7, status: ParkingSpotStatus.FREE },
        { id: 8, position: 8, status: ParkingSpotStatus.FREE },
        { id: 9, position: 9, status: ParkingSpotStatus.FREE },
        { id: 10, position: 10, status: ParkingSpotStatus.FREE },
        { id: 11, position: 11, status: ParkingSpotStatus.FREE },
        { id: 12, position: 12, status: ParkingSpotStatus.FREE },
        { id: 13, position: 13, status: ParkingSpotStatus.FREE },
        { id: 14, position: 14, status: ParkingSpotStatus.FREE },
        { id: 15, position: 15, status: ParkingSpotStatus.FREE },
        { id: 16, position: 16, status: ParkingSpotStatus.FREE },
    ]);

    //Consumo servicio de thinkSpeak 
    const getStatusParkingSpots = async () => {

        try {

            const response = await fetch('https://api.thingspeak.com/channels/2567148/feeds.json?api_key=7M9DZZ7W7A0OYF2U&results=1');

            const data = await response.json();

            setParkingSpots(prevSpots => {
                return prevSpots.map((spot, index) => {
                    if (index === 0) {
                        return {
                            ...spot,
                            status: parseInt(data.feeds[0].field1) === 1 ?
                                ParkingSpotStatus.OCCUPIED :
                                prevSpots[index].status === ParkingSpotStatus.RESERVED ?
                                    ParkingSpotStatus.RESERVED : ParkingSpotStatus.FREE,
                        };
                    }
                    return spot;
                });
            });

        } catch (error) {
            console.error(error);
        }
    }

    const handleReserve = (id: number) => {

        const updatedSpotsChange = parkingSpots.map(spot => {
            if (spot.id === id) {
                return {
                    ...spot,
                    status: ParkingSpotStatus.RESERVED,
                };
            }
            return spot;
        });

        setParkingSpots(updatedSpotsChange);

    }

    useEffect(() => {

        getStatusParkingSpots();

        const intervalId = setInterval(getStatusParkingSpots, 30000);
        return () => clearInterval(intervalId);

    }, []);

    return (
        <GluestackUIProvider config={config} >
            <VStack justifyContent='center' alignItems='center' h='$full' bg='$coolGray200'>
                <Box justifyContent='flex-start' w='$full' pl='$2'>
                    <Text color='$black'>
                        Reserva tu espacio de parqueo
                    </Text>
                </Box>
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
                    <VStack>
                        {parkingSpots.slice(0, 8).map(spot => (
                            <Box m='$1' bg='$white' key={spot.id} style={styles.parkingSpot}>
                                <Box justifyContent='space-between' flexDirection='row'>
                                    <Text bold color='$black'>No. {spot.position}</Text>
                                    <Text style={spot.status === ParkingSpotStatus.FREE ?
                                        styles.free : spot.status === ParkingSpotStatus.OCCUPIED ? styles.occupied : styles.reserved}>
                                        {spot.status}
                                    </Text>
                                </Box>
                                <Box w='$full' h='$full' justifyContent='flex-start' alignItems='center'>
                                    {
                                        spot.status === ParkingSpotStatus.FREE ? (
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                action="primary"
                                                isDisabled={false}
                                                isFocusVisible={false}
                                                onPress={
                                                    () => handleReserve(spot.id)
                                                }
                                            >
                                                <ButtonText>Reservar</ButtonText>
                                            </Button>
                                        ) : spot.status === ParkingSpotStatus.OCCUPIED ? (
                                            <Text>
                                                No disponible
                                            </Text>
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                action="positive"
                                                isDisabled={false}
                                                isFocusVisible={false}
                                                onPress={() => navigation.navigate('ParkingMap')}
                                            >
                                                <ButtonText>Ver mapa</ButtonText>
                                            </Button>
                                        )
                                    }
                                </Box>
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
                                <Box justifyContent='space-between' flexDirection='row'>
                                    <Text bold color='$black'>No. {spot.position}</Text>
                                    <Text
                                        style={spot.status === ParkingSpotStatus.FREE ?
                                            styles.free : spot.status === ParkingSpotStatus.OCCUPIED ? styles.occupied : styles.reserved}>
                                        {spot.status}
                                    </Text>
                                </Box>
                                <Box w='$full' h='$full' justifyContent='flex-start' alignItems='center'>
                                    {
                                        spot.status === ParkingSpotStatus.FREE ? (
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                action="primary"
                                                isDisabled={false}
                                                isFocusVisible={false}
                                                onPress={
                                                    () => handleReserve(spot.id)
                                                }
                                            >
                                                <ButtonText>Reservar</ButtonText>
                                            </Button>
                                        ) : spot.status === ParkingSpotStatus.OCCUPIED ? (
                                            <Text>
                                                No disponible
                                            </Text>
                                        ) : (
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                action="positive"
                                                isDisabled={false}
                                                isFocusVisible={false}
                                            >
                                                <ButtonText>Ver mapa</ButtonText>
                                            </Button>
                                        )
                                    }
                                </Box>
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
                        onPress={() => navigation.navigate('ParkingMap')}
                    >
                        <ButtonText>Salida</ButtonText>
                    </Button>
                </Box>
            </VStack>

        </GluestackUIProvider>
    )
}

export default FietParking;

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
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 2,
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
    reserved: {
        color: 'orange',
        fontWeight: 'bold',
    },
});
