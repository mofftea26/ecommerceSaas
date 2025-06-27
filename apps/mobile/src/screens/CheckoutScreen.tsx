import { View, Text } from 'react-native';
import { Header } from '../components/Header';
import { useAuthProtected } from '../hooks/useAuthProtected';

export default function CheckoutScreen() {
  useAuthProtected();
  return (
    <View className="flex-1 bg-white">
      <Header title="Checkout" showBack />
      <View className="flex-1 items-center justify-center">
        <Text>Checkout coming soon...</Text>
      </View>
    </View>
  );
}
