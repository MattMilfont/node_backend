# 1. Usar uma imagem base do Node.js
FROM node:18-alpine

# 2. Definir o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copiar arquivos do package.json e package-lock.json
COPY package*.json ./

# 4. Instalar as dependências
RUN npm install --production

# 5. Copiar o restante dos arquivos do projeto
COPY . .

# 6. Compilar o código TypeScript para JavaScript
RUN npm run build

# 7. Expor a porta 3333 (em vez da 3000)
EXPOSE 3333

# 8. Comando para iniciar a aplicação
CMD ["node", "dist/main"]
