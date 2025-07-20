# Используем Node.js для сборки приложения
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем React приложение для production
RUN npm run build

# Используем nginx для обслуживания статических файлов
FROM nginx:stable-alpine

# Копируем собранное приложение из предыдущего этапа сборки
COPY --from=builder /app/dist /usr/share/nginx/html

# Настраиваем nginx (опционально, можно создать свой файл конфигурации)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт для доступа к приложению
EXPOSE 80

# Команда для запуска nginx
CMD ["nginx", "-g", "daemon off;"]
