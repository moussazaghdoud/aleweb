type Column = { name: string; id?: string }
type Row = {
  feature: string
  values?: { value: string; id?: string }[] | null
  id?: string
}

type Props = {
  heading?: string | null
  columns?: Column[] | null
  rows?: Row[] | null
}

export function ComparisonTableBlock({ heading, columns, rows }: Props) {
  if (!columns?.length || !rows?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1320px] px-6">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-8">
            {heading}
          </h2>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 pr-6 font-semibold text-text">Feature</th>
                {columns.map((col) => (
                  <th key={col.id ?? col.name} className="text-left py-4 px-4 font-semibold text-text">
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id ?? row.feature} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 pr-6 font-medium text-text">{row.feature}</td>
                  {row.values?.map((val, i) => (
                    <td key={val.id ?? i} className="py-3 px-4 text-text-secondary">
                      {val.value === 'true' ? (
                        <span className="text-green-600 font-bold">&#10003;</span>
                      ) : val.value === 'false' ? (
                        <span className="text-gray-300">&mdash;</span>
                      ) : (
                        val.value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
