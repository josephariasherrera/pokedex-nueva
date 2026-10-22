
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'

function Favoritos({ favoritos = [], onAlternarFavorito = () => {} }) {
  const [pokemonFavoritos, setPokemonFavoritos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarFavoritos() {
      if (favoritos.length === 0) {
        setPokemonFavoritos([])
        setCargando(false)
        setError('')
        return
      }

      try {
        setCargando(true)
        setError('')

        const resultados = await Promise.all(
          favoritos.map(async (id) => {
            const respuesta = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`,
              { signal: controlador.signal },
            )

            if (!respuesta.ok) {
              throw new Error('No fue posible cargar tus favoritos.')
            }

            return respuesta.json()
          }),
        )

        setPokemonFavoritos(resultados)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(
            'No pudimos cargar tus favoritos. Revisa tu conexión e inténtalo de nuevo.',
          )
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarFavoritos()

    return () => controlador.abort()
  }, [favoritos])

  return (
    <main className="pagina-catalogo">
      <section className="catalogo-encabezado">
        <span className="seccion-etiqueta">TU COLECCIÓN PERSONAL</span>
        <h1>Mis favoritos <span aria-hidden="true">♥</span></h1>
        <p>
          Aquí encontrarás los Pokémon que hayas guardado en tu colección.
        </p>
      </section>

      {cargando && (
        <div className="estado-carga" role="status">
          <div className="carga-spinner"></div>
          <p>Cargando tus Pokémon favoritos...</p>
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

      {!cargando && !error && pokemonFavoritos.length === 0 && (
        <section className="estado-vacio">
          <span className="favoritos-vacio-icono" aria-hidden="true">♡</span>
          <h2>Tu colección está vacía</h2>
          <p>
            Explora la Pokédex y pulsa el corazón de tus Pokémon favoritos
            para guardarlos aquí.
          </p>
          <Link to="/lista" className="boton-principal">
            Explorar Pokémon →
          </Link>
        </section>
      )}

      {!cargando && !error && pokemonFavoritos.length > 0 && (
        <>
          <div className="catalogo-resumen">
            <p>
              {pokemonFavoritos.length}{' '}
              {pokemonFavoritos.length === 1
                ? 'Pokémon guardado'
                : 'Pokémon guardados'}
            </p>
          </div>

          <section className="pokemon-grid" aria-label="Pokémon favoritos">
            {pokemonFavoritos.map((elemento) => (
              <PokemonCard
                key={elemento.id}
                pokemon={elemento}
                esFavorito={favoritos.includes(elemento.id)}
                onAlternarFavorito={onAlternarFavorito}
              />
            ))}
          </section>
        </>
      )}
    </main>
  )
}

export default Favoritos
