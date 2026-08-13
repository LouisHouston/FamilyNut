import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


type Meal = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  servings: number;
};


const meals: Meal[] = [
  {
    id: 1 ,
    name: 'Chicken Rice Bowl',
    description: 'Seasoned chicken, rice, broccoli, and avocado.',
    calories: 620,
    protein: 48,
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
  },
  {
    id: '2',
    name: 'Turkey Pasta',
    description: 'Ground turkey, pasta, tomato sauce, and parmesan.',
    calories: 710,
    protein: 42,
    imageUrl:
      'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800',
  },
  {
    id: '3',
    name: 'Greek Yogurt Bowl',
    description: 'Greek yogurt, strawberries, granola, and honey.',
    calories: 390,
    protein: 28,
    imageUrl:
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800',
  },
];

export default function MenuScreen() {
  const [searchText, setSearchText] = useState('');
  const [mealData, setMealData] = useState<Meal[]>(meals);

  const filteredMeals = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return meals;
    }

    return meals.filter((meal) => {
      return (
        meal.name.toLowerCase().includes(normalizedSearch) ||
        meal.description.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchText]);

  function handleMealPress(meal: Meal) {
    console.log('Selected meal:', meal.name);
  }

  return (
    <ThemedView style={styles.container}>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search meals..."
        placeholderTextColor="#888"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchInput}
      />
      <ThemedText type="subtitle" style={styles.TitleSection}>
        Available Meals
      </ThemedText>
      <FlatList
        data={filteredMeals}
        keyExtractor={(meal) => meal.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={function (): void {
            throw new Error('Function not implemented.');
          } } />
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyContainer  }>
            No meals found.
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

type MealCardProps = {
  meal: Meal;
  onPress: () => void;
};

function MealCard({ meal, onPress }: MealCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Image source={{ uri: meal.image_url }} style={styles.mealImage} />

      <View style={styles.cardContent}>
        <ThemedText type="subtitle">{meal.name}</ThemedText>

        <ThemedText style={styles.description}>
          {meal.description}
        </ThemedText>

        <View style={styles.nutritionRow}>
          <ThemedText style={styles.nutritionText}>
            {meal.calories} calories
          </ThemedText>

          <ThemedText style={styles.nutritionText}>
            {meal.protein}g protein
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  searchInput: {
    height: 48,
    marginTop: 18,
    marginBottom: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 14,
    backgroundColor: '#6f5050',
    color: '#111111',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 30,
    gap: 14,
  },
  card: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 18,
    backgroundColor: '#3e5831',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  mealImage: {
    width: '100%',
    height: 170,
    backgroundColor: '#E8E8E8',
  },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  description: {
    opacity: 0.7,
    lineHeight: 20,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  nutritionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  TitleSection: {
    paddingBottom: 10,
  }
});