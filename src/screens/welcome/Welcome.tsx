import React from 'react';
import {
    GluestackUIProvider,
    Text,
    Box,
    Center,
    Button,
    ButtonText,
    Image,
    Heading
} from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config";
const logoUnicauca = require('../../../assets/logo-unicauca.png');

const Welcome = ({ navigation }: { navigation: any }) => {
    return (
        <GluestackUIProvider config={config} >
            <Box justifyContent="space-between" h='$full' w='$full' py='$10'>
                <Center>
                <Image
                    size="2xl" $xs-borderRadius="$sm"
                    source={logoUnicauca}
                    alt="Logo Unicauca"
                    mb="$12"
                    resizeMode='contain'
                    w='$full'
                    h='$96'
                />
                    <Heading bold size="2xl" >Bienvenido a SmartParking</Heading>
                    <Box>
                        <Text bold size="xl">
                            La mejor App para encontrar parqueaderos en la ciudad de Popayán
                        </Text>
                    </Box>
                </Center>
                <Button onPress={() => {
                    navigation.navigate('Home')
                }}
                    size="md" mx='$5' variant="solid" bgColor='$primary500' action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText>Continuar</ButtonText>
                </Button>
            </Box>
        </GluestackUIProvider>
    )
}
export default Welcome;