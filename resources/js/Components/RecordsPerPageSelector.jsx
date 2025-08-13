export default function RecordsPerPageSelector({ recordsPerPage, onUpdate }) {
  function selectRpp(e) {
    const rpp = parseInt(e.target.value)
    onUpdate(rpp)
  }

  const vals = [5, 10, 25, 50, 100].map((v,k) => {
    return (
      <option value={ v } key={ k }>{ v }</option>
    )
  });

  return (
  <div className="flex flex-row justify-center pt-2 pr-4 sm:text-xs">
    <div className="text-sm mr-1">Registros por Página:</div>
    <div>
    <select className="text-sm" value={ recordsPerPage } onChange={ selectRpp }>
      { vals }
    </select>
    </div>
  </div>
  )
}