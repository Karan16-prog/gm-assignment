export interface Meal {
  id?: string;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
  ingredients?: string | null;
  day: Day;
}
export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface WeekList {
  Monday: Meal[];
  Tuesday: Meal[];
  Wednesday: Meal[];
  Thursday: Meal[];
  Friday: Meal[];
  Saturday: Meal[];
  Sunday: Meal[];
}

export const weekList: WeekList = {
  Sunday: [
    // {
    //   name: "Sunday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "Scrambled eggs with toast",
    //   ingredients: "",
    //   day: "Sunday",
    // },
    // {
    //   name: "Sunday Lunch",
    //   image: "lunch.jpg",
    //   description: "Grilled chicken salad",
    //   ingredients: "",
    //   day: "Sunday",
    // },
    // {
    //   name: "Sunday Dinner",
    //   image: "dinner.jpg",
    //   description: "Spaghetti Bolognese",
    //   ingredients: "",
    //   day: "Sunday",
    // },
  ],
  Monday: [
    // {
    //   name: "Monday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "Oatmeal with fruits",
    //   ingredients: "",
    //   day: "Monday",
    // },
  ],
  Tuesday: [
    // {
    //   name: "Tuesday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "Smoothie bowl",
    //   ingredients: "",
    //   day: "Tuesday",
    // },
  ],
  Wednesday: [
    // {
    //   name: "Wednesday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "Avocado toast",
    //   ingredients: "",
    //   day: "Wednesday",
    // },
    // {
    //   name: "Wednesday Lunch",
    //   image: "lunch.jpg",
    //   description: "Sushi rolls",
    //   ingredients: "",
    //   day: "Wednesday",
    // },
    // {
    //   name: "Wednesday Dinner",
    //   image: "dinner.jpg",
    //   description: "Chicken curry with naan bread",
    //   ingredients: "",
    //   day: "Wednesday",
    // },
  ],
  Thursday: [
    // {
    //   name: "Thursday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "Pancakes with syrup",
    //   ingredients: "",
    //   day: "Thursday",
    // },
    // {
    //   name: "Thursday Lunch",
    //   image: "lunch.jpg",
    //   description: "Caprese salad",
    //   ingredients: "",
    //   day: "Thursday",
    // },
    // {
    //   name: "Thursday Dinner",
    //   image: "dinner.jpg",
    //   description: "Pasta primavera",
    //   ingredients: "",
    //   day: "Thursday",
    // },
  ],
  Friday: [
    // {
    //   name: "Friday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "French toast with berries",
    //   ingredients: "",
    //   day: "Friday",
    // },
    // {
    //   name: "Friday Lunch",
    //   image: "lunch.jpg",
    //   description: "Miso soup with tofu",
    //   ingredients: "",
    //   day: "Friday",
    // },
    // {
    //   name: "Friday Dinner",
    //   image: "dinner.jpg",
    //   description: "BBQ ribs with coleslaw",
    //   ingredients: "",
    //   day: "Friday",
    // },
  ],
  Saturday: [
    // {
    //   name: "Saturday Breakfast",
    //   image: "breakfast.jpg",
    //   description: "Bagel with cream cheese",
    //   ingredients: "",
    //   day: "Saturday",
    // },
    // {
    //   name: "Saturday Lunch",
    //   image: "lunch.jpg",
    //   description: "Greek salad",
    //   ingredients: "",
    //   day: "Saturday",
    // },
    // {
    //   name: "Saturday Dinner",
    //   image: "dinner.jpg",
    //   description: "Steak with mashed potatoes",
    //   ingredients: "",
    //   day: "Saturday",
    // },
  ],
};

export type SavedMeal = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  date: Date;
  userId: string;
  day: string;
  ingredients: {
    id: number;
    mealId: string;
    ingredientId: number;
  }[];
};

export type EditedMeal = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  date: Date;
  userId: string;
  day: string;
  ingredients: {
    id: number;
    mealId: string;
    ingredientId: number;
  }[];
};
