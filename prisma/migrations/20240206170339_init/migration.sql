-- CreateTable
CREATE TABLE "LiquidityPool" (
    "pool_address" TEXT NOT NULL,
    "token0_address" TEXT NOT NULL,
    "token1_address" TEXT NOT NULL,
    "token0_reserve" TEXT NOT NULL,
    "token1_reserve" TEXT NOT NULL,

    CONSTRAINT "LiquidityPool_pkey" PRIMARY KEY ("pool_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiquidityPool_pool_address_key" ON "LiquidityPool"("pool_address");
