import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < rating ? '★' : '☆');
  }
  return <Text style={styles.rating}>{stars.join(' ')}</Text>;
};

const ProductCard = ({ navigation }) => {
  
  const [selectedColor, setSelectedColor] = useState(null);

  // Mapping of colors to image sources
  const colorImageMapping = {
    lightblue: require('./assets/img/lightblue.png'), // Update with actual image paths
    red: require('./assets/img/red.png'), // Update with actual image paths
    black: require('./assets/img/black.png'), // Default
    blue: require('./assets/img/blue.png'), // Update with actual image paths
  };

  // Get the product image based on selected color
  const productImage = selectedColor ? colorImageMapping[selectedColor] : require('./assets/img/black.png'); // Default image

  const colors = ['lightblue', 'red', 'black', 'blue'];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    navigation.goBack(); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.productImage} />
      <Text style={styles.productTitle}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>

      <View style={styles.ratingContainer}>
        <StarRating rating={4} />
        <Text style={styles.reviewsText}>(Xem 828 đánh giá)</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>1.500.000 đ</Text>
        <Text style={styles.oldPrice}>1.790.000 đ</Text>
      </View>

      <Text style={styles.guaranteeText}>Ở đâu rẻ hơn hoàn tiền</Text>

      {/* Color Picker Button */}
      <TouchableOpacity
        style={styles.colorPickerButton}
        onPress={() => navigation.navigate('ColorPickerModal', { colors, handleColorSelect })}
      >
        <Text style={styles.colorPickerText}>CHỌN MÀU</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buyNowText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </View>
  );
};

const ColorPickerModal = ({ route, navigation }) => {
  const { colors, handleColorSelect } = route.params;

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Chọn một màu bên dưới:</Text>
      
      <View style={styles.colorOptions}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorOption, { backgroundColor: color }]}
            onPress={() => handleColorSelect(color)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductCard" component={ProductCard} options={{ title: 'Product' }} />
        <Stack.Screen
          name="ColorPickerModal"
          component={ColorPickerModal}
          options={{ title: 'Chọn 1 Màu', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 25,
    color: '#FFD700',
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 18,
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#666',
  },
  guaranteeText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 16,
  },
  colorPickerButton: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: '15%',
  },
  colorPickerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: 'red',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
