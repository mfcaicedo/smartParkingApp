import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/index/Index';
import Login from '../screens/login/Login';
import Welcome from '../screens/welcome/Welcome';
const Stack = createNativeStackNavigator();

const NavigationApp = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ title: '', headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Login', headerShown: false}}
                />
                <Stack.Screen
                    name="Home"
                    component={Index}
                    options={{ title: 'Home' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default NavigationApp;