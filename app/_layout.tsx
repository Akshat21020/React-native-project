import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCartStore } from '../store/cartStore';

function CartHeader() {
  const count = useCartStore(state => state.getTotalItems());

  return (
    <Link href="/cart" asChild>
      <Pressable style={styles.cart}>
        <Text style={styles.icon}>🛒</Text>

        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
        headerRight: () => <CartHeader />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'SHOP' }} />
      <Stack.Screen name="product/[id]" options={{ title: '' }} />
      <Stack.Screen name="cart" options={{ title: 'Cart' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  cart: {
    marginRight: 16,
  },
  icon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#ff3366',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
