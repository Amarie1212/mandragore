import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';

import { scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Meal {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory?: string;
  strInstructions: string;
  price?: number;
}

interface HomePageProps {
  currentTheme: { background: string; text: string; itemBackground: string };
  addToCart: (meal: Meal) => void;
}
const { width, height } = Dimensions.get('window');

// Gunakan ini dalam gaya untuk membuat elemen lebih responsif
const modalWidth = width * 0.85; // Modal akan menggunakan 85% dari lebar layar
const modalHeight = height * 0.7;

const HouseScreen = ({ currentTheme, addToCart }: HomePageProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isInWishlistState, setIsInWishlistState] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    if (selectedMeal) {
      checkIsInWishlist(selectedMeal);
    }
  }, [selectedMeal]);
  const extractIngredients = (meal: Meal) => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal];
      const measure = meal[`strMeasure${i}` as keyof Meal];
      if (typeof ingredient === 'string' && ingredient.trim() !== '') {
        ingredients.push(`- ${typeof measure === 'string' ? measure.trim() : ''} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  };  const fetchMeals = async () => {
    try {
      const mealPromises = Array.from({ length: 9 }).map(() =>
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      );
      const responses = await Promise.all(mealPromises);
      const mealsWithPrices = responses.map((response) => {
        const meal = response.data.meals[0];
        meal.price = generatePrice(meal.strCategory);
        return meal;
      });
      setMeals(mealsWithPrices);
    } catch (error) {
      console.error(error);
    }
  };

  const generatePrice = (category: string | undefined): number => {
    const minPrice = 20000;
    const maxPrice = 120000;
    return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMeals().finally(() => setRefreshing(false));
  };

  const openMealDetails = (meal: Meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
    setShowFullDescription(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMeal(null);
  };

  const checkIsInWishlist = async (item: Meal) => {
    const savedWishlist = await AsyncStorage.getItem('wishlist');
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    setIsInWishlistState(wishlist.some((wishlistItem: Meal) => wishlistItem.idMeal === item.idMeal));
  };

  const addToFavorites = async (item: Meal) => {
    try {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

      if (!wishlist.some((i: Meal) => i.idMeal === item.idMeal)) {
        wishlist.push(item);
        await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
        Alert.alert('Success', 'Item added to your Favorites!');
        setIsInWishlistState(true);
      } else {
        Alert.alert('Already in Favorites', 'This item is already in your Favorites.');
      }
    } catch (error) {
      console.error('Error adding to Favorites', error);
    }
  };

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
     <TextInput
  style={[
    styles.searchBarContainer,
    {
      borderColor: currentTheme.text,
      color: currentTheme.text, // Set text color based on the current theme
      fontSize: 16, // You can adjust this value as per your design requirements
      backgroundColor: currentTheme.itemBackground, // Adjust background color based on theme
    },
  ]}
  placeholder="Search meals..."
  // Ensure placeholder text is visible in both themes
  value={search}
  onChangeText={(text) => setSearch(text)}
  autoCapitalize="none" // To ensure text is not automatically capitalized
  autoCorrect={false} // Disable autocorrect if needed
  clearButtonMode="while-editing" // Display clear button while editing
/>
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.mealItem, { backgroundColor: currentTheme.itemBackground }]}
            onPress={() => openMealDetails(item)}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <Text style={[styles.mealTitle, { color: currentTheme.text }]}>{item.strMeal}</Text>
            <Text style={[styles.mealCategory, { color: currentTheme.text }]}>
              {item.strCategory || 'Unknown Category'}
            </Text>
            <Text style={[styles.mealPrice, { color: currentTheme.text }]}>
              {`Rp ${item.price?.toLocaleString('id-ID')}`}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
{selectedMeal && (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalContent, { backgroundColor: currentTheme.itemBackground }]}>
            {/* Meal Image */}
            <Image
              source={{ uri: selectedMeal.strMealThumb }}
              style={[styles.modalImage, { borderRadius: 12 }]} // Adjusted borderRadius to match your gridItem image style
            />

            {/* Meal Title */}
            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>{selectedMeal.strMeal}</Text>

            {/* Category */}
            <Text style={[styles.modalCategory, { color: currentTheme.text }]}>
              {selectedMeal.strCategory || 'Unknown Category'}
            </Text>

            {/* Price */}
            <Text style={[styles.modalPrice, { color: currentTheme.text }]}>
              Rp {selectedMeal.price?.toLocaleString('id-ID')}
            </Text>

            {/* Modal Button Container */}
            <View style={styles.modalButtonContainer}>
              {/* Add to Favorites Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.addToCartButton,
                  {
                    backgroundColor: isInWishlistState ? currentTheme.itemBackground : currentTheme.text,
                    borderColor: currentTheme.itemBackground, // Border color to match wishlist button
                    borderWidth: 1, // Add border for button
                  },
                  isInWishlistState && styles.disabledButton,
                ]}
                onPress={() => {
                  if (!isInWishlistState) {
                    addToFavorites(selectedMeal);
                  }
                }}
                disabled={isInWishlistState}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: isInWishlistState ? currentTheme.text : currentTheme.background },
                  ]}
                >
                  {isInWishlistState ? 'In Favorites' : 'Add to Favorites'}
                </Text>
              </TouchableOpacity>

              {/* Add Order Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.addToCartButton,
                  { backgroundColor: currentTheme.text, borderColor: currentTheme.itemBackground, borderWidth: 1 },
                ]}
                onPress={() => {
                  addToCart(selectedMeal);
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.buttonText, { color: currentTheme.background }]}>Add Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)}

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background overlay
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff', // Background color of the modal content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  modalImage: {
    width: '100%',
    height: 200, // Adjusted height for the modal image (similar to the gridItem height)
    borderRadius: 12, // Rounded corners to match gridItem image
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalCategory: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalIngredients: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50', // Green color for Add to Cart
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
  searchBarContainer: {
    height: verticalScale(30),       // Tinggi input yang disesuaikan secara vertikal
    paddingHorizontal: scale(10),    // Padding kiri dan kanan untuk memberi ruang pada teks
    paddingVertical: verticalScale(9),  // Padding atas dan bawah
    borderWidth: 1,
    borderRadius: scale(20),          // Sudut rounded sesuai dengan skala
    marginBottom: verticalScale(5),  // Jarak bawah untuk memisahkan dengan elemen lain
    width: '80%',                    // Lebar 80% dari layar
    marginHorizontal: scale(10),     // Margin kiri dan kanan agar tidak menempel pada tepi layar
    alignSelf: 'center',             // Memastikan komponen berada di tengah
  },
   searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mealItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: 20,
  },
  mealImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 18, // Reduced from 20
    fontWeight: 'bold',
    textAlign: 'center',
},
mealCategory: {
    fontSize: 14, // Reduced from 16
    textAlign: 'left',
},
mealPrice: {
    fontSize: 14, // Reduced from 16
    textAlign: 'center',
    marginTop: 5,
},
 
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  toggleDescriptionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
});

export default HouseScreen;
