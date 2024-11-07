import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PALETTE } from '../consts';
const Stack = createNativeStackNavigator();
const Navigator = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <NavigationContainer theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: PALETTE.backgroundColor
                }
            }}>
                <View style={{ paddingTop: insets.top }} />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Details" component={Details} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PALETTE.backgroundColor,
        flex: 1
    }
})

export default Navigator