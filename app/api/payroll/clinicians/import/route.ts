import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const WEEK = '2025-W12' // Puedes hacer esto dinámico si lo necesitas

export async function POST(req: Request) {
  const body = await req.json()
  const rows = body.data || []

  const inserted: string[] = []
  const notFound: string[] = []

  // Obtener todas las tarifas de servicios
  const { data: serviceRates } = await supabase
    .from('clinician_service_rates')
    .select('service_name, rate')

  for (const row of rows) {
    const name = row.name?.trim()
    if (!name) continue

    // Buscar al empleado
    const { data: employees } = await supabase
      .from('employees')
      .select('id')
      .ilike('full_name', `%${name}%`)

    if (!employees || employees.length !== 1) {
      notFound.push(name)
      continue
    }

    const employee = employees[0]

    // Calcular total a partir de servicios y sus tarifas
    const serviceFields = [
      'it_hours',
      'bio_hours',
      'tp_hours',
      'intake_hours',
      'in_depth_bio',
      'in_depth_intake',
      'in_depth_existing',
      'tp_review_count'
    ]

    let total = 0
    for (const field of serviceFields) {
      const units = parseFloat(row[field]) || 0
      const label = field
        .replace('_hours', '')
        .replace('_count', '')
        .replace(/_/g, ' ')
        .toUpperCase()

      const match = serviceRates?.find((s) => s.service_name.toUpperCase() === label)
      const rate = match?.rate || 0

      total += units * rate
    }

    // Insertar en payroll_clinicians_raw
    const result = await supabase.from('payroll_clinicians_raw').insert({
      name,
      employee_id: employee.id,
      it_hours: row.it_hours,
      bio_hours: row.bio_hours,
      tp_hours: row.tp_hours,
      intake_hours: row.intake_hours,
      in_depth_bio: row.in_depth_bio,
      in_depth_intake: row.in_depth_intake,
      in_depth_existing: row.in_depth_existing,
      tp_review_count: row.tp_review_count,
      total,
      week: WEEK,
      payment_status: 'pending'
    })

    if (!result.error) {
      inserted.push(name)
    }
  }

  return NextResponse.json({
    message: `✅ ${inserted.length} insertados. ⚠️ ${notFound.length} no encontrados.`,
    inserted,
    notFound
  })
}