# Usa una imagen base de Node.js
FROM node:18.16.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR ./src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación (por ejemplo, 3000)
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
