
import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <main className="inicio">
      <section className="inicio-hero">
        <div className="inicio-contenido">
          <span className="inicio-etiqueta">
            TU AVENTURA COMIENZA AQUÍ
          </span>

          <h1>
            Descubre el mundo
            <span> Pokémon</span>
          </h1>

          <p className="inicio-descripcion">
            Explora cientos de Pokémon, conoce sus tipos y habilidades,
            descubre sus estadísticas y guarda tus favoritos en tu propia
            Pokédex.
          </p>

          <div className="inicio-acciones">
            <Link to="/lista" className="boton-principal">
              Explorar Pokédex
              <span aria-hidden="true"> →</span>
            </Link>

            <Link to="/favoritos" className="boton-secundario">
              Ver favoritos
            </Link>
          </div>

          <div className="inicio-datos">
            <div className="inicio-dato">
              <strong>1000+</strong>
              <span>Pokémon por descubrir</span>
            </div>

            <div className="inicio-dato">
              <strong>18</strong>
              <span>Tipos diferentes</span>
            </div>

            <div className="inicio-dato">
              <strong>Tu equipo</strong>
              <span>Favoritos personalizados</span>
            </div>
          </div>
        </div>

        <div className="inicio-ilustracion" aria-hidden="true">
          <div className="circulo-decorativo circulo-grande"></div>
          <div className="circulo-decorativo circulo-pequeno"></div>

          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt=""
            className="inicio-pikachu"
          />

          <span className="inicio-estrella estrella-uno">✦</span>
          <span className="inicio-estrella estrella-dos">✧</span>
          <span className="inicio-estrella estrella-tres">✦</span>
        </div>
      </section>

      <section className="inicio-caracteristicas">
        <article className="caracteristica">
          <div className="caracteristica-icono">🔎</div>
          <h2>Explora</h2>
          <p>
            Busca Pokémon por nombre y descubre sus características.
          </p>
        </article>

        <article className="caracteristica">
          <div className="caracteristica-icono">⚡</div>
          <h2>Conoce sus tipos</h2>
          <p>
            Identifica sus tipos, habilidades y estadísticas principales.
          </p>
        </article>

        <article className="caracteristica">
          <div className="caracteristica-icono">♥</div>
          <h2>Guarda favoritos</h2>
          <p>
            Crea tu colección personal con los Pokémon que más te gusten.
          </p>
        </article>
      </section>
    </main>
  )
}

export default Inicio
