FROM node:20

WORKDIR /app

# 1️⃣ Copier package.json
COPY package*.json ./

# 2️⃣ Installer dépendances
RUN npm install

# 3️⃣ Copier prisma + code
COPY prisma ./prisma/
COPY . .

# 4️⃣ Générer Prisma client
RUN npx prisma generate

# 5️⃣ Build NestJS
RUN npm run build

# 6️⃣ Exposer port backend
EXPOSE 3000

# 7️⃣ Start production + migrations au runtime
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
