FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Vite frontend
RUN npm run build

# Serve it with a simple web server
RUN npm install -g serve

EXPOSE 4173

# Serve the Vite build
CMD ["npm", "run", "dev"]
