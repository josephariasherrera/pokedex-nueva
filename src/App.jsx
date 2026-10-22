
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Pokedex from './pages/Pokedex'
import Favoritos from './pages/Favoritos'
import Registro from './pages/Registro'
import DetallePokemon from './pages/DetallePokemon'
import NotFound from './pages/NotFound'

const CLAVE_FAVORITOS = 'pokedex-favoritos'

function leerFavoritos() {
  try {
    const datos = localStorage.getItem(CLAVE_FAVORITOS)
    const favoritos = datos ? JSON.parse(datos) : []

    if (!Array.isArray(favoritos)) {
      return []
    }

    return favoritos.filter(
      (id) => Number.isInteger(id) && id > 0,
    )
  } catch {
    return []
  }
}

function App() {
  const [favoritos, setFavoritos] = useState(leerFavoritos)
  const [cantidadUsuarios, setCantidadUsuarios] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(
        CLAVE_FAVORITOS,
        JSON.stringify(favoritos),
      )
    } catch {
      console.warn(
        'No fue posible guardar los favoritos en el navegador.',
      )
    }
  }, [favoritos])

  function alternarFavorito(id) {
    setFavoritos((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter(
          (favoritoId) => favoritoId !== id,
        )
      }

      return [...actuales, id]
    })
  }

  return (
    <div className="app">
      <Navbar
        cantidadFavoritos={favoritos.length}
        cantidadUsuarios={cantidadUsuarios}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/lista"
          element={
            <Pokedex
              favoritos={favoritos}
              onAlternarFavorito={alternarFavorito}
            />
          }
        />

        <Route
          path="/favoritos"
          element={
            <Favoritos
              favoritos={favoritos}
              onAlternarFavorito={alternarFavorito}
            />
          }
        />

        <Route
          path="/registro"
          element={
            <Registro
              onCantidadUsuariosChange={setCantidadUsuarios}
            />
          }
        />

        <Route
          path="/detalle/:id"
          element={
            <DetallePokemon
              favoritos={favoritos}
              onAlternarFavorito={alternarFavorito}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="footer">
        <p>
          <strong>Pokédex</strong> · Explora, descubre y colecciona Pokémon.
        </p>

        <p>
          API utilizada:{' '}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noreferrer"
          >
            PokéAPI
          </a>
          {' · '}
          <a
            href="https://pokeapi.co/docs/v2"
            target="_blank"
            rel="noreferrer"
          >
            Documentación oficial
          </a>
        </p>

        <p>Proyecto académico de Tecnologías Web · Unidad 2</p>
      </footer>
    </div>
  )
}

export default App
