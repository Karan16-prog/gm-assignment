"use client";
import React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Modal({
  children,
  meal,
  onSave,
}: {
  children: React.ReactNode;
  meal?: Meal;
  onSave: (meal: Meal) => void;
}) {
  const [formData, setFormData] = useState<Meal>(
    meal || { name: "", image: "", description: "", ingredients: "" }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 p-4 flex flex-col">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-300">
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-300">
              Ingredients:
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              placeholder="Milk, Egg, Yeast ..."
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 max-auto rounded hover:bg-blue-600"
          >
            {meal ? "Update Meal" : "Add Meal"}
          </button>
        </form>

        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild>
            <button>Close</button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface Meal {
  name: string;
  image?: string;
  description?: string;
  ingredients?: string;
}

interface WeekList {
  [key: string]: Meal[];
}

const weekList: WeekList = {
  Sunday: [
    {
      name: "Sunday Breakfast",
      image: "breakfast.jpg",
      description: "Scrambled eggs with toast",
      ingredients: "",
    },
    {
      name: "Sunday Lunch",
      image: "lunch.jpg",
      description: "Grilled chicken salad",
      ingredients: "",
    },
    {
      name: "Sunday Dinner",
      image: "dinner.jpg",
      description: "Spaghetti Bolognese",
      ingredients: "",
    },
  ],
  Monday: [
    {
      name: "Monday Breakfast",
      image: "breakfast.jpg",
      description: "Oatmeal with fruits",
      ingredients: "",
    },
  ],
  Tuesday: [
    {
      name: "Tuesday Breakfast",
      image: "breakfast.jpg",
      description: "Smoothie bowl",
      ingredients: "",
    },
    {
      name: "Tuesday Lunch",
      image: "lunch.jpg",
      description: "Quinoa salad",
      ingredients: "",
    },
    {
      name: "Tuesday Dinner",
      image: "dinner.jpg",
      description: "Taco night",
      ingredients: "",
    },
  ],
  Wednesday: [
    {
      name: "Wednesday Breakfast",
      image: "breakfast.jpg",
      description: "Avocado toast",
      ingredients: "",
    },
    {
      name: "Wednesday Lunch",
      image: "lunch.jpg",
      description: "Sushi rolls",
      ingredients: "",
    },
    {
      name: "Wednesday Dinner",
      image: "dinner.jpg",
      description: "Chicken curry with naan bread",
      ingredients: "",
    },
  ],
  Thursday: [
    {
      name: "Thursday Breakfast",
      image: "breakfast.jpg",
      description: "Pancakes with syrup",
      ingredients: "",
    },
    {
      name: "Thursday Lunch",
      image: "lunch.jpg",
      description: "Caprese salad",
      ingredients: "",
    },
    {
      name: "Thursday Dinner",
      image: "dinner.jpg",
      description: "Pasta primavera",
      ingredients: "",
    },
  ],
  Friday: [
    {
      name: "Friday Breakfast",
      image: "breakfast.jpg",
      description: "French toast with berries",
      ingredients: "",
    },
    {
      name: "Friday Lunch",
      image: "lunch.jpg",
      description: "Miso soup with tofu",
      ingredients: "",
    },
    {
      name: "Friday Dinner",
      image: "dinner.jpg",
      description: "BBQ ribs with coleslaw",
      ingredients: "",
    },
  ],
  Saturday: [
    {
      name: "Saturday Breakfast",
      image: "breakfast.jpg",
      description: "Bagel with cream cheese",
      ingredients: "",
    },
    {
      name: "Saturday Lunch",
      image: "lunch.jpg",
      description: "Greek salad",
      ingredients: "",
    },
    {
      name: "Saturday Dinner",
      image: "dinner.jpg",
      description: "Steak with mashed potatoes",
      ingredients: "",
    },
  ],
};

interface Props {
  meals: [string, Meal[]];
  onClick: () => void;
}

const Card: React.FC<Props> = ({ meals, onClick }) => {
  return (
    <div className="relative bg-white rounded-lg p-4 shadow-md min-h-40 md:min-h-48 lg:min-h-56 xl:min-h-64 2xl:min-h-72 transition-colors duration-300 hover:bg-gray-200">
      <div className="flex flex-col h-full">
        <h2 className="text-lg text-gray-700 font-semibold mb-2">{meals[0]}</h2>
        <div className="flex-1 overflow-y-auto">
          {meals[1].map((meal, index) => (
            <Modal key={index} meal={meal} onSave={() => 2 + 2}>
              <div
                key={index}
                className="mb-2 border rounded-2xl p-2 cursor-pointer bg-slate-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm text-gray-600 font-medium">
                    {meal.name}
                  </h3>
                  {/* {meal.image && (
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-8 h-8 rounded-full"
                  />
                )} */}
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
        <Modal
          onSave={() => {
            2 + 2;
          }}
        >
          <button
            className="mt-2 text-gray-700 text-2xl self-end"
            onClick={onClick}
          >
            +
          </button>
        </Modal>
      </div>
    </div>
  );
};
const CardGrid = () => {
  const [data, setData] = useState(weekList);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {Object.entries(data).map((ele, index) => (
          <div key={index}>
            <Card meals={ele} onClick={() => 2 + 2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
