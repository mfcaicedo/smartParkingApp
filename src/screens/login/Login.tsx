import React, { useEffect, useState } from 'react';

import {
    GluestackUIProvider,
    Box,
    Button,
    Image,
    Input,
    InputField,
    Heading,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    AlertCircleIcon,
    FormControlErrorText,
    ButtonText,
    Toast,
    useToast,
    ToastTitle,
    VStack,
    ToastDescription,
    onChange
} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { FIREBASE_AUTH } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
const logoUnicauca = require('../../../assets/logo-unicauca.png');

const Login = ({ navigation }: { navigation: any }) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {

            const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            navigation.navigate('Home');
            Alert.alert('Bienvenido', 'Inicio de sesión exitoso');

        } catch (error: any) {
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <Box
                justifyContent="flex-start"
                w="$full"
                alignItems="center"
                alignContent="center"
                h="100%">
                <Image
                    size="xl"
                    $xs-borderRadius="$sm"
                    source={logoUnicauca}
                    alt="logoUnicauca"
                    my="$10"
                    resizeMode='contain'
                    w='$full'
                    h='$64'
                />
                <Box justifyContent="center" alignContent="center" gap="$7">
                    <Heading bold size="2xl" alignSelf="flex-start">
                        Inicia sesión
                    </Heading>
                    <FormControl
                        size="lg"
                        minWidth="$80"
                        maxHeight="$96"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        isRequired={true}>
                        <Input variant="underlined" >
                            <InputField
                                type="text"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                defaultValue=""
                                placeholder="Usuario o correo"
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                        </FormControlError>
                    </FormControl>
                    <FormControl
                        size="lg"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                        isRequired={true}>
                        <Input variant="underlined">
                            <InputField
                                type="password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                defaultValue=""
                                placeholder="Contraseña"
                            />
                        </Input>
                        <FormControlError>
                            <FormControlErrorIcon as={AlertCircleIcon} />
                            <FormControlErrorText>
                                La contraseña o el usuario son incorrectos
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <Button
                        onPress={() => {
                            handleLogin();
                        }}
                        size="md"
                        mt="$2"
                        variant="solid"
                        bgColor="$primary500"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}>
                        <ButtonText>Iniciar sesión</ButtonText>
                    </Button>
                </Box>
            </Box>
        </GluestackUIProvider>
    );
};
export default Login;
