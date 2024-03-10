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
import { useState } from "react";

export function Modal({
  children,
  meal,
  onSave,
  onEdit,
  day,
}: {
  children: React.ReactNode;
  meal?: Meal;
  onSave?: (formData: Meal) => Promise<SavedMeal>;
  onEdit?: (mealId: string, formData: Meal) => Promise<EditedMeal>;
  day: Day;
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
            <label htmlFor="image" className="block text-gray-300">
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
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
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients ?? ""}
              placeholder="Milk, Egg, Yeast ..."
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md text-gray-700"
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
