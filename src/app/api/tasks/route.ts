import { NextResponse } from 'next/server';

const mockTasks = [
  { id: "1", title: "Follow up with James Mwangi", description: "Confirm travel dates and visa status", type: "patient", patientRef: "HIMT-2026-0042", assignedTo: "Priya Sharma", dueDate: "2026-06-29", priority: "high", status: "pending" },
  { id: "2", title: "Send treatment plan to Anna Schmidt", description: "Include cost breakdown and hospital options", type: "patient", patientRef: "HIMT-2026-0043", assignedTo: "Rahul Kumar", dueDate: "2026-06-30", priority: "medium", status: "pending" },
];

export async function GET(request: Request) {
  return NextResponse.json({ tasks: mockTasks, total: mockTasks.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = { id: Date.now().toString(), ...body };
  return NextResponse.json({ task: newTask }, { status: 201 });
}