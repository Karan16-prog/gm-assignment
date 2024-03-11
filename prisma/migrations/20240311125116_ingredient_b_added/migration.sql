-- CreateTable
CREATE TABLE "IngredientB" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IngredientB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IngredientB_name_key" ON "IngredientB"("name");

-- AddForeignKey
ALTER TABLE "IngredientB" ADD CONSTRAINT "IngredientB_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
