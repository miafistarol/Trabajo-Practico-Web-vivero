# Trabajo Práctico Web - Vivero
Sistema web para la gestión de un vivero.

## Requisitos
Antes de ejecutar el proyecto es necesario tener instalado:

- Docker Desktop
- Git
- Node.js
- bcryptjs
- cookie-parser
- dotenv
- express
- jsonwebtoken
- nanoid
- pg

## Base de datos
La base de datos se crea automáticamente al levantar el contenedor de PostgreSQL.
El archivo `vivero.sql` contiene:
- Estructura de la base de datos
- Datos iniciales
- Usuarios
En caso de que la inicialización automática mediante Docker no funcione, la base puede restaurarse manualmente ejecutando dicho archivo sobre una base de datos PostgreSQL.
Cambiar la siguiente linea: COPY database/vivero.sql /docker-entrypoint-initdb.d/

## Configuración de PostgreSQL
- Base de datos: `vivero`
- Usuario: `postgres`
- Contraseña: `pass`

## Construcción de la imagen
```bash
docker build -t vivero-db .
```

## Ejecución del contenedor
```bash
docker run -d --name vivero-db -p 5432:5432 vivero-db
```
Una vez iniciado el contenedor, PostgreSQL ejecutará automáticamente el archivo `vivero.sql` ubicado en `/docker-entrypoint-initdb.d/`.

## Variables de entorno
Crear un archivo `.env` en la raíz del proyecto utilizando como referencia el archivo `.env.example`.

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vivero
DB_USER=postgres
DB_PASSWORD=pass

PUERTO=3000

JWT_SECRET=superclavesecreta
```

## Autoras
Gianella Barbero
Mia Fistarol
