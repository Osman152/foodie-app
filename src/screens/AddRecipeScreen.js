import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, Image, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRecipes, CATEGORIES } from '../context/RecipeContext';

const RECIPE_CATS = CATEGORIES.filter((c) => c !== 'All');
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function AddRecipeScreen({ navigation }) {
  const { addMyRecipe } = useRecipes();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Dinner');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  const pickImage = async () => {
    try {
      const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permResult.granted) {
        Alert.alert('Permission Required', 'Please allow photo library access in Settings.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not open photo library.');
    }
  };

  const setIng = (text, i) => { const a = [...ingredients]; a[i] = text; setIngredients(a); };
  const addIng = () => setIngredients((p) => [...p, '']);
  const removeIng = (i) => { if (ingredients.length > 1) setIngredients((p) => p.filter((_, idx) => idx !== i)); };

  const setStep = (text, i) => { const a = [...instructions]; a[i] = text; setInstructions(a); };
  const addStep = () => setInstructions((p) => [...p, '']);
  const removeStep = (i) => { if (instructions.length > 1) setInstructions((p) => p.filter((_, idx) => idx !== i)); };

  const handleSave = () => {
    if (!name.trim()) { Alert.alert('Missing', 'Please enter a recipe name.'); return; }
    const ings = ingredients.filter((i) => i.trim());
    const steps = instructions.filter((i) => i.trim());
    if (!ings.length || !steps.length) {
      Alert.alert('Missing', 'Please add at least one ingredient and one step.');
      return;
    }
    addMyRecipe({
      name: name.trim(),
      image: image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400',
      category,
      prepTime: prepTime ? `${prepTime} min` : 'N/A',
      servings: servings ? parseInt(servings, 10) : 2,
      calories: calories ? parseInt(calories, 10) : 0,
      difficulty,
      ingredients: ings,
      instructions: steps,
    });
    Alert.alert('Saved!', `"${name.trim()}" added to My Recipes.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Recipe</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.imgPicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imgPreview} />
          ) : (
            <View style={styles.imgPlaceholder}>
              <Ionicons name="camera-outline" size={38} color="#444" />
              <Text style={styles.imgPlaceholderText}>Tap to upload photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Recipe Name *</Text>
        <TextInput style={styles.input} placeholder="e.g. Grandma's Pasta" placeholderTextColor="#444" value={name} onChangeText={setName} />

        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
          {RECIPE_CATS.map((c) => (
            <TouchableOpacity key={c} style={[styles.chip, category === c && styles.chipActive]} onPress={() => setCategory(c)}>
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.label}>Prep Time (min)</Text>
            <TextInput style={styles.input} placeholder="30" placeholderTextColor="#444" keyboardType="numeric" value={prepTime} onChangeText={setPrepTime} />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Servings</Text>
            <TextInput style={styles.input} placeholder="4" placeholderTextColor="#444" keyboardType="numeric" value={servings} onChangeText={setServings} />
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.label}>Calories</Text>
            <TextInput style={styles.input} placeholder="400" placeholderTextColor="#444" keyboardType="numeric" value={calories} onChangeText={setCalories} />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.diffRow}>
              {DIFFICULTIES.map((d) => (
                <TouchableOpacity key={d} style={[styles.diffChip, difficulty === d && styles.diffChipActive]} onPress={() => setDifficulty(d)}>
                  <Text style={[styles.diffText, difficulty === d && styles.diffTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.label}>Ingredients *</Text>
        {ingredients.map((val, i) => (
          <View key={i} style={styles.listRow}>
            <TextInput style={[styles.input, styles.listInput]} placeholder={`Ingredient ${i + 1}`} placeholderTextColor="#444" value={val} onChangeText={(t) => setIng(t, i)} />
            <TouchableOpacity onPress={() => removeIng(i)} style={styles.removeBtn}>
              <Ionicons name="remove-circle" size={22} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addRow} onPress={addIng}>
          <Ionicons name="add-circle-outline" size={18} color="#f5a623" />
          <Text style={styles.addRowText}>Add Ingredient</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Step-by-Step Instructions *</Text>
        {instructions.map((val, i) => (
          <View key={i} style={styles.listRow}>
            <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{i + 1}</Text></View>
            <TextInput style={[styles.input, styles.listInput]} placeholder={`Step ${i + 1}`} placeholderTextColor="#444" value={val} onChangeText={(t) => setStep(t, i)} multiline />
            <TouchableOpacity onPress={() => removeStep(i)} style={styles.removeBtn}>
              <Ionicons name="remove-circle" size={22} color="#e74c3c" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addRow} onPress={addStep}>
          <Ionicons name="add-circle-outline" size={18} color="#f5a623" />
          <Text style={styles.addRowText}>Add Step</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="checkmark-circle" size={22} color="#1a1a2e" />
          <Text style={styles.saveBtnText}>Save Recipe</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  backBtn: { backgroundColor: '#1e1e35', borderRadius: 10, padding: 8 },
  title: { color: '#fff', fontSize: 20, fontWeight: '800' },
  form: { paddingHorizontal: 20 },
  imgPicker: { height: 190, backgroundColor: '#1e1e35', borderRadius: 16, overflow: 'hidden', marginBottom: 4 },
  imgPreview: { width: '100%', height: '100%' },
  imgPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  imgPlaceholderText: { color: '#555', fontSize: 14 },
  label: { color: '#aaa', fontSize: 12, fontWeight: '700', marginTop: 16, marginBottom: 7, letterSpacing: 0.4 },
  input: { backgroundColor: '#1e1e35', color: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: Platform.OS === 'ios' ? 13 : 10, fontSize: 14, borderWidth: 1, borderColor: '#252540' },
  catRow: { gap: 8, paddingBottom: 2 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1e1e35', borderWidth: 1, borderColor: '#252540' },
  chipActive: { backgroundColor: '#f5a623', borderColor: '#f5a623' },
  chipText: { color: '#777', fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: '#1a1a2e' },
  twoCol: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  diffRow: { flexDirection: 'row', gap: 5 },
  diffChip: { flex: 1, paddingVertical: Platform.OS === 'ios' ? 13 : 10, borderRadius: 10, backgroundColor: '#1e1e35', alignItems: 'center', borderWidth: 1, borderColor: '#252540' },
  diffChipActive: { backgroundColor: '#f5a623', borderColor: '#f5a623' },
  diffText: { color: '#777', fontSize: 11, fontWeight: '700' },
  diffTextActive: { color: '#1a1a2e' },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  listInput: { flex: 1 },
  removeBtn: { padding: 2 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#1e1e35', borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, marginBottom: 2, borderWidth: 1, borderColor: '#252540', borderStyle: 'dashed' },
  addRowText: { color: '#f5a623', fontSize: 13, fontWeight: '600' },
  stepBadge: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#f5a623', justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  stepBadgeText: { color: '#1a1a2e', fontSize: 12, fontWeight: '800' },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5a623', borderRadius: 16, paddingVertical: 16, marginTop: 26, gap: 8 },
  saveBtnText: { color: '#1a1a2e', fontSize: 17, fontWeight: '800' },
});
