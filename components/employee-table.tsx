"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import type { Employee } from "@/app/employees/page";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
    console.log("logging for debugging ",employees);
  if (employees.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center">
          <p className="text-muted-foreground">No employees found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">position</TableHead>
              <TableHead className="text-right w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {employee.id}
                </TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {employee.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {employee.position}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(employee)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {employee.name}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(employee.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {employee.name}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
