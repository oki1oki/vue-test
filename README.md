# 📸 Photo Table — Vue 3 Test Task

> Интерфейс для отображения и фильтрации фотографий из [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## ✨ Возможности

- ⚙️ Реализация на Vue 3 + Composition API
- 🔁 Используется Pinia для управления состоянием
- 🎨 Стилизация через Tailwind CSS
- 💡 Реализована тёмная/светлая тема с переключением и сохранением в localStorage
- 💾 Сохранение введённых ID альбомов в localStorage
- 🔍 Поиск по ID альбомов (множественный ввод через пробел)
- 📥 Динамическая подгрузка фотографий при скролле
- 📊 Таблица с сортировкой по каждому столбцу
- 🧱 Таблица реализована вручную — без UI-компонентов, за исключением базовых элементов из shadcn-vue

## 📦 Технологии

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Pinia](https://pinia.vuejs.org/) — стейт-менеджер
- [Tailwind CSS](https://tailwindcss.com/) — утилитарные стили
- [vueuse](https://vueuse.org/) — утилиты (используется для localStorage, scroll detection)
- [shadcn-vue](https://www.shadcn-vue.com/) — частично использован (иконки, кнопки и поля)

## 🚀 Как запустить проект

```bash
# Установка зависимостей
npm install

# Запуск локального сервера
npm run dev
