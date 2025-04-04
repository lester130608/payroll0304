import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const role = searchParams.get("role")

  if (!role) {
    return NextResponse.json([], { status: 200 })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  )

  const { data, error } = await supabase
    .from("role_service_codes")
    .select("service_code")
    .eq("role", role)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const services = data.map((item) => item.service_code)
  return NextResponse.json(services)
}