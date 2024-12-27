<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
npm install
```
3. tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos 

```
docker-compose up -d
```

5. clonar el archivo __.env.templete__ y renombrar la copia a __.env__


6. llenar las variables de entorno definidas en el ``` .env ```


7. ejecutar la aplicacion en dev:

```
npm run start:dev
```

8. Recostruir la base de datos

```
http://localhost:4000/api/v2/seed
```
## Stack usado

* MongoDB
* Nest


