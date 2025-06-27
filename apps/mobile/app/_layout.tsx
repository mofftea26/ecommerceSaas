import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ClerkProvider } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'nativewind';
import { useBranding } from '../src/hooks/useBranding';
import { CartProvider } from '../src/context/CartContext';
import { AuthProvider } from '../src/context/AuthContext';

const queryClient = new QueryClient();

export default function Root() {
  useBranding();

  return (
    <ClerkProvider publishableKey="YOUR_CLERK_PUBLISHABLE_KEY">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TailwindProvider>
            <CartProvider>
              <StatusBar style="auto" />
              <Slot />
            </CartProvider>
          </TailwindProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}
