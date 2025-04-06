*Crecker Films*
# 🎬 Crecker Films BackEnd

**Crecker Films API** — серверная часть проекта для обработки данных о фильмах, пользователях и прочем. Написан на **Node.js + Express**, использует **Prisma** и предоставляет REST API для фронтенда.


## 🚀 Технологии

- ⚙️ **Node.js** — среда выполнения JavaScript
- 🚂 **Express** — минималистичный веб-фреймворк
- 🗃️ **Prisma** — база данных
- 🔐 **JWT** — авторизация через токены
- 🧪 **Zod** — валидация данных
- 🪝 **CORS**— безопасность
- 📄 **dotenv** — переменные окружения


## 📦 Установка

- git clone https://github.com/Taisiia773/crecker-films-backend.git
- cd crecker-films-backend
- npm install


## 🚀 Запуск проекта

- npm start


## 🌐 API Эндпоинты

GET    /films                 # Получить список фильмов
GET    /film/:id              # Получить фильм по ID
PUT    /api/film/:id          # add фильм (админ)

GET    /genres                # Получить список жанров
GET    /genre/:id             # Получить жфнр по ID

POST   /api/auth/register     # Регистрация пользователя
POST   /api/auth/login        # Авторизация
GET    /api/users/me          # Профиль текущего пользователя

GET    /comments/:id          # Получить список коментариев по ID фильма
GET    /comment/:id           # Получить коментарий по ID


## 📁 Структура проекта

src/
├── client/         # клиентские утилиты или вспомогательные скрипты
├── config/         # конфигурации (dotenv)
├── FilmApp/        # логика работы с фильмами
├── GenreApp/       # модуль жанров
├── UserApp/        # модуль авторизации и пользователей
├── middlewares/    # авторизация, ошибки и т.п.
├── static/         # публичные файлы (например, постеры)
├── templates/      # HTML-шаблоны (например, письма)
├── types/          # глобальные интерфейсы TypeScript
└── server.ts       # точка входа в приложение
