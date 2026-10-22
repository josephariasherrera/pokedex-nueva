
# Pokédex - Explorador de Pokémon

## 1. Descripción del proyecto

Pokédex es una aplicación web desarrollada con React y Vite que permite explorar información de Pokémon. Los usuarios pueden consultar el catálogo, buscar Pokémon por nombre, filtrar por tipo, navegar entre páginas, consultar detalles y guardar sus Pokémon favoritos.

La aplicación también incluye un módulo de registro de usuarios con funciones para registrar, listar, editar y eliminar registros.

## 2. Tecnologías utilizadas

- React
- JavaScript
- Vite
- React Router DOM
- CSS
- PokéAPI
- Git y GitHub
- GitHub Pages

## 3. API utilizada

**Nombre:** PokéAPI

**URL base:** https://pokeapi.co/api/v2

**Documentación oficial:** https://pokeapi.co/docs/v2

La API es pública y permite consultar información de Pokémon sin necesidad de una clave de acceso.

### Endpoints utilizados

- `GET /pokemon?limit=20&offset=0`: consulta un listado de Pokémon.
- `GET /pokemon/{id o nombre}`: obtiene la información de un Pokémon específico.
- `GET /type`: permite consultar los tipos disponibles, si se utiliza para el filtro.

## 4. Funcionalidades

- Página de inicio con presentación de la aplicación.
- Catálogo de Pokémon obtenido desde PokéAPI.
- Búsqueda por nombre.
- Filtro por tipo.
- Paginación del catálogo.
- Página de detalle de cada Pokémon.
- Sistema para agregar y quitar favoritos.
- Persistencia de favoritos mediante `localStorage`.
- Registro, consulta, edición y eliminación de usuarios.
- Validación de identificación, nombre, correo e identificaciones duplicadas.
- Navegación entre pantallas mediante React Router.
- Diseño adaptable a diferentes tamaños de pantalla.
- Página de error 404 para rutas inexistentes.

## 5. Estructura del proyecto

```text
pokedex-nueva/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PokemonCard.jsx
│   │   └── Pagination.jsx
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Pokedex.jsx
│   │   ├── Favoritos.jsx
│   │   ├── Registro.jsx
│   │   ├── DetallePokemon.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 6. Instalación y ejecución local

Requisitos previos: Node.js y npm instalados.

Clonar el repositorio:

```bash
git clone https://github.com/josephariasherrera/pokedex-nueva.git
```

Entrar en la carpeta:

```bash
cd pokedex-nueva
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## 7. Repositorio y despliegue

**Repositorio:**  
https://github.com/josephariasherrera/pokedex-nueva

**Aplicación publicada:**  
https://josephariasherrera.github.io/pokedex-nueva/

## 8. Capturas de pantalla

Agregar en esta sección capturas reales de la aplicación que muestren:

- Página de inicio.
- Catálogo y filtros.
- Detalle de un Pokémon.
- Lista de favoritos.
- Registro y administración de usuarios.

## 9. Integrantes

- Joseph Arias Herrera
- Agregar los nombres de los demás integrantes, si corresponde.

## 10. Consideraciones

Los Pokémon se consultan mediante PokéAPI. Los favoritos se conservan en el navegador utilizando `localStorage`. Los usuarios registrados se mantienen en el estado de React durante la sesión y se pierden al recargar la aplicación.
