#Imagem Base
FROM node:18

WORKDIR /app

#Variavel em tempo de build
ARG PORT=3001

#Variavel de ambiente
ENV PORT=$PORT

#Expoe a porta
EXPOSE $PORT

#Copia arquivos DE PARA
COPY . .

#Executa em construcão
RUN npm install

#Executa no inicio do container
ENTRYPOINT npm start

