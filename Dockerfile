FROM node

# Create app directory
WORKDIR /usr/app/my-reduxtagram

#Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied where available (npm@5+)
COPY package*.json ./

#If you are building your code for production
#RUN npm install --only=production

RUN npm install

#Bundle app source

COPY . .

RUN npm run build


EXPOSE 3000

CMD ["npm", "start"]
