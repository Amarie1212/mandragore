import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const profilePicture = require('../img/me.jpg');

const AboutPage = ({ currentTheme, toggleTheme }: { currentTheme: { background: string; text: string; itemBackground: string }; toggleTheme: () => void }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>About Me</Text>
      <TouchableOpacity
  style={[styles.profileCard, { backgroundColor: currentTheme.itemBackground }]}
  onPress={openModal}
>
  <Image source={profilePicture} style={styles.profileImage} />
  <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Muhammad Balya Sulivan</Text>
  <View style={styles.profileDetails}>
    <Icon name="school" size={18} color={currentTheme.text} style={styles.profileIcon} />
    <Text style={[styles.cardText, { color: currentTheme.text }]}>NIM: 222505050</Text>
  </View>
  <View style={styles.profileDetails}>
    <Icon name="book" size={18} color={currentTheme.text} style={styles.profileIcon} />
    <Text style={[styles.cardText, { color: currentTheme.text }]}>Sistem Informasi</Text>
  </View>
  <View style={styles.profileDetails}>
    <Icon name="location-on" size={18} color={currentTheme.text} style={styles.profileIcon} />
    <Text style={[styles.cardText, { color: currentTheme.text }]}>Universitas Ma'soem</Text>
  </View>
</TouchableOpacity>
{/* Contact Information Section */}
<View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
  <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Contact Information</Text>
  {[
    { label: 'Phone', value: '+62 859-7390-2470', icon: 'phone' },
    { label: 'Email', value: 'balyakun37@gmail.com', icon: 'email' },
    { label: 'Instagram', value: '@iva_3_n', icon: 'camera-alt' },
  ].map((contact, index) => (
    <View key={index} style={styles.contactItem}>
      <Icon name={contact.icon} size={24} color={currentTheme.text} style={styles.contactIcon} />
      <View style={styles.contactTextContainer}>
        <Text style={[styles.contactLabel, { color: currentTheme.text }]}>{contact.label}</Text>
        <Text style={[styles.contactValue, { color: currentTheme.text }]}>{contact.value}</Text>
      </View>
    </View>
  ))}
</View>

      {/* Skills Section */}
      <View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
        <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Skills</Text>
        {[{
            name: "JavaScript",
            value: 85,
          }, {
            name: "React",
            value: 80,
          }, {
            name: "Node.js",
            value: 75,
          }, {
            name: "TypeScript",
            value: 70,
          }, {
            name: "MongoDB",
            value: 65,
          }].map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={[styles.skillName, { color: currentTheme.text }]}>{skill.name}</Text>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${skill.value}%`, backgroundColor: currentTheme.text },
                  ]}
                />
              </View>
              <Text style={[styles.skillValue, { color: currentTheme.text }]}>{skill.value}%</Text>
            </View>
          ))}
      </View>

      {/* Hobbies Section */}
      <View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
  <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Hobbies</Text>
  <View style={styles.hobbiesRow}>
    {[
      { name: 'Reading', icon: 'book' },
      { name: 'Traveling', icon: 'flight' },
      { name: 'Coding', icon: 'code' },
      { name: 'Gaming', icon: 'sports-esports' },
      { name: 'Music', icon: 'music-note' },
    ].map((hobby, index) => (
      <View key={index} style={styles.hobbyItem}>
        <Icon name={hobby.icon} size={24} color={currentTheme.text} style={styles.hobbyIcon} />
        <Text style={[styles.hobbyText, { color: currentTheme.text }]}>{hobby.name}</Text>
      </View>
    ))}
  </View>
</View>

      {/* Education History Section */}
      {/* Education History Section */}
<View style={[styles.card, { backgroundColor: currentTheme.itemBackground }]}>
  <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Education History</Text>
  {[
    { level: 'TK', name: 'TK Amalia B', year: '2005 - 2009', icon: 'child-care' },
    { level: 'SD', name: 'SD Asy-Syifa', year: '2009 - 2015', icon: 'school' },
    { level: 'SMP', name: 'Genrus Nusantara Boarding School', year: '2015 - 2017', icon: 'location-city' },
    { level: 'SMK', name: 'SMK Negeri 6 Bandung', year: '2017 - 2022', icon: 'engineering' },
  ].map((edu, index) => (
    <View
      key={index}
      style={[
        styles.educationItem,
        { backgroundColor: currentTheme.itemBackground, shadowColor: currentTheme.text },
      ]}
    >
      <Icon name={edu.icon} size={24} color={currentTheme.text} style={styles.educationIcon} />
      <View style={styles.educationTextContainer}>
        <Text style={[styles.educationLevel, { color: currentTheme.text }]}>{edu.level}</Text>
        <Text style={[styles.educationName, { color: currentTheme.text }]}>{edu.name}</Text>
        <Text style={[styles.educationYear, { color: `${currentTheme.text}88` }]}>{edu.year}</Text>
      </View>
    </View>
  ))}
</View>


      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: currentTheme.background }]}>
                <Text style={[styles.modalTitle, { color: currentTheme.text }]}>About Me</Text>
                <Text style={[styles.modalText, { color: currentTheme.text }]}>NIM: 222505050</Text>
                <Text style={[styles.modalText, { color: currentTheme.text }]}>System Information</Text>
                <Text style={[styles.modalText, { color: currentTheme.text }]}>University: Ma'soem</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 12, // Sudut membulat
    elevation: 8, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems: 'center', // Pusatkan konten
  },
  profileDetails: {
    flexDirection: 'row', // Atur ikon dan teks secara horizontal
    alignItems: 'center', // Selaraskan ikon dan teks secara vertikal
    marginTop: 8, // Jarak antar detail
  },
  profileIcon: {
    marginRight: 8, // Jarak ikon dari teks
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Membulatkan gambar
    borderWidth: 3,
    borderColor: '#fff', // Warna border
    marginBottom: 15, // Jarak gambar dari teks
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10, // Jarak antara nama dan detail lainnya
  },
  cardText: {
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row', // Atur ikon dan teks dalam satu baris
    alignItems: 'center', // Selaraskan secara vertikal
    paddingVertical: 10, // Ruang di atas dan bawah item
    borderBottomWidth: 1, // Tambahkan garis bawah
    borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Warna garis transparan
  },
  contactIcon: {
    marginRight: 12, // Jarak antara ikon dan teks
  },
  contactTextContainer: {
    flex: 1, // Teks mengambil sisa ruang
  },
  contactLabel: {
    fontSize: 14,
    opacity: 0.8, // Warna lebih terang untuk label
  },
  contactValue: {
    fontSize: 16,
    fontWeight: 'bold', // Teks utama lebih menonjol
  },
  educationItem: {
    flexDirection: 'row', // Ikon dan teks dalam satu baris
    alignItems: 'center',
    padding: 12, // Ruang di dalam item
    borderRadius: 8, // Tepi membulat
    marginBottom: 12, // Jarak antar item
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  educationIcon: {
    marginRight: 12, // Jarak ikon ke teks
  },
  educationTextContainer: {
    flex: 1,
  },
  educationLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  educationName: {
    fontSize: 16,
    marginBottom: 2,
  },
  educationYear: {
    fontSize: 14,
    opacity: 0.8, // Warna lebih terang untuk tahun
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  card: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillItem: {
    marginBottom: 15,
  },
  skillName: {
    fontSize: 16,
  },
  skillValue: {
    fontSize: 16,
    textAlign: 'right',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  hobbies: {
    marginTop: 10,
  },
  hobbyItem: {
    flexDirection: 'row', // Ikon dan teks diatur secara horizontal
    alignItems: 'center', // Selaraskan ikon dan teks secara vertikal
    marginBottom: 10,
    marginRight: 20, // Jarak antar item
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  hobbiesRow: {
    flexDirection: 'row', // Tampilkan secara horizontal
    flexWrap: 'wrap', // Bungkus ke baris berikutnya jika terlalu panjang
    justifyContent: 'space-between', // Sebar elemen secara merata
    marginTop: 10,
  },

  hobbyIcon: {
    marginRight: 8, // Jarak antara ikon dan teks
  },
  hobbyText: {
    fontSize: 16,
  },
});

export default AboutPage;
