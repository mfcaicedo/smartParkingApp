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

const FietMap = ({ navigation }: { navigation: any }) => {
    return (
        <GluestackUIProvider config={config} >
            <Box justifyContent="space-between" h='$full' w='$full' py='$10'>
                <Text bold size="xl">
                    Mapa de la FIET 
                </Text>
            </Box>
        </GluestackUIProvider>
    )
}
export default FietMap;