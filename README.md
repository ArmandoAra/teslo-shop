//Creamos proyecto desde cero con next
//Descargamos algunos archivos del curso y los copiamos en las carpetas correspondientes
//Agregamos todo al primer commit

//Ponemos las fuentes en Config
//Dentro de app solo rutas
//Creamos una parte del sistema de archivos y carpetas que vamos a estar utilizando
//El [slug] es un identificador del producto que es humanamente legible

//Implementacion de zustand (Para manejo del estado global)
//instalamos clsx (para trabajar con las clases condicionales en tailwind)

//Mostrando los articulos filtrados en las categorias de men,woman y kid
//instalamos Swiper para manejar los sliders de las fotos
//Implementamos los slides en desktop y en mobile

//Cart Screen
//Address Screen
//checkout Screen
//Orders List
//Shop Footer
//Login and Register Screen

<!-- #git push -u origin main -->

//Preparando todo lo que tiene que ver con la base de datos
//Configurar y levantar docker creando el docker-compose.yml y las variables de entorno
//Configurar el cliente de prisma (Documentacion en el enlace )
https://www.prisma.io/docs/guides/nextjs
npm install prisma tsx --save-dev
npm install @prisma/extension-accelerate @prisma/client
npx prisma init --datasource-provider PostgreSQL
//En el .env actualizamos la url que se genera despues de ejecutar el comando anterior.
//Creamos las tablas en los Modelos y despues haremos las migraciones.(Sincronizacion)
npx prisma migrate dev --name init (init para la primera, pero puede ser reemplazado por el nombre que querramos)
//Creamos el script para insertar la semilla en la base de datos. Instalamos npm i -D ts-node para que node ejecute ts
//Creamos un script en node-modules para configurar el comando de ejucion del script anterior
//Configuramos el prisma client (src/lib/prisma.ts) copiamos la configuracion que aparece en la documentacion (https://www.prisma.io/docs/guides/nextjs)

<!-- Importante (En los scripts de node no utilizar las rutas de importacion con @ , porque no las reconoce) -->
<!-- Nota: para ejecutarlo debemos ir en la terminal a la ruta donde esta el seed y ejecutar npx tsc --init para crear un archivo de configuracion y asi se puedan hacer importaciones
desde el archivo del script.(al final use npx tsx src/seed/seed-database.ts para correr el script porque no me funciono con npm run seed-->

<!-- Nota: Si creamos las tablas en una app de terceros y despues en el proyecto ejecutamos (npx prisma db pull) podremos descargar los modelos con
sus respectivas relaciones y todo como lo hemos creado.Es util cuando ya tenemos una base de datos previamente creada-->

## Descripcion

## Correr en dev

1. Clonar el repositorio.

2. Crear una compia del archivo .env.template , renombrarlo a .env y cambiar las variables de entorno

3. Instalar dependencias `npm install`.

4. Levantar la base de datos `docker compose up -d`.

5.Correr las migraciones de Prisma `npx prisma migrate dev`

6.Llenar la base de dato con informacion de relleno. npx tsx src/seed/seed-database.ts

7. Correr el proyecto `npm run dev`

## Correr en prod
