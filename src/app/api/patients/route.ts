import { NextResponse } from 'next/server';

const mockPatients = [
  { id: "1", ref: "HIMT-2026-0042", name: "James Mwangi", country: "Kenya", phone: "+254 712 345 678", email: "james.mwangi@email.com", treatment: "Hip Replacement", stage: "CONFIRMATION", coordinator: "Priya Sharma", estimatedCost: 12500, inquiryDate: "2026-06-20" },
  { id: "2", ref: "HIMT-2026-0041", name: "Fatima Al-Hassan", country: "UAE", phone: "+971 50 123 4567", email: "fatima.h@email.com", treatment: "Cardiac Bypass", stage: "VISA_TRAVEL", coordinator: "Rahul Kumar", estimatedCost: 18000, inquiryDate: "2026-06-18" },
];

export async function GET(request: Request) {
  return NextResponse.json({ patients: mockPatients, total: mockPatients.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newPatient = { id: Date.now().toString(), ...body };
  return NextResponse.json({ patient: newPatient }, { status: 201 });
}