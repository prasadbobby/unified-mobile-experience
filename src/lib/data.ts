import avatarEmma from "@/assets/avatar-emma.jpg";
import avatarRegina from "@/assets/avatar-regina.jpg";
import avatarAlex from "@/assets/avatar-alex.jpg";
import avatarMethew from "@/assets/avatar-methew.jpg";
import wStretch from "@/assets/workout-stretch.jpg";
import wPartner from "@/assets/workout-partner.jpg";
import wCore from "@/assets/workout-core.jpg";
import wRun from "@/assets/workout-run.jpg";
import wCurl from "@/assets/workout-curl.jpg";
import mBowl from "@/assets/meal-bowl.jpg";
import mSeafood from "@/assets/meal-seafood.jpg";
import mSalmon from "@/assets/meal-salmon.jpg";
import mVeg from "@/assets/meal-vegetarian.jpg";
import mProtein from "@/assets/meal-protein.jpg";
import mKeto from "@/assets/meal-keto.jpg";
import mPlatter from "@/assets/meal-platter.jpg";
import mYogurt from "@/assets/meal-yogurt.jpg";

export const avatars = { emma: avatarEmma, regina: avatarRegina, alex: avatarAlex, methew: avatarMethew };

export type Category = "warmup" | "cardio" | "strength";
export const workouts = [
  { id: "concentration-curl", title: "Concentration Curl", subtitle: "Seated Dumbbell", minutes: 15, category: "strength" as Category, image: wCurl,
    description: "Sit on a bench, lean forward, and rest your elbow against your inner thigh. Curl the dumbbell in a controlled motion, focusing on squeezing the bicep at the top. Avoid swinging and lower slowly to full extension." },
  { id: "stretch-flow", title: "Stretch & Flow", subtitle: "Mobility", minutes: 15, category: "warmup" as Category, image: wStretch,
    description: "A gentle flow of dynamic stretches that opens hips, shoulders and spine. Breathe deeply and move with control between each pose." },
  { id: "partner-power", title: "Partner Power", subtitle: "Bodyweight", minutes: 10, category: "cardio" as Category, image: wPartner,
    description: "Team up for synchronized squats, lunges and high-fives. Keep the pace high and motivate each other through every round." },
  { id: "core-blast", title: "Core Blast", subtitle: "Medicine Ball", minutes: 15, category: "strength" as Category, image: wCore,
    description: "Overhead slams, Russian twists and dead bugs to fire up your core. Brace your abs and keep your back neutral." },
  { id: "tempo-run", title: "Tempo Run", subtitle: "Treadmill", minutes: 20, category: "cardio" as Category, image: wRun,
    description: "Steady run at a comfortably hard pace. Warm up 3 minutes, hold tempo, and cool down gradually." },
];

export const meals = [
  { id: "power-bowl", title: "Power-packed Bowl", tag: "high-protein", image: mBowl, kcal: 520, protein: 42, carbs: 48, fat: 18, likes: 90, comments: 12,
    description: "Quinoa, avocado, grilled protein, and greens with a zesty lime dressing." },
  { id: "thai-seafood", title: "Spicy Thai Seafood Medley", tag: "seafood", image: mSeafood, kcal: 430, protein: 42, carbs: 12, fat: 27.5, likes: 64, comments: 12,
    description: "A fiery mix of shrimp, mussels, squid, and fresh veggies sautéed in Thai chili garlic sauce." },
  { id: "lemon-salmon", title: "Lemon-Herb Butter Salmon", tag: "seafood", image: mSalmon, kcal: 480, protein: 38, carbs: 6, fat: 30, likes: 120, comments: 8,
    description: "A pan-seared salmon steak bathed in zesty lemon-herb butter with crisp asparagus." },
  { id: "chickpea-salad", title: "Chickpea Garden Salad", tag: "vegetarian", image: mVeg, kcal: 360, protein: 16, carbs: 44, fat: 12, likes: 51, comments: 4,
    description: "Chickpeas, tomatoes, cucumber and feta tossed with olive oil and herbs." },
  { id: "salmon-noodles", title: "Salmon Noodle Bowl", tag: "high-protein", image: mProtein, kcal: 610, protein: 46, carbs: 58, fat: 20, likes: 77, comments: 9,
    description: "Glazed salmon over sesame noodles with broccoli and carrots." },
  { id: "keto-plate", title: "Keto Breakfast Plate", tag: "keto", image: mKeto, kcal: 540, protein: 24, carbs: 8, fat: 44, likes: 88, comments: 15,
    description: "Sunny egg, crispy bacon, avocado and roasted cherry tomatoes." },
  { id: "seafood-platter", title: "Oyster & Crab Platter", tag: "seafood", image: mPlatter, kcal: 390, protein: 40, carbs: 10, fat: 14, likes: 43, comments: 3,
    description: "Fresh oysters and king crab with cocktail sauce and lemon." },
  { id: "berry-yogurt", title: "Berry Yogurt Bowl", tag: "vegetarian", image: mYogurt, kcal: 290, protein: 18, carbs: 36, fat: 8, likes: 69, comments: 6,
    description: "Greek yogurt with mixed berries, nuts and chia seeds." },
];

export const mealCategories = [
  { id: "vegetarian", label: "Vegetarian", image: mVeg },
  { id: "seafood", label: "Seafood", image: mPlatter },
  { id: "high-protein", label: "High-protein", image: mProtein },
  { id: "keto", label: "Keto", image: mKeto },
];

export const leaderboard = {
  workout: [
    { name: "Regina Fly", avatar: avatarRegina, value: "2,3m" },
    { name: "Alex Freedman", avatar: avatarAlex, value: "1,8m" },
    { name: "Methew Apostol", avatar: avatarMethew, value: "1,2m" },
    { name: "Sara Kim", avatar: avatarEmma, value: "1,1m" },
  ],
  cooking: [
    { name: "Alex Freedman", avatar: avatarAlex, value: "842" },
    { name: "Regina Fly", avatar: avatarRegina, value: "790" },
    { name: "Methew Apostol", avatar: avatarMethew, value: "655" },
    { name: "Sara Kim", avatar: avatarEmma, value: "512" },
  ],
};
