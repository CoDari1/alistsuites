import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

export async function POST(request: Request) {
    try {
        const { tenant_id, suite_id, description } = await request.json();

        if (!tenant_id || !suite_id || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("maintenance_requests")
            .insert([{ tenant_id, suite_id, description }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}

