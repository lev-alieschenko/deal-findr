import { supabase } from '@/shared/supabaseClient';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Helper function to get Anura fraud score
async function getAnuraScore(ip: string, userAgent: string): Promise<number> {
    try {
        const response = await fetch("https://api.anura.io/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ip, userAgent })
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
    const { name, price, subid, timeTillClick, ip, userAgent } = await req.json();

    // Fetch Anura fraud score
    const anuraScore = await getAnuraScore(ip, userAgent);

    // Insert into Supabase
    const { data, error } = await supabase.from('reports').insert([
        { name, price, subid, timeTillClick, anuraScore }
    ]);

    return Response.json(error ? { error: error.message } : data);
}
