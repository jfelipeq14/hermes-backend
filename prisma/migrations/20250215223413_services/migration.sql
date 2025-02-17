-- CreateTable
CREATE TABLE "municipalities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoryServices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categoryServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "idCategoryServices" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "idActivity" INTEGER NOT NULL,
    "level" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "reserve" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detailPackagesServices" (
    "id" SERIAL NOT NULL,
    "idPackage" INTEGER NOT NULL,
    "idService" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "detailPackagesServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dates" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "startRegistration" TIMESTAMP(3) NOT NULL,
    "endRegistration" TIMESTAMP(3) NOT NULL,
    "idPackage" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "idDate" INTEGER NOT NULL,
    "idMunicipality" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_name_key" ON "municipalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categoryServices_name_key" ON "categoryServices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "activities_name_key" ON "activities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dates_idUser_idPackage_key" ON "dates"("idUser", "idPackage");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_idCategoryServices_fkey" FOREIGN KEY ("idCategoryServices") REFERENCES "categoryServices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_idActivity_fkey" FOREIGN KEY ("idActivity") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailPackagesServices" ADD CONSTRAINT "detailPackagesServices_idPackage_fkey" FOREIGN KEY ("idPackage") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailPackagesServices" ADD CONSTRAINT "detailPackagesServices_idService_fkey" FOREIGN KEY ("idService") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates" ADD CONSTRAINT "dates_idPackage_fkey" FOREIGN KEY ("idPackage") REFERENCES "packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dates" ADD CONSTRAINT "dates_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_idDate_fkey" FOREIGN KEY ("idDate") REFERENCES "dates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_idMunicipality_fkey" FOREIGN KEY ("idMunicipality") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
