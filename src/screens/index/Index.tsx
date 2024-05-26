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

const Index = ({ navigation }: { navigation: any }) => {
    return (
        <GluestackUIProvider config={config} >
            <Box justifyContent="center" h="100%">
                <Text>
                    Pantalla principal
                </Text>
            </Box>
        </GluestackUIProvider>
    )
}
export default Index;
