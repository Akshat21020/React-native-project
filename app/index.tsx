import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
  style={styles.card}
  onPress={() =>
    router.push({
      pathname: '/product/[id]',
      params: { id: item.id.toString() },
    })
  }
>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, backgroundColor: '#0a0a0a' },
  card: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    margin: 8,
    borderRadius: 12,
    padding: 12,
  },
  image: { height: 120, borderRadius: 8 },
  title: { color: '#fff', marginTop: 8, fontWeight: '600' },
  price: { color: '#ff3366', marginTop: 4, fontWeight: '700' },
});
