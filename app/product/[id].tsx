import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCartStore } from '../../store/cartStore';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);

  const addToCart = useCartStore(s => s.addToCart);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then((data: Product) => setProduct(data));
  }, [id]);

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <Pressable style={styles.button} onPress={() => addToCart(product)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0a0a0a' },
  image: { height: 250, borderRadius: 12 },
  title: { color: '#fff', fontSize: 22, marginVertical: 12 },
  price: { color: '#ff3366', fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: '#ff3366',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
