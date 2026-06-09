
import React from 'react';
import { registerRootComponent } from 'expo'; // 1. Add this import at the top of App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { RecipeProvider } from './src/context/RecipeContext';

import FeedScreen from './src/screens/FeedScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MyFoodScreen from './src/screens/MyFoodScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import MyRecipeDetailScreen from './src/screens/MyRecipeDetailScreen';
import EditRecipeScreen from './src/screens/EditRecipeScreen';

const Tab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();
const MyFoodStack = createNativeStackNavigator();

function FeedStackNav() {
  return (
    <FeedStack.Navigator screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="FeedMain" component={FeedScreen} />
      <FeedStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </FeedStack.Navigator>
  );
}

function FavStackNav() {
  return (
    <FavStack.Navigator screenOptions={{ headerShown: false }}>
      <FavStack.Screen name="FavMain" component={FavoritesScreen} />
      <FavStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </FavStack.Navigator>
  );
}

function MyFoodStackNav() {
  return (
    <MyFoodStack.Navigator screenOptions={{ headerShown: false }}>
      <MyFoodStack.Screen name="MyFoodMain" component={MyFoodScreen} />
      <MyFoodStack.Screen name="AddRecipe" component={AddRecipeScreen} />
      <MyFoodStack.Screen name="MyRecipeDetail" component={MyRecipeDetailScreen} />
      <MyFoodStack.Screen name="EditRecipe" component={EditRecipeScreen} />
    </MyFoodStack.Navigator>
  );
}

export default function App() {
  return (
    <RecipeProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#1a1a2e',
              borderTopColor: '#16213e',
              paddingBottom: 6,
              paddingTop: 6,
              height: 60,
            },
            tabBarActiveTintColor: '#f5a623',
            tabBarInactiveTintColor: '#555',
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Feed: focused ? 'home' : 'home-outline',
                Favorites: focused ? 'heart' : 'heart-outline',
                'My Food': focused ? 'restaurant' : 'restaurant-outline',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Feed" component={FeedStackNav} />
          <Tab.Screen name="Favorites" component={FavStackNav} />
          <Tab.Screen name="My Food" component={MyFoodStackNav} />
        </Tab.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}

registerRootComponent(App);