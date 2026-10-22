
import { useEffect, useState } from 'react'

const formularioInicial = {
  identificacion: '',
  nombre: '',
  correo: '',
}

function Registro({ onCantidadUsuariosChange }) {
  const [usuarios, setUsuarios] = useState([])
  const [formulario, setFormulario] = useState(formularioInicial)
  const [identificacionEditando, setIdentificacionEditando] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const editando = identificacionEditando !== null

  useEffect(() => {
    onCantidadUsuariosChange?.(usuarios.length)
  }, [usuarios, onCantidadUsuariosChange])

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }))

    setMensaje(null)
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial)
    setIdentificacionEditando(null)
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const identificacion = formulario.identificacion.trim()
    const nombre = formulario.nombre.trim()
    const correo = formulario.correo.trim()

    if (!identificacion || !nombre || !correo) {
      setMensaje({
        tipo: 'error',
        texto: 'Todos los campos son obligatorios.',
      })
      return
    }

    if (!/^\d+$/.test(identificacion)) {
      setMensaje({
        tipo: 'error',
        texto: 'La identificación debe contener solamente números.',
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setMensaje({
        tipo: 'error',
        texto: 'Escribe un correo electrónico válido.',
      })
      return
    }

    const identificacionDuplicada = usuarios.some(
      (usuario) =>
        usuario.identificacion === identificacion &&
        usuario.identificacion !== identificacionEditando,
    )

    if (identificacionDuplicada) {
      setMensaje({
        tipo: 'error',
        texto: `Ya existe un usuario con la identificación ${identificacion}.`,
      })
      return
    }

    if (editando) {
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.identificacion === identificacionEditando
            ? { identificacion, nombre, correo }
            : usuario,
        ),
      )

      setMensaje({
        tipo: 'exito',
        texto: 'Los datos del usuario se actualizaron correctamente.',
      })
    } else {
      setUsuarios((actuales) => [
        ...actuales,
        { identificacion, nombre, correo },
      ])

      setMensaje({
        tipo: 'exito',
        texto: 'Usuario registrado correctamente.',
      })
    }

    limpiarFormulario()
  }

  function editarUsuario(usuario) {
    setFormulario({
      identificacion: usuario.identificacion,
      nombre: usuario.nombre,
      correo: usuario.correo,
    })

    setIdentificacionEditando(usuario.identificacion)
    setMensaje(null)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function eliminarUsuario(identificacion) {
    const confirmado = window.confirm(
      `¿Estás seguro de eliminar al usuario con identificación ${identificacion}?`,
    )

    if (!confirmado) {
      return
    }

    setUsuarios((actuales) =>
      actuales.filter(
        (usuario) => usuario.identificacion !== identificacion,
      ),
    )

    if (identificacionEditando === identificacion) {
      limpiarFormulario()
    }

    setMensaje({
      tipo: 'exito',
      texto: 'Usuario eliminado correctamente.',
    })
  }

  function cancelarEdicion() {
    limpiarFormulario()
    setMensaje({
      tipo: 'exito',
      texto: 'Se canceló la edición del usuario.',
    })
  }

  return (
    <main className="pagina-contenido registro-pagina">
      <section className="encabezado-pagina">
        <p className="texto-etiqueta">GESTIÓN DE USUARIOS</p>
        <h1>Registro de usuarios</h1>
        <p>
          Registra y administra los usuarios de tu aplicación Pokédex.
        </p>
      </section>

      <section className="registro-panel">
        <h2>{editando ? 'Editar usuario' : 'Registrar usuario'}</h2>

        <p className="registro-descripcion">
          Completa los tres campos para {editando ? 'actualizar' : 'registrar'}{' '}
          un usuario.
        </p>

        {mensaje && (
          <div
            className={`mensaje-registro mensaje-${mensaje.tipo}`}
            role="status"
            aria-live="polite"
          >
            {mensaje.texto}
          </div>
        )}

        <form className="formulario-registro" onSubmit={manejarEnvio}>
          <div className="campo-registro">
            <label htmlFor="identificacion">Identificación</label>
            <input
              id="identificacion"
              name="identificacion"
              type="text"
              inputMode="numeric"
              value={formulario.identificacion}
              onChange={manejarCambio}
              placeholder="Ej. 1234567890"
              autoComplete="off"
            />
          </div>

          <div className="campo-registro">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Escribe el nombre"
              autoComplete="name"
            />
          </div>

          <div className="campo-registro">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              placeholder="usuario@correo.com"
              autoComplete="email"
            />
          </div>

          <div className="acciones-formulario">
            <button type="submit" className="boton-principal">
              {editando ? 'Guardar cambios' : 'Registrar'}
            </button>

            {editando && (
              <button
                type="button"
                className="boton-secundario"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="usuarios-panel">
        <div className="usuarios-encabezado">
          <div>
            <h2>Usuarios registrados</h2>
            <p>Listado de usuarios creados durante esta sesión.</p>
          </div>

          <span className="usuarios-total">
            Total: {usuarios.length}
          </span>
        </div>

        {usuarios.length === 0 ? (
          <div className="usuarios-vacios">
            <span className="usuarios-vacios-icono">♙</span>
            <h3>Aún no hay usuarios registrados</h3>
            <p>Utiliza el formulario para agregar el primero.</p>
          </div>
        ) : (
          <div className="tabla-contenedor">
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.identificacion}>
                    <td data-label="Identificación">
                      {usuario.identificacion}
                    </td>
                    <td data-label="Nombre">{usuario.nombre}</td>
                    <td data-label="Correo">{usuario.correo}</td>
                    <td data-label="Acciones">
                      <div className="acciones-usuario">
                        <button
                          type="button"
                          className="boton-editar"
                          onClick={() => editarUsuario(usuario)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className="boton-eliminar"
                          onClick={() =>
                            eliminarUsuario(usuario.identificacion)
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default Registro
