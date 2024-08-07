
FROM node:20-alpine AS base 
# alpine -> giam nhe kich thuoc, bo di 1 so thu khong can thiet trong moi truong dev

FROM base AS dependencies

WORKDIR /app
COPY package*.json ./
RUN npm install 

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app . 

# COPY --from=build /app/build/build ./build 


EXPOSE 3000

CMD ["node", "build/index.js"]
# CMD ["npm", "start"]