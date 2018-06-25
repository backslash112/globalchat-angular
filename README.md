# globalchat.online

<img width="150" alt="screen shot 2018-06-24 at 3 24 36 pm" src="https://user-images.githubusercontent.com/5343215/41824682-219289e0-77da-11e8-86a1-9d8be23a903c.png">

Chat with others in the world, even you can't say their language.

<!-- [![Build Status](https://travis-ci.com/backslash112/globalchat-expressjs.svg?token=tyH6w5XwPvDhsxMVozmy&branch=master)](https://travis-ci.com/backslash112/globalchat-expressjs) -->

##  Using Skills

- [Angular 6](https://github.com/angular/angular)
- [Angular Material 2](https://github.com/angular/material2)
- [TypesSript](https://github.com/Microsoft/TypeScript)
- Authentication with JWT (JSON Web Token)
- DigitalOcean
- Continuous Deployment with Travis CI
- Docker
- [Google Cloud Translation API](https://cloud.google.com/translate/docs/)

## Run
To run the test suite, first install the dependencies, then run npm test:
```
$ npm install
$ ng serve --host 0.0.0.0
```
or you can do that with Docker:
```
docker run -it --rm -v "$PWD":/usr/src/app -w /usr/src/app node /bin/bash -c 'npm i'
docker run -it --rm -w /app -v $(pwd):/app -p 4200:4200 alexsuch/angular-cli:6.0.3 ng serve --host 0.0.0.0
```
