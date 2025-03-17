import { supabase } from '@/shared/supabaseClient';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Helper function to get Anura fraud score
async function getAnuraScore(ip: string, userAgent: string): Promise<number> {
  try {
    const response = await fetch("https://api.anura.io/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, userAgent }),
    });

    const result = await response.json();
    return result.score ?? 0; // Default to 0 if no score is returned
  } catch (error) {
    console.error("Anura API Error:", error);
    return 0;
  }
}

// GET: Fetch all records
export async function GET() {
  const { data, error } = await supabase.from('reports').select('*');
  return Response.json(error ? { error: error.message } : data);
}

// POST: Insert new record with tracking
export async function POST(req: NextRequest) {
  try {
    const { name, subid, time_till_click, ip, market_code, userAgent } = await req.json();

    if (!name || !subid || !ip || !market_code || !userAgent) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch Anura fraud score
    const anuraScore = await getAnuraScore(ip, userAgent);

    // Insert into Supabase
    const { data, error } = await supabase.from('reports').insert([
      {
        name,
        subid,
        time_till_click,
        client_ip: ip,
        market_code,
        userAgent,
        anura_score: anuraScore,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (error: any) {
    console.error("Supabase Insert Error:", error);
    return Response.json({ error: error.message || "Failed to insert data" }, { status: 500 });
  }
}
