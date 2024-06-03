import React from 'react';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import NavigationApp from './src/navigation/NavigationApp';

export default function App() {
  return (
    <NavigationApp />
  );
}
