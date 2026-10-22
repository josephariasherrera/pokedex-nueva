
import { NavLink } from 'react-router-dom'

function Navbar({ cantidadFavoritos = 0 }) {
  const enlaces = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Pokédex', ruta: '/lista' },
    { texto: 'Favoritos', ruta: '/favoritos' },
    { texto: 'Registro', ruta: '/registro' },
  ]

  return (
    <header className="navbar">
      <NavLink to="/" className="logo-pokedex">
        <span className="logo-icono">◉</span>
        <span>Pokédex</span>
      </NavLink>

      <nav className="navbar-enlaces" aria-label="Navegación principal">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.ruta}
            to={enlace.ruta}
            end={enlace.ruta === '/'}
            className={({ isActive }) =>
              `navbar-enlace ${isActive ? 'activo' : ''}`
            }
          >
            {enlace.texto}
            {enlace.ruta === '/favoritos' && (
              <span className="navbar-contador">{cantidadFavoritos}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar

