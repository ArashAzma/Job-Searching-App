import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import JobScreen from "../screens/JobScreen";
import SearchScreen from "../screens/SearchScreen";
import LikesScreen from "../screens/LikesScreen";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='JobDetails'
                    component={JobScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Search'
                    component={SearchScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Likes'
                    component={LikesScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
