import { View, Text, FlatList, Pressable } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { router } from 'expo-router';
import { Header } from '../components/Header';

export default function ProductsScreen() {
  const { products } = useProducts();

  return (
    <View className="flex-1 bg-white">
      <Header title="Products" showBack />
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="flex-1 m-2 p-2 border rounded"
            onPress={() => router.push(`/products/${item.id}`)}
          >
            <Text className="font-medium">{item.title}</Text>
            <Text>${item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
