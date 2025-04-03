import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ASSESSMENT_RATE = 370
const REASSESSMENT_RATE = 290
const WEEK = '2025-W12'

export async function POST(req: Request) {
  const body = await req.json()
  const rows = body.data || []

  const inserted: any[] = []
  const notFound: string[] = []

  for (const row of rows) {
      console.log("Buscando:", row.name)
    const { data: employees } = await supabase
  .from('employees')
  .select('id, rate')
  .ilike('full_name', `%${row.name.trim()}%`)

    if (!employees || employees.length !== 1) {
      notFound.push(row.name)
      continue
    }

    const employee = employees[0]
    const rate = parseFloat(employee.rate) || 0
    const total =
      rate * row.hours +
      row.assessment * ASSESSMENT_RATE +
      row.reassessment * REASSESSMENT_RATE

    const result = await supabase.from('payroll_ba_raw').insert({
      name: row.name,
      employee_id: employee.id,
      hours: row.hours,
      assessment: row.assessment,
      reassessment: row.reassessment,
      rate,
      total,
      week: WEEK,
      payment_status: 'pending'
    })

    if (!result.error) inserted.push(row.name)
  }

  return NextResponse.json({
    message: `✅ ${inserted.length} insertados. ⚠️ ${notFound.length} no encontrados.`,
    inserted,
    notFound
  })
}