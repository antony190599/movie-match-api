# API de Movie Match

Una API RESTful para gestionar y recuperar datos de películas.

## Funcionalidades
- Obtener películas aleatorias.
- Filtrar películas por género, nombre o año.
- Obtener recomendaciones de películas.
- Documentación de la API con Swagger.
- Soporte de paginación para `/movies`.
- Validación de entradas utilizando `express-validator`.

## Instalación
1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea un archivo `.env` basado en `.env.example`.

## Uso
- Inicia el servidor: `npm start`.
- Accede a la documentación de la API: `http://localhost:3000/docs`.

## Endpoints de la API

### Endpoint Principal
#### `GET /`
Obtiene una película aleatoria de la base de datos.

- **Encabezados**:  
  `x-api-key` (requerido): Clave API para autenticación.
- **Respuesta**:  
  Devuelve un objeto de película aleatoria.
- **Códigos de Estado**:  
  - `200 OK`: Película aleatoria obtenida exitosamente.
  - `401 Unauthorized`: Clave API inválida o ausente.

---

### Endpoints de Películas
#### `GET /movies`
Obtiene una lista de películas con filtros opcionales y paginación.

- **Encabezados**:  
  `x-api-key` (requerido): Clave API para autenticación.
- **Parámetros de Consulta**:  
  - `genre` (opcional): Filtrar por género (por ejemplo, "Drama").  
  - `name` (opcional): Filtrar por título de la película (por ejemplo, "Inception").  
  - `year` (opcional): Filtrar por año de lanzamiento (por ejemplo, 1994).  
  - `limit` (opcional): Número de películas por página (por defecto: 10).  
  - `cursor` (opcional): Cursor para paginación (por ejemplo, "tt0384001").
- **Respuesta**:  
  Devuelve una lista paginada de películas que coinciden con los filtros.
- **Códigos de Estado**:  
  - `200 OK`: Películas obtenidas exitosamente.  
  - `404 Not Found`: No se encontraron películas que coincidan con los filtros.  
  - `401 Unauthorized`: Clave API inválida o ausente.

---

#### `GET /movies/:idOrName`
Obtiene una película específica por su ID único o nombre.

- **Encabezados**:  
  `x-api-key` (requerido): Clave API para autenticación.
- **Parámetros de Ruta**:  
  - `idOrName` (requerido): El ID único o nombre de la película.
- **Respuesta**:  
  Devuelve el objeto de la película que coincide con el ID o nombre.
- **Códigos de Estado**:  
  - `200 OK`: Película obtenida exitosamente.  
  - `404 Not Found`: No se encontró una película con el ID o nombre proporcionado.  
  - `401 Unauthorized`: Clave API inválida o ausente.

---

#### `GET /movies/:idOrName/recommendations`
Obtiene una lista de películas recomendadas basadas en el género de la película especificada.

- **Encabezados**:  
  `x-api-key` (requerido): Clave API para autenticación.
- **Parámetros de Ruta**:  
  - `idOrName` (requerido): El ID único o nombre de la película para basar las recomendaciones.
- **Respuesta**:  
  Devuelve una lista de películas recomendadas.
- **Códigos de Estado**:  
  - `200 OK`: Recomendaciones obtenidas exitosamente.  
  - `404 Not Found`: No se encontró una película con el ID o nombre proporcionado.  
  - `401 Unauthorized`: Clave API inválida o ausente.

---

## Middleware de Autenticación

### Historia de Usuario

**Como** desarrollador de la API,  
**quiero** implementar un middleware de autenticación basado en una clave API,  
**para** proteger los endpoints y garantizar que solo usuarios autorizados puedan acceder a ellos.

### Criterios de Aceptación

1. El middleware debe verificar la presencia de un encabezado `x-api-key` en cada solicitud.
2. Si la clave API no está presente o es incorrecta, el middleware debe devolver un error 401 con el mensaje: `Unauthorized: Invalid API Key`.
3. El middleware debe permitir el acceso a rutas públicas como `/docs` sin requerir autenticación.
4. La clave API válida debe configurarse en el archivo `.env` bajo la variable `API_KEY`.
5. Todas las rutas protegidas deben rechazar solicitudes no autenticadas.

### Configuración

1. Asegúrate de definir la variable `API_KEY` en el archivo `.env`:
   ```
   API_KEY=your-api-key-here
   ```

2. El middleware de autenticación ya está implementado en el archivo `middlewares/authMiddleware.js` y se aplica globalmente en `index.js`.

## Soporte de Paginación

El endpoint `/movies` soporta paginación mediante los parámetros de consulta `page` y `limit`:
- `page`: Número de página (por defecto: 1).
- `limit`: Número de elementos por página (por defecto: 10).

Ejemplo de uso:
```
GET /movies?page=2&limit=5
```

## Validación de Rutas con `express-validator`

Se utiliza `express-validator` para validar los datos de entrada en los endpoints. Esto asegura que las solicitudes cumplan con los requisitos esperados antes de ser procesadas.

### Ejemplo de Validación
En el endpoint `/movies`, se valida que los parámetros de consulta como `genre` y `year` sean válidos:
- `genre`: Debe ser un string.
- `year`: Debe ser un número entero.

Si los datos no son válidos, se devuelve un error 400 con detalles de la validación fallida.

## Decisiones Técnicas Clave

1. **Middleware de Autenticación**: Se implementó un middleware basado en una clave API para proteger los endpoints sensibles.
2. **Paginación**: Se añadió soporte de paginación en el endpoint `/movies` para mejorar la eficiencia en la gestión de grandes conjuntos de datos.
3. **Validación de Entrada**: Se utilizó `express-validator` para garantizar la integridad de los datos de entrada en los endpoints.
4. **Documentación**: Se utilizó Swagger para documentar la API, facilitando su uso por parte de los desarrolladores.
5. **Estructura Modular**: La API está organizada en controladores, servicios y middlewares para mantener un código limpio y escalable.

## Estructura de Carpetas
```
movie-match-api/
├── controllers/
│   ├── moviesController.js
├── data/
│   └── movies.csv
├── routes/
│   └── moviesRoutes.js
├── middlewares/
│   ├── logger.js
│   ├── errorHandler.js
│   ├── cors.js
│   └── authMiddleware.js
├── services/
│   └── movieService.js
├── docs/
│   └── swagger.yaml
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```
