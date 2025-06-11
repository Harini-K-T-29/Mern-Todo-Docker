# use the official nodejs image for build the react app
FROM node:18 AS build

# set working directory
WORKDIR /app

COPY package.json ./

# install dependencies
RUN npm install

# copy local files to app folder
COPY . .

# build the app
RUN npm run build

# use the official nginx image for serving the react app
FROM nginx:alpine

# copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80