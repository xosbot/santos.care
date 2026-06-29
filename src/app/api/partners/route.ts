import { NextResponse } from 'next/server';

const mockPartners = [
  { id: "1", name: "Aster Medcity", category: "hospital", contactPerson: "Dr. Prem Nair", phone: "+91 484 400 8000", email: "pren.nair@asterhospital.com", address: "Kochi, Kerala", agreementStatus: "signed", commissionRate: 5, totalPatientsReferred: 12, totalRevenue: 180000 },
  { id: "2", name: "Amrita Hospital", category: "hospital", contactPerson: "Dr. Sanjay Chand", phone: "+91 487 242 8000", email: "sanjay@amrita.edu", address: "Kochi, Kerala", agreementStatus: "signed", commissionRate: 4, totalPatientsReferred: 8, totalRevenue: 120000 },
  { id: "3", name: "Ayush Prana", category: "ayurveda", contactPerson: "Dr. Manu Nair", phone: "+91 484 274 1234", email: "info@ayushprana.com", address: "Kochi, Kerala", agreementStatus: "signed", commissionRate: 10, totalPatientsReferred: 15, totalRevenue: 45000 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let partners = [...mockPartners];

  if (category) partners = partners.filter(p => p.category === category);
  if (search) partners = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return NextResponse.json({ partners, total: partners.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newPartner = { id: Date.now().toString(), ...body };
  return NextResponse.json({ partner: newPartner }, { status: 201 });
}