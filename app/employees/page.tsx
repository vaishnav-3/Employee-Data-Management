"use client";

import { useEffect, useState } from "react";
import { EmployeeTable } from "@/components/employee-table";
import { EmployeeDialog } from "@/components/employee-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
};

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  //Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employees");
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      toast.error("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add Employee (POST)
  const handleAddEmployee = async (employee: Omit<Employee, "id">) => {
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error("Failed to add employee");

      toast.success("Employee added successfully!");
      fetchEmployees();
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Error adding employee");
    }
  };

  // Edit Employee (PUT)
  const handleEditEmployee = async (updatedEmployee: Employee) => {
    try {
      const res = await fetch(`/api/employees/${updatedEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });
      if (!res.ok) throw new Error("Failed to update employee");

      toast.success("Employee updated successfully!");
      fetchEmployees();
      setIsDialogOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      toast.error("Error updating employee");
    }
  };

  // Delete Employee (DELETE)
  const handleDeleteEmployee = async (id: number) => {
    try {
      const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete employee");

      toast.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      toast.error("Error deleting employee");
    }
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingEmployee(null);
    setIsDialogOpen(true);
  };

  const handleSaveEmployee = async (
    employee: Employee | Omit<Employee, "id">
  ) => {
    if ("id" in employee) {
      await handleEditEmployee(employee);
    } else {
      await handleAddEmployee(employee);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              Employee Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your team members and their positions
            </p>
          </div>
          <Button onClick={openAddDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search employees by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={openEditDialog}
          onDelete={handleDeleteEmployee}
        />

        {/* Add/Edit Dialog */}
        <EmployeeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          employee={editingEmployee}
          onSave={handleSaveEmployee}
        />
      </div>
    </div>
  );
}
