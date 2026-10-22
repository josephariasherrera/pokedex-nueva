
import { useEffect, useMemo, useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import Pagination from '../components/Pagination'

const POKEMON_POR_PAGINA = 12

const tiposPokemon = [
  { valor: 'all', nombre: 'Todos los tipos' },
  { valor: 'normal', nombre: 'Normal' },
  { valor: 'fire', nombre: 'Fuego' },
  { valor: 'water', nombre: 'Agua' },
  { valor: 'electric', nombre: 'Eléctrico' },
  { valor: 'grass', nombre: 'Planta' },
  { valor: 'ice', nombre: 'Hielo' },
  { valor: 'fighting', nombre: 'Lucha' },
  { valor: 'poison', nombre: 'Veneno' },
  { valor: 'ground', nombre: 'Tierra' },
  { valor: 'flying', nombre: 'Volador' },
  { valor: 'psychic', nombre: 'Psíquico' },
  { valor: 'bug', nombre: 'Bicho' },
  { valor: 'rock', nombre: 'Roca' },
  { valor: 'ghost', nombre: 'Fantasma' },
  { valor: 'dragon', nombre: 'Dragón' },
  { valor: 'dark', nombre: 'Siniestro' },
  { valor: 'steel', nombre: 'Acero' },
  { valor: 'fairy', nombre: 'Hada' },
]

function Pokedex({ favoritos = [], onAlternarFavorito = () => {} }) {
  const [pokemon, setPokemon] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [tipoSeleccionado, setTipoSeleccionado] = useState('all')
  const [paginaActual, setPaginaActual] = useState(1)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarPokemon() {
      try {
        setCargando(true)
        setError('')

        const respuesta = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1025',
          { signal: controlador.signal },
        )

        if (!respuesta.ok) {
          throw new Error('No fue posible consultar la PokéAPI.')
        }

        const datos = await respuesta.json()

        const resultados = await Promise.all(
          datos.results.map(async (elemento) => {
            const respuestaPokemon = await fetch(elemento.url, {
              signal: controlador.signal,
            })

            if (!respuestaPokemon.ok) {
              throw new Error('No fue posible cargar todos los Pokémon.')
            }

            return respuestaPokemon.json()
          }),
        )

        setPokemon(resultados)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            'No pudimos cargar los Pokémon. Revisa tu conexión e inténtalo de nuevo.',
          )
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarPokemon()

    return () => controlador.abort()
  }, [])

  const pokemonFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    return pokemon.filter((elemento) => {
      const coincideNombre = elemento.name.toLowerCase().includes(termino)
      const coincideTipo =
        tipoSeleccionado === 'all' ||
        elemento.types.some(({ type }) => type.name === tipoSeleccionado)

      return coincideNombre && coincideTipo
    })
  }, [pokemon, busqueda, tipoSeleccionado])

  const totalPaginas = Math.ceil(
    pokemonFiltrados.length / POKEMON_POR_PAGINA,
  )

  const pokemonVisibles = pokemonFiltrados.slice(
    (paginaActual - 1) * POKEMON_POR_PAGINA,
    paginaActual * POKEMON_POR_PAGINA,
  )

  function cambiarBusqueda(valor) {
    setBusqueda(valor)
    setPaginaActual(1)
  }

  function cambiarTipo(valor) {
    setTipoSeleccionado(valor)
    setPaginaActual(1)
  }

  function cambiarPagina(pagina) {
    setPaginaActual(pagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="pagina-catalogo">
      <section className="catalogo-encabezado">
        <span className="seccion-etiqueta">ENCICLOPEDIA POKÉMON</span>
        <h1>Explora la Pokédex</h1>
        <p>
          Encuentra tu Pokémon favorito, descubre sus tipos y crea tu propia
          colección.
        </p>
      </section>

      <section className="catalogo-controles" aria-label="Buscar Pokémon">
        <label className="campo-busqueda">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => cambiarBusqueda(evento.target.value)}
            placeholder="Buscar Pokémon por nombre..."
            aria-label="Buscar Pokémon por nombre"
          />
        </label>

        <label className="campo-tipo">
          <span className="campo-tipo-etiqueta">Tipo</span>
          <select
            value={tipoSeleccionado}
            onChange={(evento) => cambiarTipo(evento.target.value)}
            aria-label="Filtrar por tipo de Pokémon"
          >
            {tiposPokemon.map((tipo) => (
              <option key={tipo.valor} value={tipo.valor}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </label>
      </section>

      <div className="catalogo-resumen">
        <p>
          {cargando
            ? 'Cargando catálogo...'
            : `${pokemonFiltrados.length} Pokémon encontrados`}
        </p>
        <p>
          ♥ {favoritos.length} {favoritos.length === 1 ? 'favorito' : 'favoritos'}
        </p>
      </div>

      {cargando && (
        <div className="estado-carga" role="status">
          <div className="carga-spinner"></div>
          <p>Cargando Pokémon, esto puede tardar un momento...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="estado-error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="boton-principal"
            onClick={() => window.location.reload()}
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {!cargando && !error && pokemonFiltrados.length === 0 && (
        <div className="estado-vacio">
          <span aria-hidden="true">🔎</span>
          <h2>No encontramos Pokémon</h2>
          <p>Prueba con otro nombre o selecciona un tipo diferente.</p>
          <button
            type="button"
            className="boton-secundario"
            onClick={() => {
              cambiarBusqueda('')
              cambiarTipo('all')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {!cargando && !error && pokemonVisibles.length > 0 && (
        <>
          <section className="pokemon-grid" aria-label="Lista de Pokémon">
            {pokemonVisibles.map((elemento) => (
              <PokemonCard
                key={elemento.id}
                pokemon={elemento}
                esFavorito={favoritos.includes(elemento.id)}
                onAlternarFavorito={onAlternarFavorito}
              />
            ))}
          </section>

          <Pagination
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={cambiarPagina}
          />
        </>
      )}
    </main>
  )
}

export default Pokedex
