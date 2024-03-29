import { fetchMeals, onEditMeal, onSaveMeal } from "@/app/actions";
import { Day, Meal } from "@/app/interface";
import { Modal } from "./modal";

interface Props {
  meals: [Day, Meal[]];
  ingData: {
    id: string;
    name: string;
    userId: string;
  }[];
}

const Card: React.FC<Props> = ({ meals, ingData }) => {
  return (
    <div className="relative bg-white rounded-lg p-4 shadow-md min-h-40 md:min-h-48 lg:min-h-56 xl:min-h-64 2xl:min-h-72 transition-colors duration-300 hover:bg-gray-200">
      <div className="flex flex-col h-full">
        <h2 className="text-lg text-gray-700 font-semibold mb-2">{meals[0]}</h2>
        <div className="flex-1 overflow-y-auto">
          {meals[1].map((meal, index) => (
            <Modal
              key={index}
              meal={meal}
              day={meals[0]}
              onEdit={onEditMeal}
              ingData={ingData}
            >
              <div
                key={index}
                className="mb-2 border rounded-2xl p-2 cursor-pointer bg-gray-100 relative"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm text-gray-700 font-medium">
                    {meal.name}
                  </h3>
                  {meal.imageUrl && meal.imageUrl.slice(0, 4) === "http" && (
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>

                {meal.description && (
                  <p className="text-xs text-gray-500 overflow-hidden overflow-ellipsis line-clamp-3">
                    {meal.description}
                  </p>
                )}
              </div>
            </Modal>
          ))}
        </div>

        <Modal onSave={onSaveMeal} day={meals[0]} ingData={ingData}>
          <button className="absolute bottom-4 right-4 text-gray-700 text-4xl">
            +
          </button>
        </Modal>
      </div>
    </div>
  );
};

const CardGrid: React.FC<{
  mealsByDay: { [key: string]: Meal[] };
  ingData: {
    id: string;
    name: string;
    userId: string;
  }[];
}> = ({ mealsByDay, ingData }) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {(Object.entries(mealsByDay) as [Day, Meal[]][]).map(
          ([day, meals], index) => (
            <div key={index}>
              <Card meals={[day, meals]} ingData={ingData} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CardGrid;
