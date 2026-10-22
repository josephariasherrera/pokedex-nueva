
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const nombresTipos = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
}

const nombresEstadisticas = {
  hp: 'Puntos de salud',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque especial',
  'special-defense': 'Defensa especial',
  speed: 'Velocidad',
}

function capitalizar(texto) {
  if (!texto) return ''
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function DetallePokemon({ favoritos = [], onAlternarFavorito = () => {} }) {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    async function cargarDetalle() {
      try {
        setCargando(true)
        setError('')
        setPokemon(null)

        const respuesta = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(id)}`,
          { signal: controlador.signal },
        )

        if (!respuesta.ok) {
          throw new Error('No encontramos ese Pokémon.')
        }

        const datos = await respuesta.json()
        setPokemon(datos)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'No fue posible cargar el Pokémon.')
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarDetalle()

    return () => controlador.abort()
  }, [id])

  if (cargando) {
    return (
      <main className="detalle-estado">
        <div className="carga-spinner"></div>
        <p>Cargando información del Pokémon...</p>
      </main>
    )
  }

  if (error || !pokemon) {
    return (
      <main className="detalle-estado">
        <h1>Pokémon no encontrado</h1>
        <p>{error || 'No pudimos encontrar ese Pokémon.'}</p>
        <Link to="/lista" className="boton-principal">
          Volver a la Pokédex
        </Link>
      </main>
    )
  }

  const imagen =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  const esFavorito = favoritos.includes(pokemon.id)

  return (
    <main className="pagina-detalle">
      <Link to="/lista" className="detalle-volver">
        ← Volver a la Pokédex
      </Link>

      <section className="detalle-panel">
        <div className="detalle-imagen-contenedor">
          <span className="detalle-numero">
            N.º {String(pokemon.id).padStart(3, '0')}
          </span>

          {imagen ? (
            <img
              src={imagen}
              alt={capitalizar(pokemon.name)}
              className="detalle-imagen"
            />
          ) : (
            <div className="detalle-sin-imagen">Sin imagen disponible</div>
          )}
        </div>

        <div className="detalle-informacion">
          <span className="seccion-etiqueta">FICHA DEL POKÉMON</span>
          <h1>{capitalizar(pokemon.name)}</h1>

          <div className="pokemon-tipos detalle-tipos">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className={`tipo tipo-${type.name}`}
              >
                {nombresTipos[type.name] || capitalizar(type.name)}
              </span>
            ))}
          </div>

          <button
            type="button"
            className={`boton-principal detalle-favorito ${
              esFavorito ? 'detalle-favorito-activo' : ''
            }`}
            onClick={() => onAlternarFavorito(pokemon.id)}
          >
            {esFavorito ? '♥ Quitar de favoritos' : '♡ Añadir a favoritos'}
          </button>

          <div className="detalle-medidas">
            <div>
              <span>Altura</span>
              <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
            </div>

            <div>
              <span>Peso</span>
              <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
            </div>

            <div>
              <span>Experiencia base</span>
              <strong>{pokemon.base_experience ?? 'No disponible'}</strong>
            </div>
          </div>

          <section className="detalle-subseccion">
            <h2>Habilidades</h2>
            <div className="detalle-habilidades">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span key={ability.name} className="detalle-habilidad">
                  {capitalizar(ability.name.replaceAll('-', ' '))}
                  {is_hidden ? ' (oculta)' : ''}
                </span>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="detalle-estadisticas">
        <h2>Estadísticas base</h2>
        <p className="detalle-estadisticas-descripcion">
          Comparación de los valores base de este Pokémon.
        </p>

        {pokemon.stats.map(({ base_stat, stat }) => (
          <div className="estadistica" key={stat.name}>
            <div className="estadistica-encabezado">
              <span>{nombresEstadisticas[stat.name] || stat.name}</span>
              <strong>{base_stat}</strong>
            </div>

            <div
              className="estadistica-fondo"
              role="progressbar"
              aria-label={nombresEstadisticas[stat.name] || stat.name}
              aria-valuemin={0}
              aria-valuemax={255}
              aria-valuenow={base_stat}
            >
              <div
                className="estadistica-valor"
                style={{
                  width: `${Math.min((base_stat / 255) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default DetallePokemon
