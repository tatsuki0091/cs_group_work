FROM node:20.13.1
# RUN mkdir /frontend
# WORKDIR /frontend
# RUN npm install -g npm@latest && npm install create-next-app

# FROM node:16.15.0 

# Working directory be app
WORKDIR /frontend

COPY package*.json ./

# Install dependencies
RUN yarn install

# copy local files to app folder
COPY . .


CMD ["yarn","install"]
CMD ["yarn","dev:proxy"]