FROM debian:buster

EXPOSE 8080

COPY . /workspace

RUN apt update && apt -y install curl build-essential

RUN curl -fsSL https://deb.nodesource.com/setup_11.x | bash -
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt -y install nodejs yarn


WORKDIR /workspace
RUN rm package-lock.json
RUN npm install
RUN npm run build


CMD ["npm", "run", "serve"]
