# Proyecto de Interaccion con Api de Github

## Descripcion

Este proyecto de prueba fue realizado con el framework de NodeJS [NestJS](https://nestjs.com/) enfocado en desarrollo de aplicaciones backend y apoyado en TypeScript. La estructura del proyecto comparte similitudes con la organización y la sintaxis de Angular, pero con ligeras variaciones propias del framework.

## Installacion de dependencias

Fuera de las dependencias de NestJS se usaron las librerias Axios y Dotenv, la primera para una manipulacion mas sencilla de las peticiones http y la segunda para el manejo de las variables de entorno.

```bash
$ npm install
```

## Compilación de la aplicación

```bash
$ npm run build
```

## Ejecución de la aplicación

Antes de ejecutar la aplicación es necesario crear el archivo **.env** el cual contiene las diferentes variables de entorno del proyecto. El contenido del archivo es el siguiente:

```
NODE_ENV=production
PORT=8080
GITHUB_API=https://api.github.com
FULLNAME_PATH=alejnadro485/repository-history
```
Es importante crear el archivo y ubicar el contenido pertinente debido a que el archivo esta ignorado en el repositorio pero su contenido es necesario para la ejecución de la aplicación.

A continuación están las diferentes formas de ejecución, algunas no dependen de una compilación previa pero sí es necesaria para la ejecución en producción.

```bash
# producción
$ npm run start

# watch mode
$ npm run start:dev

```

## Pruebas

Las pruebas a los diferentes endpoints de la aplicación estan guardados en Postman y son accesibles mediante la siguiente [documentación](https://documenter.getpostman.com/view/685299/TVzUEc9e), donde estan los 3 endpoins de la aplicacion y un ejemplo del retorno de cada uno.

La URL de cada enpoint tiene una variable de entorno de Postman llamada **REPOSITORY_HISTORY** que para una ejecucion en local su valor es: localhost:8080.

La peticion **/commits** permite 3 parametros por consulta:
- limit: total de elementos a traer por consulta, su valor permite calcular la distribución de paginas por consulta. Por defecto su valor es 10.
- page: pagina de elementos a consultar, por defecto 1.
- branch: rama sobre la cual se quiere consultar commits.

Es importante resaltar que cada enpoint tiene en su respuesta una estructura de paginacion definida, la cual es:

```javascript
{
    "total": 5,
    "items_page": 5,
    "limit": 10,
    "total_pages": 1,
    "current_page": 1,
    "begin_items": 0,
    "end_items": 10,
    "list": [...]
}
```

Donde
- total: total de elementos existente
- items_page: total de elementos traidos en la consulta
- limit: maximo de elementos a traer por apgina de consulta
- total_pages: total de paginas consultables
- current_page: pagina actual consultada en la petición
- begin_items: indice del primer elemento traído en la consulta
- end_items: indice del ultimo elemento traído en la consulta
- list: lista de elementos
