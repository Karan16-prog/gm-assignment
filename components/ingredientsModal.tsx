"use client";
import React, { useState } from "react";
import { Day, EditedMeal, Meal, SavedMeal } from "@/app/interface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addIngredient } from "@/app/actions";

const IngredientsModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    // call server action here
    e.preventDefault();
    if (value.trim().length > 0) {
      const resp = await addIngredient(value);
      if (resp.id) {
        setOpen(false);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 p-4 flex flex-col">
          <label htmlFor="name" className="block text-gray-300">
            Ingredient:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={value}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 max-auto rounded hover:bg-blue-600"
          >
            Add Ingredient
          </button>
          {/* {errors.name && <span className="text-red-500">{errors.name}</span>} */}
        </form>

        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IngredientsModal;
