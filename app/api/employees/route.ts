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

    const newEmployee = await prisma.employee.create({
      data: { name, email, position },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error: any) {
    console.error("Error creating employee:", error);

    // Handle unique email error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}
