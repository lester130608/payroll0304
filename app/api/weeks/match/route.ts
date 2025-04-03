import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { date } = await req.json()

  if (!date) {
    return NextResponse.json({ error: "Missing date." }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('payroll_weeks')
    .select('week_code')
    .lte('start_date', date)
    .gte('end_date', date)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "No matching week found." }, { status: 404 })
  }

  return NextResponse.json({ week_code: data.week_code })
}