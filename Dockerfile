# Utilizar una imagen base de Node.js
FROM node:20-alpine

# Crear el directorio de la aplicación en el contenedor
WORKDIR /src/app

# Copiar los archivos del paquete de la aplicación
COPY package*.json ./

# Copia el archivo .env en la imagen Docker
COPY .env ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el código de la aplicación
COPY . .

RUN npm run build

# Exponer el puerto por el que la aplicación se conectará
EXPOSE 3000

# Ejecutar la aplicación
CMD [ "npm", "run", "start:dev" ]
