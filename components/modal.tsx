"use client";
import { Day, EditedMeal, Meal, SavedMeal } from "@/app/interface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { fetchIngredients } from "@/app/actions";

export function Modal({
  children,
  meal,
  onSave,
  onEdit,
  day,
  ingData,
}: {
  children: React.ReactNode;
  meal?: Meal;
  onSave?: (formData: Meal) => Promise<SavedMeal>;
  onEdit?: (mealId: string, formData: Meal) => Promise<EditedMeal>;
  day: Day;
  ingData: {
    id: string;
    name: string;
    userId: string;
  }[];
}) {
  const [formData, setFormData] = useState<Meal>(
    meal || {
      name: "",
      imageUrl: "",
      description: "",
      ingredients: "",
      day: day,
      // id: "",
    }
  );
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      if (onSave) {
        const resp = await onSave(formData);
        if (resp.id) {
          setOpen(false);
        }
      } else if (onEdit && meal?.id) {
        const resp = await onEdit(meal?.id, formData);
        if (resp.id) {
          setOpen(false);
        }
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <label htmlFor="imageUrl" className="block text-gray-300">
              Image URL:
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl ?? ""}
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
              value={formData.description ?? ""}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-300">
              Ingredients:
            </label>
            {/* <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients ?? ""}
              placeholder="Milk, Egg, Yeast ..."
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
              // onFocus={}
            /> */}
            <IngredientDropdown
              ingData={ingData}
              ingredientsValue={formData.ingredients}
              onIngredientsChange={(value) =>
                setFormData({ ...formData, ingredients: value })
              }
            />
          </div>{" "}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 max-auto rounded hover:bg-blue-600"
          >
            {isSubmitting
              ? `${meal ? "Updating Meal..." : "Adding Meal..."}`
              : `${meal ? "Update Meal" : "Add Meal"}`}
          </button>
        </form>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 2. need to display as a dropdown
// 3. on click, needs to append to the input

interface IngredientDropdownProps {
  ingData: { id: string; name: string; userId: string }[];
  ingredientsValue: any;
  onIngredientsChange: (value: string) => void;
}

const IngredientDropdown: React.FC<IngredientDropdownProps> = ({
  ingData,
  ingredientsValue,
  onIngredientsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIngredientClick = (ingredient: {
    id: string;
    name: string;
    userId: string;
  }) => {
    const newIngredients = ingredientsValue
      ? `${ingredientsValue}, ${ingredient.name}`
      : ingredient.name;
    onIngredientsChange(newIngredients);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="ingredients"
        name="ingredients"
        value={ingredientsValue}
        placeholder="Milk, Egg, Yeast ..."
        onChange={(e) => onIngredientsChange(e.target.value)}
        className="mt-1 p-2 w-full border rounded-md text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute z-10 w-full bg-white text-gray-700 rounded-md shadow-lg">
          {ingData.map((ingredient) => (
            <div
              key={ingredient.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleIngredientClick(ingredient)}
            >
              {ingredient.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
