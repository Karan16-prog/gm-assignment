# Meal Planner App

    This is a Meal Planner App built with Next.js App Router, Supabase, TailwindCSS, TypeScript, Shadcn and Prisma. It allows users to plan their meals for different days of the week.

## Project Structure

    The project follows the Next.js app directory structure.

    1. Page.tsx and its layout file layout.tsx would be the entry point
    2. login/page.tsx is the login page, and similarly for profile following the Next js naming convention standards
    3. error.tsx is the global error boundary file
    4. auth/callback/route.ts - api route for creates. On success, will create a new user
    5. actions.ts contains server actions. These directly manipulate db entries without needting to write API Endpoints
    6. components contains shadcn and other components
    7. interface.ts contains all the types and interfaces 8. utils contains prisma and supabase server & client instances

## To Run

    1. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, DATABASE_URL & DIRECT_URL to the env file
    2. Run npm install
    3. Run npm run dev

## Assumptions

    1. For Ingredients, while creating a meal, we have another optional form field where user can enter ingredients
    2. While creating a meal or editing a meal, these ingredients are first created (if they dont exist in db) & then the meal is created
