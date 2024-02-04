-- CreateTable
CREATE TABLE "PathData" (
    "pathToken" TEXT NOT NULL,
    "pathReach" TEXT NOT NULL,

    CONSTRAINT "PathData_pkey" PRIMARY KEY ("pathToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "PathData_pathToken_key" ON "PathData"("pathToken");
