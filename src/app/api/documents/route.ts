import { NextResponse } from 'next/server';

const mockDocuments = [
  { id: "1", title: "HEAL_INDIA_OPERATIONS_MANUAL.md", category: "Operations Manual", size: "90KB", uploadDate: "2026-06-01", type: "MD" },
  { id: "2", title: "EMAIL_TEMPLATES_HOSPITAL_OUTREACH.md", category: "Email Templates", size: "21KB", uploadDate: "2026-06-01", type: "MD" },
  { id: "3", title: "WHATSAPP_MESSAGE_TEMPLATES.md", category: "WhatsApp Scripts", size: "42KB", uploadDate: "2026-06-01", type: "MD" },
  { id: "4", title: "Ayush Prana Partnership Agreement", category: "Ayurveda", size: "245KB", uploadDate: "2026-06-15", type: "PDF" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let documents = [...mockDocuments];

  if (category) documents = documents.filter(d => d.category === category);
  if (search) documents = documents.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  return NextResponse.json({ documents, total: documents.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newDoc = { id: Date.now().toString(), ...body };
  return NextResponse.json({ document: newDoc }, { status: 201 });
}