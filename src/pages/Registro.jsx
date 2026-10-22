
import { useState } from 'react'

const CLAVE_USUARIOS = 'pokedex-usuarios'

function leerUsuarios() {
  try {
    const datos = localStorage.getItem(CLAVE_USUARIOS)
    return datos ? JSON.parse(datos) : []
  } catch {
    return []
  }
}

function Registro() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  function manejarRegistro(evento) {
    evento.preventDefault()
    setMensaje('')
    setTipoMensaje('')

    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim().toLowerCase()

    if (!nombreLimpio || !correoLimpio || !contrasena || !confirmacion) {
      setMensaje('Completa todos los campos.')
      setTipoMensaje('error')
      return
    }

    if (nombreLimpio.length < 2) {
      setMensaje('El nombre debe tener al menos 2 caracteres.')
      setTipoMensaje('error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      setMensaje('Escribe un correo electrónico válido.')
      setTipoMensaje('error')
      return
    }

    if (contrasena.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.')
      setTipoMensaje('error')
      return
    }

    if (contrasena !== confirmacion) {
      setMensaje('Las contraseñas no coinciden.')
      setTipoMensaje('error')
      return
    }

    const usuarios = leerUsuarios()

    if (usuarios.some((usuario) => usuario.correo === correoLimpio)) {
      setMensaje('Ya existe un registro con ese correo electrónico.')
      setTipoMensaje('error')
      return
    }

    const nuevoUsuario = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nombre: nombreLimpio,
      correo: correoLimpio,
      creadoEn: new Date().toISOString(),
    }

    try {
      /*
       * Esta demostración no guarda la contraseña.
       * El registro se almacena únicamente en este navegador.
       */
      localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify([...usuarios, nuevoUsuario]),
      )

      setNombre('')
      setCorreo('')
      setContrasena('')
      setConfirmacion('')
      setMensaje('¡Registro creado correctamente!')
      setTipoMensaje('exito')
    } catch {
      setMensaje('No fue posible guardar el registro en este navegador.')
      setTipoMensaje('error')
    }
  }

  return (
    <main className="pagina-registro">
      <section className="registro-panel">
        <div className="registro-presentacion">
          <span className="seccion-etiqueta">ÚNETE A LA AVENTURA</span>
          <h1>Crea tu cuenta Pokémon</h1>
          <p>
            Regístrate para comenzar a organizar tu experiencia en nuestra
            Pokédex.
          </p>

          <div className="registro-decoracion" aria-hidden="true">
            <span>◉</span>
            <span>✦</span>
            <span>⚡</span>
          </div>
        </div>

        <div className="registro-formulario-contenedor">
          <h2>Crear cuenta</h2>
          <p className="registro-subtitulo">
            Completa tus datos para registrarte.
          </p>

          <form className="registro-formulario" onSubmit={manejarRegistro}>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              maxLength={80}
              required
            />

            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(evento) => setCorreo(evento.target.value)}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
            />

            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(evento) => setContrasena(evento.target.value)}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label htmlFor="confirmacion">Confirmar contraseña</label>
            <input
              id="confirmacion"
              type="password"
              value={confirmacion}
              onChange={(evento) => setConfirmacion(evento.target.value)}
              placeholder="Escribe la contraseña nuevamente"
              autoComplete="new-password"
              minLength={8}
              required
            />

            {mensaje && (
              <p
                className={`registro-mensaje ${tipoMensaje}`}
                role={tipoMensaje === 'error' ? 'alert' : 'status'}
              >
                {mensaje}
              </p>
            )}

            <button type="submit" className="boton-principal registro-boton">
              Crear mi cuenta
            </button>
          </form>

          <p className="registro-nota">
            Esta versión es una demostración local, no un sistema de
            autenticación real.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Registro
