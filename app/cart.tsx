import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCartStore } from '../store/cartStore';

export default function CartScreen() {
  const items = useCartStore(state => state.items);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  const total = useCartStore(state => state.getCartTotal());

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.qtyRow}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.qtyText}>−</Text>
                </Pressable>

                <Text style={styles.qtyValue}>{item.quantity}</Text>

                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      {/* TOTAL + CLEAR */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.clearBtn} onPress={clearCart}>
          <Text style={styles.clearText}>Clear Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  emptyText: { color: '#888', fontSize: 18 },

  card: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
  },
  info: { flex: 1, marginLeft: 12 },
  title: { color: '#fff', fontSize: 16, fontWeight: '600' },
  price: { color: '#ff3366', marginVertical: 4, fontWeight: '700' },

  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { color: '#fff', fontSize: 18 },
  qtyValue: { color: '#fff', marginHorizontal: 12, fontSize: 16 },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { color: '#888', fontSize: 14 },
  totalValue: { color: '#fff', fontSize: 20, fontWeight: '700' },

  clearBtn: {
    backgroundColor: '#ff3366',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  clearText: { color: '#fff', fontWeight: '700' },
});
