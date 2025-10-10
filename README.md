# Correr en Dev:

1. Clonar el repositorio.

2. Crear una copia del archivo .env.template , renombrarlo a .env y cambiar las variables de entorno

3. Instalar dependencias `npm install`.

4. Levantar la base de datos `docker compose up -d`. ( Asegurarse que tengan el docker corriendo)

5. Correr las migraciones de Prisma `npx prisma migrate dev`

6. Llenar la base de dato con informacion de relleno. npx tsx src/seed/seed-database.ts

7. Correr el proyecto `npm run dev`

8. Limpiar el localStorage del navegador

