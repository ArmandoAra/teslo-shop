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

//consumir los datos desde la db (server action)
centralizar la peticion con prisma en un solo lugar para reutilizarla (/actions/products/product-pagination.ts)

//Hacer paginacion

//filtro por genero en la barra superior
//paginacion en cada pagina con el filtro

//Traer informacion del producto(Stock, revalidar stock siempre y mantener la demas data en cache)
//Renderizando la metadata dinamica con la informacion del producto (generateMetadata)
//Revalidacion cada 7 dias
//Renderizar del lado del cliente la informacion que cambia constantemente
//server Actions (Creamos server action para obtener el slug del producto)
//Informacion OpenGraph
//Cambiar Metadata
//Detalles a la hora de compartir enlaces en redes sociales

//Logica relacionada con el carrito de compras
//Persistencia del carrito en el localStorage

//Login y Logout con server actions
//Login con next-auth siguiendo la documentacion https://nextjs.org/learn/dashboard-app/adding-authentication
//Validaciones de lado del cliente
//uso de useForm
//Englobar tambien la sesion del lado del cliente
//Protection de rutas
//Modificaciones en los modelos agregando el modelo de User(Acer migracion y actualizar la base de datos)
//En el sidebar para saber si el usuario esta logueado o no necesitamos hacer un hook y un SessionProvider
//debemos crearnos un restful api con la ruta /api/auth/session par trabajar con el session provider

//Zustand Address Store
//Persistencia
//Almacenar en base de datos la dirección del usuario
//Relaciones uno a uno
//Relaciones uno a muchos
//Server Actions para:
//Guardar dirección
//Actualizar la dirección
//Borrar la dirección
//Conectar Zustand con UseForm con Base de datos

<!-- npx prisma migrate dev --name add-user-model -->
<!-- #git push -u origin main -->

Relaciones uno a uno
Relaciones de uno a muchos
Transacciones de base de datos
Transacciones con Prisma
Manejo de inventario
Crear ordenes
Maestro - Detalle
Server actions
Consideraciones a la hora de crear la orden basado en un carrito de compras

//Instalamos la dependencia bcryptjs para hashear las contraseñas y guardarlas de forma segura en la base de datos
//Pagina de perfil de usuario

<!-- NextAuth.js -->
<!-- //Crear una variable de entorno para generar una  semilla unica -->
<!-- Ejecutamos comando openssl rand -base64 32 y nos genera algo como esto  7sOGoMvllXorsgiTj1grLzxwHoFl7mAyVss1chCLO9Q=-->

<!-- Importante (En los scripts de node no utilizar las rutas de importacion con @ , porque no las reconoce) -->
<!-- Nota: para ejecutarlo debemos ir en la terminal a la ruta donde esta el seed y ejecutar npx tsc --init para crear un archivo de configuracion y asi se puedan hacer importaciones
desde el archivo del script.(al final use npx tsx src/seed/seed-database.ts para correr el script porque no me funciono con npm run seed-->
<!-- Nota: ngrok es un sitio para probar la app sin subirla a produccion -->

<!-- Nota: Si creamos las tablas en una app de terceros y despues en el proyecto ejecutamos (npx prisma db pull) podremos descargar los modelos con
sus respectivas relaciones y todo como lo hemos creado.Es util cuando ya tenemos una base de datos previamente creada-->

<!-- Hidratacion: Hicimos un loader en el componente del top-menu, y seteamos el loader en false dentro de un useEffect que va a disparar false cuando se termine de cargar
el componente, hicimos la condicion que no mostrara la cantidad del carrito hasta que se haya cargado el componente, y asi no da el error de hidratacion -->

## Descripcion

## Correr en dev

1. Clonar el repositorio.

2. Crear una copia del archivo .env.template , renombrarlo a .env y cambiar las variables de entorno

3. Instalar dependencias `npm install`.

4. Levantar la base de datos `docker compose up -d`. ( Asegurarse que tengan el docker corriendo)

5.Correr las migraciones de Prisma `npx prisma migrate dev`

6.Llenar la base de dato con informacion de relleno. npx tsx src/seed/seed-database.ts

7. Correr el proyecto `npm run dev`

## Correr en prod
