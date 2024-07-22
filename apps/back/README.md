# Wraffle Server

Wraffle 서비스를 위한 API/Batch 애플리케이션 레포입니다.

## Getting started
모든 명령어는 `pnpm`을 사용합니다. **1단계**를 제외한 모든 명령어는 **apps/back** 디렉토리 실행 기준으로 작성되었습니다.

1. ### Install dependencies

   ```bash
   $ pnpm install
   ```

2. ### Docker compose up

   ```bash
   $ docker-compose up -d
   ```

3. ### Copy Env

   ```bash
   $ cp .env.example .env
   ```

4. ### Run the development server
   - front-api
      ```bash
      $ pnpm start:front:dev
      ```
   - admin-api
     ```bash
     $ pnpm start:admin:dev
     ```
   - batch
     ```bash
      $ pnpm start:batch:dev
     ```