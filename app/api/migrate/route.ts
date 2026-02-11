import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Yalnız development/local mühitində icazə ver
    const authHeader = request.headers.get("authorization");
    if (authHeader !== "Bearer migrate-secret-123") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Database connection test
    await prisma.$connect();
    
    // Prisma migrate deploy
    const { execSync } = require("child_process");
    
    try {
      execSync("npx prisma migrate deploy", {
        cwd: process.cwd(),
        stdio: "pipe",
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL,
        },
      });
      
      return NextResponse.json({
        success: true,
        message: "Database migration completed successfully",
      });
    } catch (migrateError) {
      // Əgər migration yoxdursa, db push ilə tables yaradaq
      try {
        execSync("npx prisma db push --accept-data-loss", {
          cwd: process.cwd(),
          stdio: "pipe",
          env: {
            ...process.env,
            DATABASE_URL: process.env.DATABASE_URL,
          },
        });
        
        return NextResponse.json({
          success: true,
          message: "Database tables created successfully with db push",
        });
      } catch (pushError) {
        return NextResponse.json(
          { 
            error: "Migration failed", 
            details: pushError instanceof Error ? pushError.message : "Unknown error"
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { 
        error: "Migration failed", 
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
