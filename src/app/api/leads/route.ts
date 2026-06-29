import { NextResponse } from 'next/server';

const mockLeads = [
  { id: "1", name: "David Kimani", country: "Kenya", email: "david.k@email.com", phone: "+254 700 111 222", source: "WhatsApp", treatmentInterest: "Hip Replacement", budgetRange: "$10,000-$15,000", status: "qualified", createdAt: "2026-06-25" },
  { id: "2", name: "Sarah Oduya", country: "Nigeria", email: "sarah.o@email.com", phone: "+234 800 222 333", source: "Website", treatmentInterest: "Cardiac Bypass", budgetRange: "$15,000-$20,000", status: "new", createdAt: "2026-06-27" },
  { id: "3", name: "Michael Brown", country: "UK", email: "m.brown@email.com", phone: "+44 7700 900123", source: "Google Ads", treatmentInterest: "Knee Replacement", budgetRange: "$12,000-$18,000", status: "contacted", createdAt: "2026-06-20" },
  { id: "4", name: "Blessing Adeyemi", country: "Ghana", email: "b.adeyemi@email.com", phone: "+233 200 333 444", source: "Facebook", treatmentInterest: "MS Treatment", budgetRange: "$15,000-$25,000", status: "qualified", createdAt: "2026-06-15" },
  { id: "5", name: "Emma Watson", country: "Germany", email: "emma.w@email.com", phone: "+49 160 444 555", source: "Referral", treatmentInterest: "Spine Surgery", budgetRange: "$20,000-$30,000", status: "converted", createdAt: "2026-05-10" },
  { id: "6", name: "James Ochieng", country: "Kenya", email: "james.o@email.com", phone: "+254 711 444 555", source: "WhatsApp", treatmentInterest: "Ayurveda", budgetRange: "$5,000-$8,000", status: "new", createdAt: "2026-06-28" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let leads = [...mockLeads];

  if (source) leads = leads.filter(l => l.source.toLowerCase() === source.toLowerCase());
  if (status) leads = leads.filter(l => l.status.toLowerCase() === status.toLowerCase());
  if (search) leads = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  return NextResponse.json({ leads, total: leads.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newLead = {
    id: (mockLeads.length + 1).toString(),
    ...body,
    createdAt: new Date().toISOString().split('T')[0],
  };
  return NextResponse.json({ lead: newLead }, { status: 201 });
}