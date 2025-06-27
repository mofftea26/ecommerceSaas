import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useProduct } from '../hooks/useProduct';
import { Header } from '../components/Header';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { product } = useProduct(Number(id));
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <View className="flex-1 bg-white p-4">
      <Header title={product.title} showBack />
      <Text className="text-xl font-bold mb-2">{product.title}</Text>
      <Text className="mb-4">{product.description}</Text>
      <Text className="mb-4 font-semibold">${product.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );
}
