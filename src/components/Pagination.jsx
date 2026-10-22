
function Pagination({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) {
    return null
  }

  const paginasVisibles = []
  const inicio = Math.max(1, paginaActual - 2)
  const fin = Math.min(totalPaginas, paginaActual + 2)

  for (let pagina = inicio; pagina <= fin; pagina++) {
    paginasVisibles.push(pagina)
  }

  return (
    <nav className="paginacion" aria-label="Paginación del catálogo">
      <button
        type="button"
        onClick={() => onCambiarPagina(1)}
        disabled={paginaActual === 1}
        aria-label="Primera página"
      >
        «
      </button>

      <button
        type="button"
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        aria-label="Página anterior"
      >
        ‹ Anterior
      </button>

      {inicio > 1 && <span className="paginacion-puntos">…</span>}

      {paginasVisibles.map((pagina) => (
        <button
          key={pagina}
          type="button"
          onClick={() => onCambiarPagina(pagina)}
          className={pagina === paginaActual ? 'pagina-activa' : ''}
          aria-current={pagina === paginaActual ? 'page' : undefined}
        >
          {pagina}
        </button>
      ))}

      {fin < totalPaginas && (
        <span className="paginacion-puntos">…</span>
      )}

      <button
        type="button"
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        aria-label="Página siguiente"
      >
        Siguiente ›
      </button>

      <button
        type="button"
        onClick={() => onCambiarPagina(totalPaginas)}
        disabled={paginaActual === totalPaginas}
        aria-label="Última página"
      >
        »
      </button>
    </nav>
  )
}

export default Pagination
