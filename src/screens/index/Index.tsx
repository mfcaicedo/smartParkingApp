import React, { useState } from 'react';
import {
    GluestackUIProvider,
    Text,
    Box,
    Center,
    Button,
    ButtonText,
    Image,
    Heading,
    HStack,
    Card
} from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
import { Alert, TouchableOpacity } from 'react-native';
const iconoCiencias = require('../../../assets/icono-ciencias.png');
const iconoFiet = require('../../../assets/icono-fiet.png');
const iconoSalud = require('../../../assets/icono-salud.png');
const iconoHumanas = require('../../../assets/leyendo.png');

const Index = ({ navigation }: { navigation: any }) => {

    const handlePressFiet = () => {
        navigation.navigate('FietMap');
    };

    const handlePressNoAvailable = () => {
        Alert.alert('Ups!', 'Este parqueadero no está disponible en este momento');
    }

    return (
        <GluestackUIProvider config={config} >
            <Box bg='$coolGray100' justifyContent="space-between" h="$full" p='$5' gap='$3' w='$full'>
                <Heading bold size="xl" >¡Selecciona el parqueadero perfecto para ti!</Heading>
                <TouchableOpacity onPress={handlePressFiet}>
                    <Card size="lg" justifyContent='center' alignItems='center' flexDirection='row'
                        w='$full' variant="elevated">
                        <Box flex={1} alignItems="center">
                            <Image
                                size="2xl" $xs-borderRadius="$sm"
                                source={iconoFiet}
                                alt="icono Fiet"
                                resizeMode='contain'
                                w='$20'
                                h='$20'
                            />
                        </Box>
                        <Box flex={2}>
                            <Heading size="md">
                                Facultad de Ingeniería Electrónica y Telecomunicaciones
                            </Heading>
                        </Box>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressNoAvailable}>
                    <Card size="lg" justifyContent='center' alignItems='center' flexDirection='row'
                        variant="elevated" w='$full'>
                        <Box flex={1} alignItems="center">
                            <Image
                                size="2xl"
                                source={iconoCiencias}
                                alt="icono Ciencias"
                                resizeMode='contain'
                                w='$20'
                                h='$20'
                            />
                        </Box>
                        <Box flex={2}>
                            <Heading size="md">
                                Facultad de Ciencias Naturales y Exactas
                            </Heading>
                        </Box>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressNoAvailable}>
                    <Card size="lg" justifyContent='center' alignItems='center' flexDirection='row'
                        w='$full' variant="elevated">
                        <Box flex={1} alignItems="center">
                            <Image
                                size="2xl" $xs-borderRadius="$sm"
                                source={iconoSalud}
                                alt="icono Salud"
                                resizeMode='contain'
                                w='$20'
                                h='$20'
                            />
                        </Box>
                        <Box flex={2} >
                            <Heading size="md">
                                Facultad de Ciencias de la Salud
                            </Heading>
                        </Box>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressNoAvailable}>
                    <Card size="lg" justifyContent='center' alignItems='center' flexDirection='row'
                        w='$full' variant="elevated">
                        <Box flex={1} alignItems="center">
                            <Image
                                size="2xl" $xs-borderRadius="$sm"
                                source={iconoHumanas}
                                alt="icono Humanas"
                                resizeMode='contain'
                                w='$24'
                                h='$24'  
                            />
                        </Box>
                        <Box flex={2}>
                            <Heading size="md">
                                Facultad de Ciencias Humanas y Sociales
                            </Heading>
                        </Box>
                    </Card>
                </TouchableOpacity>
            </Box>
        </GluestackUIProvider>
    )
}
export default Index;
