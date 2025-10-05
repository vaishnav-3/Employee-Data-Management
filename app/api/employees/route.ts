import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ================================
// GET /api/employees
// ================================
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" }, // latest first
    });
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

// ================================
// POST /api/employees
// ================================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, position } = body;

    if (!name || !email || !position) {
      return NextResponse.json(
        { error: "All fields (name, email, position) are required" },
        { status: 400 }
      );
    }

    // Check manually before inserting (better UX)
    const existingEmployee = await prisma.employee.findUnique({
      where: { email },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 } // Conflict
      );
    }

    const newEmployee = await prisma.employee.create({
      data: { name, email, position },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);

    // ✅ Type-safe Prisma error handling
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
