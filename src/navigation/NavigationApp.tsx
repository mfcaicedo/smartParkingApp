import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/index/Index';
import Login from '../screens/login/Login';
import Welcome from '../screens/welcome/Welcome';
import FietMap from '../screens/parking-maps/FietMap';
import { Button, ButtonIcon, ButtonText, GluestackUIProvider, MenuIcon } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
const Stack = createNativeStackNavigator();

const NavigationApp = () => {

    const CustomHeaderMenu = ({ navigation }: { navigation: any }) => {
        return (
            <GluestackUIProvider config={config} >
                <Button
                    pr='$8'
                    size="xl"
                    variant="link"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={() => console.log('menu')}
                >
                    <ButtonIcon color='$black' as={MenuIcon} />
                </Button>
            </GluestackUIProvider>
        );
    };

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ title: '', headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login', headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Index}
                    options={
                        {
                            title: 'Home',
                            headerBackVisible: false,
                            headerLeft: () => <CustomHeaderMenu navigation={Stack.Navigator} />,
                        }
                    }
                />
                <Stack.Screen
                    name="FietMap"
                    component={FietMap}
                    options={{ title: 'Parqueadero FIET' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

};
export default NavigationApp;