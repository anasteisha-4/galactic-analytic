# Межгалактическая аналитика

## Запуск

1. `npm install` — установка всех необходимых зависимостей для корректной работы
2. `npm run dev` — запуск приложения на localhost:5173

## Архитектура

```
src
│  App.tsx
│  main.tsx
│  index.css
│  reset.css
├─api
│ ├─aggregate.ts           # fetch-запросы к /aggregate, получение статистики
│ └─report.ts              # fetch-запросы к /report, генерация файлов
├─assets
│ └─icons/                 # svg-иконки
├─components               # UI
│ ├─AnalyticResult/        # Отрисовка метрик для промежуточных и итоговых результатов
│ ├─Buttons/
│ │ ├─Button/              # Базовая настраиваемая кнопка
│ │ ├─DeleteButton/        # Кнопка удаления записей из истории
│ │ └─XButton/             # Кнопка-крестик
│ ├─DragAndDrop/           # Drag&Drop зона
│ ├─Emojis/                # svg-компоненты с настраиваемым цветом
│ ├─Header/
│ │ └─Menu/                # Отдельный компонент меню с NavLink
│ ├─HistoryItem/           # Запись в истории
│ ├─Logo/                  # Логотип и подпись
│ └─Modal/                 # Модальное окно
├─features                 # Модули с бизнес-логикой
│ ├─drag-and-drop          # Хук useDragAndDrop для обработки загружаемых файлов
│ ├─generator              # Хук useGenerator для управления генерацией файлов
│ └─history                # Работа с историей в LocalStorage
├─pages                    # Основные страницы
│ ├─Analytic/              # Загрузка и парсинг файлов
│ ├─Generator/             # Генерация CSV
│ └─History/               # История аналитики
├─store                    
│ ├─analytic.ts            # Store для аналитики (Zustand)
│ └─history.ts             # Store для истории (Zustand)
└─utils                    # Мелкие утилиты
   ├─generate-id.ts
   ├─is-analytic-result.ts
   ├─process-date.ts 
   └─process-name-length.ts
```