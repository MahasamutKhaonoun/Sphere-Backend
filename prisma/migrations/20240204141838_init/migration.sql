-- CreateTable
CREATE TABLE "Exchange_1" (
    "token0" TEXT NOT NULL,
    "token1" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "liquidity0" TEXT NOT NULL,
    "liquidity1" TEXT NOT NULL,

    CONSTRAINT "Exchange_1_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Exchange_2" (
    "token0" TEXT NOT NULL,
    "token1" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "liquidity0" TEXT NOT NULL,
    "liquidity1" TEXT NOT NULL,

    CONSTRAINT "Exchange_2_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_1_address_key" ON "Exchange_1"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_2_address_key" ON "Exchange_2"("address");
