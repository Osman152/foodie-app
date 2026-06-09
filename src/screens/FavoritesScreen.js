import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400';

export default function FavoritesScreen({ navigation }) {
  const { sampleRecipes, myRecipes, favorites, toggleFavorite } = useRecipes();
  const allRecipes = [...sampleRecipes, ...myRecipes];
  const favRecipes = allRecipes.filter((r) => favorites.includes(r.id));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item.image || PLACEHOLDER }}
        style={styles.cardImg}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardCat}>{item.category}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={13} color="#f5a623" />
          <Text style={styles.metaText}>{item.prepTime || 'N/A'}</Text>
          <Ionicons
            name="flame-outline"
            size={13}
            color="#f5a623"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.metaText}>{item.calories || '—'} cal</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => toggleFavorite(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="heart" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.count}>{favRecipes.length} saved</Text>
      </View>

      {favRecipes.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={72} color="#2a2a45" />
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart on any recipe to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favRecipes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '800' },
  count: { color: '#f5a623', fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e35',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardImg: { width: 90, height: 90 },
  cardBody: { flex: 1, paddingHorizontal: 12, paddingVertical: 8 },
  cardName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cardCat: { color: '#f5a623', fontSize: 12, fontWeight: '600', marginTop: 3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  metaText: { color: '#888', fontSize: 11, marginLeft: 3 },
  heartBtn: { paddingRight: 16 },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18,
  },
  emptySubtitle: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
