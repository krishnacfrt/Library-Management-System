# Library Management System

A full-stack Library Management System built with FastAPI (Python) for the backend and React (Vite) for the frontend.  
It supports librarian authentication, admin registration, book management, and transaction tracking.

---

## Features

- **Librarian Authentication** (login/logout)
- **Admin Registration** (with security code)
- **Book Management** (add, update, delete, list)
- **Transaction Management** (issue/return books)
- **Modern React UI** (with Redux)
- **Secure password hashing** (bcrypt)
- **SQLite/MySQL database support**

---

## Project Structure

```
Library-Management-System/
│
├── Backend/
│   ├── main.py                # FastAPI entry point
│   ├── Utils/
│   │   ├── auth_service.py    # Auth logic
│   │   └── database.py        # DB connection/cursor
│   └── ...                    # Other backend files
│
├── UI/
│   ├── src/
│   │   └── Components/        # React components
│   ├── package.json
│   └── vite.config.js
│
└── Readme.md
```

---

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

---

## Backend Setup

1. **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    .\.venv\Scripts\activate   # On Windows
    ```

2. **Install dependencies:**
    ```bash
    pip install fastapi uvicorn bcrypt pydantic
    # For SQLite (default): nothing extra needed
    # For MySQL: pip install mysql-connector-python
    ```

3. **Configure the database:**
    - By default, uses SQLite. For MySQL, update `database.py` connection accordingly.

4. **Run the backend server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

---

## Frontend Setup

1. **Install dependencies:**
    ```bash
    cd UI
    npm install
    ```

2. **Configure Vite proxy:**
    - Ensure `vite.config.js` contains:
      ```js
      server: {
        proxy: {
          '/librarian': 'http://localhost:8000',
          '/books': 'http://localhost:8000',
          '/user': 'http://localhost:8000',
        }
      }
      ```

3. **Run the frontend:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

---

## Usage

- **Register Admin:**  
  Use the registration form. You must provide the correct security code (default: `SECRET123`).

- **Login as Librarian:**  
  Use your registered username and password.

- **Manage Books & Transactions:**  
  Use the UI to add, update, delete books, and manage transactions.

---

## API Endpoints (Sample)

- `POST /librarian/register`  
  JSON body: `{ "username": "...", "password": "...", "security_code": "..." }`

- `POST /librarian/authenticate`  
  JSON body: `{ "username": "...", "password": "..." }`

- `GET /books`  
  List all books.

- `POST /books`  
  Add a new book.

---

## Troubleshooting

- **bcrypt not found:**  
  Make sure you installed it in the correct virtual environment.

- **422 Unprocessable Entity:**  
  Ensure you are sending JSON in the request body, not as query parameters.

- **CORS/Proxy issues:**  
  Make sure Vite proxy is set up and both servers are running.

---

## License

MIT

---

## Author

- [Your Name]# Library Management System

A full-stack Library Management System built with FastAPI (Python) for the backend and React (Vite) for the frontend.  
It supports librarian authentication, admin registration, book management, and transaction tracking.

---

## Features

- **Librarian Authentication** (login/logout)
- **Admin Registration** (with security code)
- **Book Management** (add, update, delete, list)
- **Transaction Management** (issue/return books)
- **Modern React UI** (with Redux)
- **Secure password hashing** (bcrypt)
- **SQLite/MySQL database support**

---

## Project Structure

```
Library-Management-System/
│
├── Backend/
│   ├── main.py                # FastAPI entry point
│   ├── Utils/
│   │   ├── auth_service.py    # Auth logic
│   │   └── database.py        # DB connection/cursor
│   └── ...                    # Other backend files
│
├── UI/
│   ├── src/
│   │   └── Components/        # React components
│   ├── package.json
│   └── vite.config.js
│
└── Readme.md
```

---

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

---

## Backend Setup

1. **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    .\.venv\Scripts\activate   # On Windows
    ```

2. **Install dependencies:**
    ```bash
    pip install fastapi uvicorn bcrypt pydantic
    # For SQLite (default): nothing extra needed
    # For MySQL: pip install mysql-connector-python
    ```

3. **Configure the database:**
    - By default, uses SQLite. For MySQL, update `database.py` connection accordingly.

4. **Run the backend server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

---

## Frontend Setup

1. **Install dependencies:**
    ```bash
    cd UI
    npm install
    ```

2. **Configure Vite proxy:**
    - Ensure `vite.config.js` contains:
      ```js
      server: {
        proxy: {
          '/librarian': 'http://localhost:8000',
          '/books': 'http://localhost:8000',
          '/user': 'http://localhost:8000',
        }
      }
      ```

3. **Run the frontend:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

---

## Usage

- **Register Admin:**  
  Use the registration form. You must provide the correct security code (default: `SECRET123`).

- **Login as Librarian:**  
  Use your registered username and password.

- **Manage Books & Transactions:**  
  Use the UI to add, update, delete books, and manage transactions.

---

## API Endpoints (Sample)

- `POST /librarian/register`  
  JSON body: `{ "username": "...", "password": "...", "security_code": "..." }`

- `POST /librarian/authenticate`  
  JSON body: `{ "username": "...", "password": "..." }`

- `GET /books`  
  List all books.

- `POST /books`  
  Add a new book.

---

## Troubleshooting

- **bcrypt not found:**  
  Make sure you installed it in the correct virtual environment.

- **422 Unprocessable Entity:**  
  Ensure you are sending JSON in the request body, not as query parameters.

- **CORS/Proxy issues:**  
  Make sure Vite proxy is set up and both servers are running.

---

## License

MIT

---

## Author

