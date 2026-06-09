import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400';

function StatItem({ icon, value, label }) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={22} color="#f5a623" />
      <Text style={styles.statValue} numberOfLines={1}>
        {String(value ?? '—')}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function MyRecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { deleteMyRecipe } = useRecipes();

  const handleDelete = () => {
    Alert.alert('Delete Recipe', `Delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteMyRecipe(recipe.id);
          navigation.navigate('MyFoodMain');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={{ uri: recipe.image || PLACEHOLDER }}
            style={styles.heroImg}
          />
          <View style={styles.heroOverlay} />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.heroTitle}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.myTag}>
              <Text style={styles.myTagText}>⭐ My Recipe</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsBox}>
          <StatItem
            icon="time-outline"
            value={recipe.prepTime || 'N/A'}
            label="Prep Time"
          />
          <View style={styles.div} />
          <StatItem
            icon="people-outline"
            value={recipe.servings}
            label="Servings"
          />
          <View style={styles.div} />
          <StatItem
            icon="flame-outline"
            value={recipe.calories ? `${recipe.calories}` : '—'}
            label="Calories"
          />
          <View style={styles.div} />
          <StatItem
            icon="speedometer-outline"
            value={recipe.difficulty || '—'}
            label="Difficulty"
          />
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients?.map((ing, i) => (
            <View key={i} style={styles.ingRow}>
              <View style={styles.dot} />
              <Text style={styles.ingText}>{ing}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions?.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditRecipe', { recipe })}
          >
            <Ionicons name="pencil" size={18} color="#1a1a2e" />
            <Text style={styles.editBtnText}>Edit Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.delBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  hero: { height: 300, position: 'relative' },
  heroImg: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 22,
    padding: 8,
  },
  heroTitle: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  recipeName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  myTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5a623',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
  },
  myTagText: { color: '#1a1a2e', fontSize: 12, fontWeight: '700' },
  statsBox: {
    flexDirection: 'row',
    backgroundColor: '#1e1e35',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 13, fontWeight: '700', marginTop: 4 },
  statLabel: { color: '#666', fontSize: 10, marginTop: 2 },
  div: { width: 1, height: 44, backgroundColor: '#2a2a45' },
  section: { marginHorizontal: 20, marginTop: 26 },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e35',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f5a623',
    marginRight: 12,
  },
  ingText: { color: '#ccc', fontSize: 14, flex: 1 },
  stepRow: {
    flexDirection: 'row',
    backgroundColor: '#1e1e35',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5a623',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumText: { color: '#1a1a2e', fontSize: 13, fontWeight: '800' },
  stepText: { color: '#ccc', fontSize: 14, flex: 1, lineHeight: 21 },
  btnRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 26,
    gap: 12,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5a623',
    borderRadius: 14,
    paddingVertical: 15,
    gap: 6,
  },
  editBtnText: { color: '#1a1a2e', fontSize: 15, fontWeight: '800' },
  delBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    borderRadius: 14,
    paddingVertical: 15,
    gap: 6,
  },
  delBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
