import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400';

export default function MyFoodScreen({ navigation }) {
  const { myRecipes, deleteMyRecipe } = useRecipes();

  const confirmDelete = (id, name) => {
    Alert.alert('Delete Recipe', `Delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMyRecipe(id),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MyRecipeDetail', { recipe: item })}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item.image || PLACEHOLDER }}
        style={styles.cardImg}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardCat}>{item.category}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="list-outline" size={13} color="#f5a623" />
          <Text style={styles.metaText}>
            {item.ingredients?.length ?? 0} ingredients
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditRecipe', { recipe: item })}
        >
          <Ionicons name="pencil" size={15} color="#f5a623" />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delBtn}
          onPress={() => confirmDelete(item.id, item.name)}
        >
          <Ionicons name="trash-outline" size={15} color="#e74c3c" />
          <Text style={styles.delBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Food</Text>
        <Text style={styles.subtitle}>Your personal cookbook</Text>
      </View>

      {/* Add New Recipe */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddRecipe')}
        activeOpacity={0.85}
      >
        <Ionicons name="add-circle-outline" size={22} color="#1a1a2e" />
        <Text style={styles.addBtnText}>Add New Recipe</Text>
      </TouchableOpacity>

      {/* My Recipes List */}
      {myRecipes.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="restaurant-outline" size={68} color="#2a2a45" />
          <Text style={styles.emptyTitle}>No recipes yet</Text>
          <Text style={styles.emptySub}>
            Tap "Add New Recipe" above to create your first one
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionLabel}>
            My Recipes ({myRecipes.length})
          </Text>
          <FlatList
            data={myRecipes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  title: { color: '#fff', fontSize: 26, fontWeight: '800' },
  subtitle: { color: '#666', fontSize: 13, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5a623',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 14,
    paddingVertical: 15,
    gap: 8,
  },
  addBtnText: { color: '#1a1a2e', fontSize: 16, fontWeight: '800' },
  sectionLabel: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  list: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e35',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardImg: { width: 85, height: 90 },
  cardBody: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  cardName: { color: '#fff', fontSize: 15, fontWeight: '700' },
  cardCat: { color: '#f5a623', fontSize: 12, fontWeight: '600', marginTop: 3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  metaText: { color: '#777', fontSize: 11, marginLeft: 4 },
  actions: { paddingRight: 12, gap: 8 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245,166,35,0.12)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.25)',
  },
  editBtnText: { color: '#f5a623', fontSize: 12, fontWeight: '700' },
  delBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(231,76,60,0.12)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.25)',
  },
  delBtnText: { color: '#e74c3c', fontSize: 12, fontWeight: '700' },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 18 },
  emptySub: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
