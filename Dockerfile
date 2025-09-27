FROM oven/bun

COPY bun.lockb . 
COPY package.json . 
COPY tsconfig.json .

RUN bun install --frozen-lockfile

COPY src ./src 

ENV NODE_ENV=production
ENTRYPOINT [ "bun", "start" ]