# 📚 Books Sharing Platform

Books sharing platform that build with NodeJS, NestJS, Postgres, React and TypeScript.

## 📘 API SPECIFICATION (v1)

### 🔐 Auth

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/auth/register` | Register new user          |
| POST   | `/auth/login`    | Login user                 |
| POST   | `/auth/logout`   | Logout user (token revoke) |
| GET    | `/auth/profile`  | Get current user info      |
| PATCH  | `/auth/profile`  | Update user profile        |

---

### 👤 Users

| Method | Endpoint               | Description             |
| ------ | ---------------------- | ----------------------- |
| GET    | `/users/:id`           | Get public user profile |
| GET    | `/users/:id/books`     | Get user-owned books    |
| GET    | `/users/:id/favorites` | Get user favorite books |
| GET    | `/users/:id/friends`   | Get user’s friends      |

---

### 📚 Books

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/books`     | List all books      |
| POST   | `/books`     | Add a new book      |
| GET    | `/books/:id` | Get book details    |
| PATCH  | `/books/:id` | Update book details |
| DELETE | `/books/:id` | Delete a book       |

---

### 📦 Book Copies (user-owned books)

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/copies`     | List all available copies       |
| POST   | `/copies`     | Add a book to user's collection |
| GET    | `/copies/:id` | Get copy details                |
| PATCH  | `/copies/:id` | Update copy details             |
| DELETE | `/copies/:id` | Remove copy                     |

---

### 🔄 Borrow Requests

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| GET    | `/borrow-requests`            | List all requests (mine) |
| POST   | `/borrow-requests`            | Send a borrow request    |
| PATCH  | `/borrow-requests/:id/accept` | Accept a request         |
| PATCH  | `/borrow-requests/:id/reject` | Reject a request         |
| PATCH  | `/borrow-requests/:id/return` | Mark as returned         |

---

### 📝 Reviews

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/books/:id/reviews` | Get all reviews for a book |
| POST   | `/books/:id/reviews` | Add a review               |
| DELETE | `/reviews/:id`       | Delete a review (own only) |

---

### 🏷 Tags / Genres

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/tags`                  | List all tags        |
| POST   | `/tags`                  | Create a new tag     |
| POST   | `/books/:id/tags`        | Add tags to book     |
| DELETE | `/books/:id/tags/:tagId` | Remove tag from book |

---

### ⭐ Favorites / Wishlist

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/books/:id/favorite` | Add book to favorites |
| DELETE | `/books/:id/favorite` | Remove from favorites |

---

### 👥 Friendships

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/friends`             | List current friends |
| POST   | `/friends/:id/request` | Send friend request  |
| PATCH  | `/friends/:id/accept`  | Accept request       |
| PATCH  | `/friends/:id/reject`  | Reject request       |
| DELETE | `/friends/:id`         | Remove friend        |

---

### 🔔 Notifications

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| GET    | `/notifications`          | Get user notifications |
| PATCH  | `/notifications/:id/read` | Mark as read           |

---

### 📊 Activity

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/activities` | Get recent user activity |

--
