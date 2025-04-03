import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");

  if (!role) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("role_service_codes")
    .select("service_code")
    .eq("role", role);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const services = data.map((item) => item.service_code);
  return NextResponse.json(services);
}
