import FloatingMenu from "@/components/floatingMenu";
import CardGrid from "@/components/weekCards";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchMeals } from "./actions";
import { Meal, Day } from "./interface";
import IngredientsModal from "@/components/ingredientsModal";
import { fetchIngredients } from "./actions";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const meals = await fetchMeals(user);

  const mealsByDay: { [key: string]: Meal[] } = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  meals.forEach((meal) => {
    const { day } = meal;

    if (!mealsByDay[day]) {
      mealsByDay[day] = [];
    }

    mealsByDay[day].push({
      ...meal,
      day: meal.day as Day,
      ingredients: meal.ingredients
        .map((ingredient) => ingredient.ingredient.name)
        .join(", "),
    });
  });

  const ingData = await fetchIngredients();
  // useEffect(() => {
  //   console.log("TEST ");
  //   fetchData();
  // }, []);

  return (
    <div className="bg-background w-full min-h-screen px-5 sm:px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80 py-5">
      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-foreground font-bold mb-4">
        Meal Planner
      </h3>
      <IngredientsModal>
        <button>Add Ingredients</button>
      </IngredientsModal>
      <CardGrid mealsByDay={mealsByDay} ingData={ingData} />
      <div className="fixed bottom-0 right-0 p-4">
        <FloatingMenu />
      </div>
    </div>
  );
}
