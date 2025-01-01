import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CartPage = ({
  cartItems,
  removeFromCart,
  navigation, // Access navigation from props
  currentTheme,
}: {
  cartItems: any[];
  removeFromCart: (id: string) => void;
  navigation: any; // Add navigation prop
  currentTheme: { background: string; text: string; itemBackground: string };
}) => {
  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.header, { color: currentTheme.text }]}>Your Order</Text>

      {/* Render cart items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={[styles.cartItemBox, { backgroundColor: currentTheme.itemBackground }]}>
            <View style={styles.cartItem}>
              <Image source={{ uri: item.strMealThumb }} style={styles.cartImage} />
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: currentTheme.text }]}>{item.strMeal}</Text>
                <Text style={{ color: currentTheme.text }}>
                  {`Rp ${item.price?.toLocaleString('id-ID')}`}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.idMeal)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Display total price */}
      <View style={[styles.totalContainer, { backgroundColor: currentTheme.itemBackground }]}>
        <Text style={[styles.totalText, { color: currentTheme.text }]}>
          Total: Rp {totalPrice.toLocaleString('id-ID')}
        </Text>
      </View>

      {/* Button container for Back to Home and Pay buttons */}
      <View style={styles.buttonContainer}>
        {/* Add Another Button */}
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: currentTheme.text }]}
          onPress={() => navigation.navigate('Home')} // Navigate to the homepage
        >
          <Text style={[styles.buttonText, { color: currentTheme.background }]}>Add Another</Text>
        </TouchableOpacity>

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: currentTheme.text }]}
          onPress={() => alert('Proceeding to payment...')}
        >
          <Text style={[styles.buttonText, { color: currentTheme.background }]}>Pay</Text>
        </TouchableOpacity>
      </View>
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
  cartItemBox: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#ff4d4d', // Red background for remove button
    padding: 5,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  payButton: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartPage;
