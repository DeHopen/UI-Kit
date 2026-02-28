# @my-ui — React UI Kit

Production-ready open-source библиотека React-компонентов на TypeScript с accessibility-first подходом, дизайн-токенами, тёмной темой и поддержкой tree-shaking.

## Возможности

- **TypeScript** — strict mode, полная типизация, поддержка полиморфных компонентов
- **Accessibility-first** — соответствие WAI-ARIA, навигация с клавиатуры, focus trap
- **Темизация** — дизайн-токены через CSS-переменные, режимы light/dark/system
- **Tree-shakeable** — сборки ESM + CJS без побочных эффектов
- **Headless + Styled** — `@my-ui/core` (логика) + `@my-ui/react` (стилизованные компоненты)
- **Mobile-first** — адаптивный Grid с брейкпоинтами
- **Документация** — Storybook с интерактивными контролами и a11y-аддоном

## Установка

```bash
npm install @my-ui/react
```

Только headless-примитивы:

```bash
npm install @my-ui/core
```

## Быстрый старт

```tsx
import { ThemeProvider, Button, Input, Stack } from '@my-ui/react'
import '@my-ui/react/styles.css'

function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <Stack spacing={4}>
        <Input label="Email" placeholder="you@example.com" />
        <Button variant="primary">Отправить</Button>
      </Stack>
    </ThemeProvider>
  )
}
```

## Компоненты

### Button

```tsx
<Button variant="primary" size="md" loading={false} fullWidth>
  Нажми меня
</Button>

<Button as="a" href="/page" variant="secondary">
  Кнопка-ссылка
</Button>
```

**Пропсы:** `variant` (primary | secondary | danger | ghost), `size` (sm | md | lg), `loading`, `disabled`, `fullWidth`, `iconLeft`, `iconRight`, `as` (полиморфный)

### Input

```tsx
<Input
  label="Email"
  error="Некорректный email"
  helperText="Мы не будем передавать ваш email третьим лицам"
  size="md"
  startIcon={<SearchIcon />}
/>
```

**Пропсы:** `label`, `error`, `helperText`, `size` (sm | md | lg), `fullWidth`, `startIcon`, `endIcon`

### Card

```tsx
<Card shadow="md">
  <CardHeader>Заголовок</CardHeader>
  <CardBody>Содержимое</CardBody>
  <CardFooter>Действия</CardFooter>
</Card>
```

**Пропсы:** `shadow` (none | sm | md | lg | xl)

### Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Подтверждение"
  size="md"
  footer={<Button onClick={handleConfirm}>Подтвердить</Button>}
>
  Вы уверены?
</Modal>
```

**Пропсы:** `isOpen`, `onClose`, `title`, `size` (sm | md | lg | xl), `closeOnOverlay`, `closeOnEsc`, `footer`

### Grid

```tsx
<Grid columns={1} sm={2} md={3} lg={4} gap={4}>
  <div>Элемент 1</div>
  <div>Элемент 2</div>
</Grid>
```

**Пропсы:** `columns` (1-12), `gap` (0 | 1 | 2 | 3 | 4 | 6 | 8), `sm`, `md`, `lg`, `xl` (адаптивные колонки)

### Stack

```tsx
<Stack direction="horizontal" spacing={4} align="center" justify="between">
  <Button variant="ghost">Отмена</Button>
  <Button variant="primary">Отправить</Button>
</Stack>
```

**Пропсы:** `direction` (horizontal | vertical), `spacing` (0-16), `align` (start | center | end | stretch), `justify` (start | center | end | between | around | evenly), `wrap`, `as` (полиморфный)

## Темизация

### ThemeProvider

Оберните приложение в `ThemeProvider` для включения темизации:

```tsx
<ThemeProvider defaultColorMode="system">
  <App />
</ThemeProvider>
```

### Цветовые режимы

```tsx
import { useTheme } from '@my-ui/react'

function ThemeToggle() {
  const { colorMode, setColorMode } = useTheme()

  return (
    <button onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>
      Переключить тему
    </button>
  )
}
```

### Кастомная тема

```tsx
import { ThemeProvider } from '@my-ui/react'
import type { Theme } from '@my-ui/react'

const customLight: Theme = {
  colors: {
    primary: '#7c3aed',
    // ... переопределите любой токен
  },
}

<ThemeProvider lightThemeOverride={customLight}>
  <App />
</ThemeProvider>
```

### CSS-переменные

Все токены доступны как CSS-переменные. Переопределяйте глобально или локально:

```css
:root {
  --ui-color-primary: #7c3aed;
  --ui-radius-md: 12px;
}
```

## Headless-ядро (`@my-ui/core`)

Хуки и утилиты для создания собственных компонентов:

```tsx
import { useDisclosure, useFocusTrap, useControllableState, cn, mergeRefs } from '@my-ui/core'
```

- **useControllableState** — паттерн controlled/uncontrolled состояния
- **useDisclosure** — управление состоянием open/close/toggle
- **useFocusTrap** — ловушка фокуса внутри контейнера (для модалок/диалогов)
- **useId** — генерация стабильных уникальных ID для a11y
- **mergeRefs** — объединение нескольких рефов в один
- **cn** — утилита для условных className

## Доступность (Accessibility)

Все компоненты следуют лучшим практикам WAI-ARIA:

- Семантические HTML-элементы (без анти-паттерна `div`-как-`button`)
- Поддержка навигации с клавиатуры
- Управление фокусом и focus trap (Modal)
- ARIA-атрибуты (`aria-disabled`, `aria-invalid`, `aria-describedby`, `aria-modal`)
- Стили focus-visible
- Поддержка скринридеров

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск Storybook (документация компонентов)
npm run dev

# Запуск тестов
npm test

# Сборка всех пакетов
npm run build

# Проверка линтером
npm run lint

# Форматирование кода
npm run format
```

## Структура проекта

```
├── packages/
│   ├── core/          → Headless-примитивы (хуки, утилиты, типы)
│   └── react/         → Стилизованные React-компоненты
├── stories/           → Storybook-истории
├── .storybook/        → Конфигурация Storybook
├── .github/workflows/ → CI/CD
└── .changeset/        → Управление версиями
```

## Участие в разработке

1. Форкните репозиторий
2. Создайте ветку (`git checkout -b feat/my-feature`)
3. Внесите изменения
4. Запустите тесты (`npm test`)
5. Проверьте линтером (`npm run lint`)
6. Зафиксируйте коммит в формате conventional commits (`feat:`, `fix:`, `docs:` и т.д.)
7. Откройте pull request

## Версионирование

Проект использует [Changesets](https://github.com/changesets/changesets) для управления версиями:

```bash
npm run changeset     # Создать changeset
npm run version       # Обновить версии
npm run release       # Собрать и опубликовать
```
