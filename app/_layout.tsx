import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import HouseScreen from './paga/homepage';
import CartPage from './paga/cartpage';
import WishlistPage from './paga/whishlistpage';
import PersonPage from './paga/personpage';
import AboutPage from './paga/aboutuspage';
import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';

// Prevent splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

const customTheme = {
  light: {
    background: '#f0f0f0',
    text: '#000000',
    itemBackground: '#ffffff',
  },
  dark: {
    background: '#333333',
    text: '#FFFFFF',
    itemBackground: '#666666',
  },
  brownCream: {
    background: '#D9C6B5',
    text: '#4B3F32',
    itemBackground: '#f0e7df',
  },
};

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [lastVisitedPage, setLastVisitedPage] = useState('Home');

  const saveLastVisitedPage = async (page: string) => {
    try {
      await AsyncStorage.setItem('lastVisitedPage', page);
    } catch (error) {
      console.error('Error saving last visited page:', error);
    }
  };

  const getLastVisitedPage = async () => {
    try {
      const page = await AsyncStorage.getItem('lastVisitedPage');
      return page || 'Home';
    } catch (error) {
      console.error('Error getting last visited page:', error);
      return 'Home';
    }
  };

  useEffect(() => {
    const initializeLastPage = async () => {
      const page = await getLastVisitedPage();
      setLastVisitedPage(page);
    };
    initializeLastPage();
  }, []);


  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.idMeal !== id));
  };

  // Load fonts and initial theme
  useEffect(() => {
    const initialize = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themeMode');
        if (storedTheme) {
          setThemeMode(storedTheme);
        }
        await Font.loadAsync({
          SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const saveTheme = async (mode: string) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const toggleTheme = () => {
    let newTheme;
    if (themeMode === 'light') {
      newTheme = 'dark';
    } else if (themeMode === 'dark') {
      newTheme = 'brownCream';
    } else {
      newTheme = 'light';
    }
    setThemeMode(newTheme);
    saveTheme(newTheme);
  };

  if (!fontsLoaded) {
    return null;
  }

  const theme = themeMode === 'dark' ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: customTheme.dark.background,
      text: customTheme.dark.text,
      card: customTheme.dark.itemBackground,
    },
  } : themeMode === 'brownCream' ? {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: customTheme.brownCream.background,
      text: customTheme.brownCream.text,
      card: customTheme.brownCream.itemBackground,
    },
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: customTheme.light.background,
      text: customTheme.light.text,
      card: customTheme.light.itemBackground,
    },
  };

  return (
    <ThemeProvider value={theme}>
      <Drawer.Navigator
        initialRouteName={lastVisitedPage}
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <TouchableOpacity
              onPress={() => props.navigation.closeDrawer()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                backgroundColor: theme.colors.card,
                borderBottomWidth: 3,
                borderBottomColor: theme.colors.text + '33',
                borderRadius: 20,
              }}
            >
              <Ionicons
                name="close-outline"
                size={20}
                color={theme.colors.text}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        )}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 5,
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name="restaurant-outline"
                size={20}
                color={theme.colors.text}
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold' }}>Mandragora</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={{ padding: 30 }}>
              <Ionicons name="shirt-outline" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ),
          drawerStyle: {
            width: '30%',
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            focus: () => saveLastVisitedPage('Home'),
          }}
        >
          {(props) => (
            <HouseScreen
              currentTheme={{
                background: theme.colors.background,
                text: theme.colors.text,
                itemBackground: theme.colors.card,
              }}
              {...props}
              addToCart={addToCart}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Order"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            focus: () => saveLastVisitedPage('Home'),
          }}
        >
          {(props) => (
            <CartPage
              currentTheme={{
                background: theme.colors.background,
                text: theme.colors.text,
                itemBackground: theme.colors.card,
              }}
              {...props}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
        
              navigation={props.navigation}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Favorites"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            focus: () => saveLastVisitedPage('Home'),
          }}
        >
          {(props) => (
            <WishlistPage
              currentTheme={{
                background: theme.colors.background,
                text: theme.colors.text,
                itemBackground: theme.colors.card,
              }}
              {...props}
              addToCart={addToCart}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Person"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            focus: () => saveLastVisitedPage('Home'),
          }}
        >
          {(props) => (
            <PersonPage
              currentTheme={{
                background: theme.colors.background,
                text: theme.colors.text,
                itemBackground: theme.colors.card,
              }}
              toggleTheme={toggleTheme}
              {...props}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="About"
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            focus: () => saveLastVisitedPage('Home'),
          }}
        >
          {(props) => (
            <AboutPage
              currentTheme={{
                background: theme.colors.background,
                text: theme.colors.text,
                itemBackground: theme.colors.card,
              }}
              
              {...props}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </ThemeProvider>
  );
}
