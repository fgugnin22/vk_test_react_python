# Тестовое задание в ВК

## Технологический стек

- **Frontend**:

  - React.js
  - Typescript
  - Redux Toolkit (+Query)
  - Tailwind.css
  - React Router v6
  - Vite

- **Backend**:

  - Django
  - Django Rest Framework

- **Database**:

  - Sqlite3

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/fgugnin22/vk_test_react_python
   ```
2. Navigate to the project directory:
   ```sh
   cd vk_test_react_python
   ```
3. Install dependencies:

   ```sh
   cd frontend && yarn install       # For React frontend

   cd backend && python -m venv venv # create venv

   source venv/bin/activate.sh # activate venv

   pip install -r requirements.txt   # For Django backend
   ```

4. Set up the database (if applicable):
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Start the development server:
   ```sh
   cd frontend && yarn start       # For React frontend
   cd backend && venv/(bin|scripts)/activate && python manage.py runserver    # For Django backend
   ```

## Данные от админки (/admin/)

- login: `admin`
- password: `admin`

## Вопросы

- Под redux toolkit подходит RTK Query?
- Чтобы добавить контент в статью, надо добавить в неё объекты параграфа
