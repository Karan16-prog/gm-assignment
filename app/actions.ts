"use server";
import { prisma } from "@/utils/prisma/prisma";
import { Prisma } from "@prisma/client";
import { Meal, SavedMeal } from "./interface";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { User } from "@supabase/supabase-js";

export const onSaveMeal = async (formData: Meal) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const ingredientNames =
      formData.ingredients
        ?.split(", ")
        .map((ingredient) => ingredient.trim()) || [];

    const createdIngredients = await Promise.all(
      ingredientNames.map(async (name) => {
        const existingIngredient = await prisma.ingredient.findFirst({
          where: { name },
        });

        if (existingIngredient) {
          return existingIngredient;
        }

        return prisma.ingredient.create({
          data: { name },
        });
      })
    );

    const ingredientIds = createdIngredients.map((ingredient) => ({
      ingredientId: ingredient.id,
    }));
    console.log(user);
    const createdMeal = await prisma.meal.create({
      data: {
        userId: user?.id,
        ...formData,
        date: new Date(),
        ingredients: {
          createMany: {
            data: ingredientIds,
          },
        },
      } as Prisma.MealUncheckedCreateInput,
      include: {
        ingredients: true,
      },
    });
    revalidatePath("/");
    return createdMeal;
  } catch (error) {
    throw new Error("Meal could not be created: " + error);
  }
};

export const onEditMeal = async (mealId: string, formData: Meal) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const ingredientNames =
      formData.ingredients
        ?.split(", ")
        .map((ingredient) => ingredient.trim()) || [];

    const createdIngredients = await Promise.all(
      ingredientNames.map(async (name) => {
        const existingIngredient = await prisma.ingredient.findFirst({
          where: { name },
        });

        if (existingIngredient) {
          return existingIngredient;
        }

        return prisma.ingredient.create({
          data: { name },
        });
      })
    );

    const ingredientIds = createdIngredients.map((ingredient) => ({
      ingredientId: ingredient.id,
    }));

    const updatedMeal = await prisma.meal.update({
      where: { id: mealId },
      data: {
        ...formData,
        ingredients: {
          deleteMany: {},
          createMany: {
            data: ingredientIds,
          },
        },
      },
      include: {
        ingredients: true,
      },
    });
    revalidatePath("/");
    return updatedMeal;
  } catch (error) {
    throw new Error("Meal could not be created: " + error);
  }
};

export const fetchMeals = async (user: User) => {
  try {
    const meals = await prisma.meal.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return meals;
  } catch (error) {
    throw new Error("Meal could not be fetched: " + error); // Throw an erro
  }
};
