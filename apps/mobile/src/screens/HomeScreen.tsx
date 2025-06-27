import { View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useProducts } from '../hooks/useProducts';
import { Header } from '../components/Header';
import { useBranding } from '../hooks/useBranding';

export default function HomeScreen() {
  const { products } = useProducts();
  const { branding } = useBranding();

  return (
    <View className="flex-1 bg-white">
      <Header title={branding.storeName || 'Store'} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/products/${item.id}`)}
            className="p-4 border-b border-gray-200"
          >
            <Text className="text-lg font-semibold">{item.title}</Text>
            <Text className="text-gray-600">${item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
