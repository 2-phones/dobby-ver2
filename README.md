

## 폴더 구조
```
server
│  
├─ api
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ .prettierrc
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ config
│  │  │  └─ index.ts
│  │  ├─ main.ts
│  │  ├─ task
│  │  │  ├─ controller
│  │  │  │  └─ task.controller.ts
│  │  │  ├─ service
│  │  │  │  └─ tesk.service.ts
│  │  │  └─ task.module.ts
│  │  └─ user
│  │     ├─ controller
│  │     │  └─ user.controller.ts
│  │     ├─ service
│  │     │  └─ user.service.ts
│  │     ├─ user.entity.ts
│  │     └─ user.module.ts
│  │  
│  ├─ tsconfig.build.json
│  ├─ tsconfig.json
│  └─ webpack-hmr.config.js
│  
├─ docker
│  ├─ proxy
│  │  ├─ Dockerfile
│  │  └─ nginx.conf
│  └─ rdbms
│     ├─ conf
│     │  └─ my.cnf
│     └─ initdb
│        └─ create_database.sql
│  
├─ src
├─ .gitignore
├─ docker-compose.dev.yml
├─ docker-compose.prod.yml
├─ docker-compose.yml
└─ README.md

```


## 명령어

- 실행 명령어({} 안의 값은 선택, () 안의 값은 옵션 값입니다.)

  ```
  docker-compose -f docker-compose.yml -f docker-compose.{dev, prod}.yml up -d (--build) && docker volume prune -f (&& docker image prune -f)
  ```

- 종료 명령어

  ```
  docker-compose down
  ```