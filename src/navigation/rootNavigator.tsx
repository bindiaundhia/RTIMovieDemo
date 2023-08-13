// Library Imports
import React from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
} from "react-native-heroicons/outline";

// Component Imports
import HomeScreen from "../screens/HomeScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen"; // Import MovieDetailsScreen

// Types for navigation and screen options
type RootNavigatorParamList = {
  Home: undefined;
  Movie: undefined;
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootNavigatorParamList>();

  // Common options for the header
  const options = {
    headerShown: true,
    headerStyle: {
      backgroundColor: "#161616",
    },
    headerTitleStyle: {
      fontSize: 18,
      color: "#fff",
    },
    headerRight: () => (
      <TouchableOpacity>
        <EllipsisVerticalIcon color="#fff" />
      </TouchableOpacity>
    ),
  };

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...options,
          title: "Pop Movies",
        }}
      />
      <Stack.Screen
        name="Movie"
        component={MovieDetailsScreen}
        options={({ navigation }) => ({
          ...options,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowUturnLeftIcon color="#fff" />
            </TouchableOpacity>
          ),
          title: "Movie Details",
        })}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
