
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="pagina-404">
      <div className="error-404-ilustracion" aria-hidden="true">
        <span>4</span>
        <span className="error-404-pokebola">◉</span>
        <span>4</span>
      </div>

      <span className="seccion-etiqueta">RUTA NO ENCONTRADA</span>

      <h1>¡Ups! Te perdiste en el mundo Pokémon</h1>

      <p>
        Parece que esta página no existe o que la dirección que escribiste
        no es correcta.
      </p>

      <Link to="/" className="boton-principal">
        Volver al inicio →
      </Link>
    </main>
  )
}

export default NotFound
