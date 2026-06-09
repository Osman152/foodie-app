import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes, CATEGORIES } from '../context/RecipeContext';

export default function FeedScreen({ navigation }) {
  const { sampleRecipes, favorites, toggleFavorite } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = sampleRecipes.filter((r) => {
    const matchCat =
      selectedCategory === 'All' || r.category === selectedCategory;
    const matchSearch = r.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.chip, selectedCategory === item && styles.chipActive]}
      onPress={() => setSelectedCategory(item)}
      activeOpacity={0.75}
    >
      <Text
        style={[styles.chipText, selectedCategory === item && styles.chipTextActive]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item, index }) => {
    const isFav = favorites.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.card, index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }]}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
        activeOpacity={0.85}
      >
        <Image source={{ uri: item.image }} style={styles.cardImg} />
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={20}
            color={isFav ? '#e74c3c' : '#fff'}
          />
        </TouchableOpacity>
        <View style={styles.cardBody}>
          <Text style={styles.cardName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.cardRow}>
            <Ionicons name="time-outline" size={12} color="#f5a623" />
            <Text style={styles.cardMeta}>{item.prepTime}</Text>
            <Ionicons
              name="flame-outline"
              size={12}
              color="#f5a623"
              style={{ marginLeft: 8 }}
            />
            <Text style={styles.cardMeta}>{item.calories} cal</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.difficulty}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello Foodie 👋</Text>
          <Text style={styles.title}>What are you cooking?</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color="#f5a623" />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={17} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#555"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={17} color="#555" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <FlatList
        data={CATEGORIES}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catList}
      />

      {/* Recipe Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="sad-outline" size={52} color="#333" />
            <Text style={styles.emptyText}>No recipes found</Text>
          </View>
        }
      />
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
    paddingBottom: 10,
  },
  greeting: { color: '#888', fontSize: 13 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 2 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1e1e35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#f5a623',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e35',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    gap: 8,
  },
  searchInput: { flex: 1, color: '#fff', fontSize: 14 },
  catList: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e1e35',
    borderWidth: 1,
    borderColor: '#2a2a45',
    paddingBottom: 8,
  },
  chipActive: { backgroundColor: '#f5a623', borderColor: '#f5a623' },
  chipText: { color: '#777', fontSize: 18, fontWeight: '600' },
  chipTextActive: { color: '#1a1a2e' },
  grid: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { marginBottom: 16 },
  card: {
    flex: 1,
    backgroundColor: '#1e1e35',
    borderRadius: 16,
    overflow: 'hidden',
    paddingTop: 8,
    paddingBottom: 8,
  },
  cardImg: { width: '100%', height: 130 },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 18,
    padding: 5,
  },
  cardBody: { padding: 10 },
  cardName: { color: '#fff', fontSize: 14, fontWeight: '700' },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  cardMeta: { color: '#888', fontSize: 11, marginLeft: 3 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a2a45',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 7,
  },
  badgeText: { color: '#f5a623', fontSize: 10, fontWeight: '700' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#444', fontSize: 15, marginTop: 12 },
});
