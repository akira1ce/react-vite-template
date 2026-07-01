# ---- 构建阶段 ----
FROM node:22-alpine AS builder

WORKDIR /app

# 利用 Docker 缓存层：先拷贝依赖描述文件
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# 拷贝源码并构建
COPY . .
RUN yarn build

# ---- 运行阶段 ----
FROM nginx:stable-alpine

# 替换默认 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
