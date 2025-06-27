import { View, Text, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { useBranding } from '../hooks/useBranding';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack }: HeaderProps) {
  const { branding } = useBranding();

  return (
    <View className="flex-row items-center justify-between p-4 bg-gray-100">
      {showBack && (
        <Pressable onPress={() => router.back()} className="p-2">
          <Text>Back</Text>
        </Pressable>
      )}
      <View className="flex-row items-center">
        {branding.logoUrl && (
          <Image source={{ uri: branding.logoUrl }} className="w-6 h-6 mr-2" />
        )}
        <Text className="text-lg font-bold" style={{ color: branding.primaryColor || '#000' }}>
          {title}
        </Text>
      </View>
      <View style={{ width: 24 }} />
    </View>
  );
}
