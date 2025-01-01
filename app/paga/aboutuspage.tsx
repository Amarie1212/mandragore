import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const About = ({ currentTheme }: { currentTheme: { background: string; text: string; itemBackground: string } }) => {
  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>
        About This App
      </Text>
      <Text style={[styles.body, { color: currentTheme.text }]}>
        Welcome to <Text style={styles.bold}>Mandragora Food Explorer</Text>! This application
        helps you discover amazing dishes from various cultures, find detailed
        recipes, and explore food categories. Whether you're a food lover or an
        aspiring chef, this app is designed to inspire your culinary journey.
      </Text>

      <Text style={[styles.subtitle, { color: currentTheme.text }]}>Our Services</Text>
      <Text style={[styles.body, { color: currentTheme.text }]}>
        This app provides the following services:
      </Text>

      <View
        style={[styles.container, {
          flexDirection: Platform.OS === 'web' ? 'row' : 'column', // Horizontal on web, vertical on mobile
          justifyContent: 'space-between',
        }]}
      >
        {/* Feature 1 */}
        <View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
          <MaterialIcons name="info" size={50} color={currentTheme.text} />
          <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Discover Dishes</Text>
          <Text style={[styles.cardText, { color: currentTheme.text }]}>
            Explore a wide range of dishes from different cuisines and regions. Find detailed recipes and cooking instructions to try at home.
          </Text>
        </View>

        {/* Feature 2 */}
        <View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
          <MaterialIcons name="restaurant-menu" size={50} color={currentTheme.text} />
          <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Recipe Collection</Text>
          <Text style={[styles.cardText, { color: currentTheme.text }]}>
            Access a curated collection of recipes, ranging from quick snacks to gourmet meals. Perfect for both beginners and experienced cooks.
          </Text>
        </View>

        {/* Feature 3 */}
        <View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
          <MaterialIcons name="local-dining" size={50} color={currentTheme.text} />
          <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Food Categories</Text>
          <Text style={[styles.cardText, { color: currentTheme.text }]}>
            Browse dishes by categories like appetizers, main courses, desserts, and more. Find the perfect dish based on your preferences or dietary needs.
          </Text>
        </View>
      </View>

      <Text style={[styles.subtitle, { color: currentTheme.text }]}>What We Offer</Text>
      <Text style={[styles.body, { color: currentTheme.text }]}>
        Mandragora Food Explorer is not just a recipe app. It is a platform designed to help you
        discover new flavors, learn about global cuisines, and experiment with new cooking techniques.
        Here's what you can expect:
      </Text>

      <View style={styles.list}>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Comprehensive Recipe Database:</Text> Access thousands of recipes with ingredients
          and step-by-step instructions.
        </Text>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Personalized Meal Suggestions:</Text> Receive meal suggestions based on your taste and preferences.
        </Text>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Global Cuisine Exploration:</Text> Discover dishes from different countries and cultures.
        </Text>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Interactive Community:</Text> Share your cooking experiences, tips, and reviews with other food enthusiasts.
        </Text>
      </View>

      {/* Terms and Conditions Section */}
      <Text style={[styles.subtitle, { color: currentTheme.text }]}>Terms and Conditions</Text>
      <Text style={[styles.body, { color: currentTheme.text }]}>
        By using Mandragora Food Explorer, you agree to the following terms and conditions:
      </Text>

      <View style={styles.list}>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Use of Content:</Text> All content on the app, including recipes, images, and text, is protected by copyright and may not be reproduced without permission.
        </Text>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Data Privacy:</Text> We value your privacy. Your personal information will only be used in accordance with our privacy policy— in compliance with the privacy law.
        </Text>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Account Responsibility:</Text> You are responsible for maintaining the confidentiality of your account information.
        </Text>
        <Text style={[styles.listItem, { color: currentTheme.text }]}>
          <Text style={styles.bold}>Disclaimer:</Text> We are not responsible for any issues arising from the use of recipes or instructions shared on the platform. Always use caution while cooking.
        </Text>
      </View>
      
      {/* Add paddingBottom to the ScrollView container */}
      <View style={{ paddingBottom: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // This allows the grid to wrap and adapt on smaller screens
    justifyContent: 'space-between',  // Spaces out the cards evenly
    marginTop: 16,
  },
  card: {
    flex: 1,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 100,  // Ensure that the cards don't shrink too much on smaller screens
    maxWidth: 300,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardText: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
  },
  list: {
    marginTop: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default About;
