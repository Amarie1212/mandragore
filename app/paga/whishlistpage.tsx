import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Pressable, Platform, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodItem {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  price: number;
  strCategory: string;
  strIngredients: string;
}

interface WishlistPageProps {
  currentTheme: {
    background: string;
    text: string;
    itemBackground: string;
  };
  addToCart: (item: FoodItem) => void;
}

const WishlistPage = ({ currentTheme, addToCart }: WishlistPageProps) => {
  const [wishlist, setWishlist] = useState<FoodItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading wishlist', error);
      }
    };

    fetchWishlist();

    const unsubscribe = () => {
      const interval = setInterval(fetchWishlist, 1000);
      return () => clearInterval(interval);
    };

    return unsubscribe();
  }, []);

  const removeFromWishlist = async (idMeal: string) => {
    const updatedWishlist = wishlist.filter((item) => item.idMeal !== idMeal);
    setWishlist(updatedWishlist);

    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Error saving wishlist', error);
    }
  };

  const handleAddToCart = (item: FoodItem) => {
    addToCart(item);
    setModalVisible(false);
  };

  const showModal = (item: FoodItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={[styles.gridItem, { backgroundColor: currentTheme.itemBackground }]}
      onPress={() => showModal(item)}
    >
      <View style={[styles.itemBox, { backgroundColor: currentTheme.itemBackground }]}>
        <Image source={{ uri: item.strMealThumb }} style={styles.itemImage} />
        <Text style={[styles.itemTitle, { color: currentTheme.text }]}>{item.strMeal}</Text>
        <Text style={[styles.itemCategory, { color: currentTheme.text }]}>Category: {item.strCategory}</Text>
        <Text style={[styles.itemPrice, { color: currentTheme.text }]}>Rp {item.price.toLocaleString('id-ID')}</Text>
      </View>
    </TouchableOpacity>
  );

  // Function to close the modal if the outside area is pressed
  const closeModal = () => setModalVisible(false);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.header, { color: currentTheme.text }]}>Your Favorite Food</Text>

      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.grid}
        />
      ) : (
        <Text style={[styles.emptyText, { color: currentTheme.text }]}>Choose your Favorite Food</Text>
      )}

      {/* Modal for detailed information */}
      {selectedItem && (
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
                  <Image source={{ uri: selectedItem.strMealThumb }} style={styles.modalImage} />
                  <Text style={[styles.modalTitle, { color: currentTheme.text }]}>{selectedItem.strMeal}</Text>
                  <Text style={[styles.modalCategory, { color: currentTheme.text }]}>Category: {selectedItem.strCategory}</Text>
                  
                  <Text style={[styles.modalPrice, { color: currentTheme.text }]}>
                    Rp {selectedItem.price.toLocaleString('id-ID')}
                  </Text>

                  <View style={styles.modalButtonContainer}>
                    <Pressable
                      style={[styles.button, styles.addToCartButton, { backgroundColor: currentTheme.text }]}
                      onPress={() => handleAddToCart(selectedItem)}
                    >
                      <Text style={[styles.buttonText, { color: currentTheme.background }]}>Add to Cart</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.button, styles.removeButton, { backgroundColor: currentTheme.text }]}
                      onPress={() => {
                        removeFromWishlist(selectedItem.idMeal);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={[styles.buttonText, { color: currentTheme.background }]}>Remove from Favorite</Text>
                    </Pressable>
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 12,
  },
  itemBox: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  itemImage: {
    height: 200,
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  itemCategory: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  itemPrice: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCategory: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalIngredients: {
    fontSize: 12,
    marginBottom: 10,
  },
  modalPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
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
    backgroundColor: '#4CAF50', // Can be changed to match the theme
  },
  removeButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  },
});

export default WishlistPage;
