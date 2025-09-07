# Architecture - University LinkedIn (MVP)

This document describes the microservices architecture for the MVP version of the platform.  
The design is based on the MVP scope and user stories.

---

## 1. Overview

The platform follows a **microservices architecture**.  
Each service is responsible for a single domain and owns its own data.  
All services run in containers (Docker) and communicate via REST APIs, routed through an **API Gateway**.

---

## 2. Microservices

### 1. Auth Service

- **Responsibilities**:
  - Signup with email and password
  - Login and issue JWT tokens
  - Password hashing & validation
- **Database**: MongoDB (or PostgreSQL for relational)
- **Exposes APIs**:
  - `POST /signup`
  - `POST /login`

---

### 2. User Service

- **Responsibilities**:
  - Manage user profiles (Students, Faculty, Alumni)
  - Store personal, academic, and professional information
  - Serve profile data to other services
- **Database**: MongoDB
- **Exposes APIs**:
  - `GET /users/:id`
  - `PUT /users/:id`
  - `GET /users?filter=...`

#### User Roles and Profile Fields:

- **Student**
  - Name, branch, year, skills, profile picture
- **Faculty**
  - Name, department, designation, areas of expertise
- **Alumni**
  - Name, graduation year, degree, current job title, company, career highlights, mentorship interest flag

---

### 3. Connection Service

- **Responsibilities**:
  - Manage follow/unfollow relationships
  - Store follower/following lists
- **Database**: MongoDB (optimized for adjacency lists)
- **Exposes APIs**:
  - `POST /connections/follow`
  - `POST /connections/unfollow`
  - `GET /connections/:id/followers`
  - `GET /connections/:id/following`

**Alumni Use Case**:

- Alumni can follow students, faculty, and other alumni to stay connected.
- Students and faculty can follow alumni for mentorship and career updates.

---

### 4. Post Service

- **Responsibilities**:
  - Create and store posts (text + optional image URL)
  - Retrieve posts by user
- **Database**: MongoDB
- **Exposes APIs**:
  - `POST /posts`
  - `GET /posts/:userId`
  - `GET /posts/:postId`

**Alumni Use Case**:

- Alumni post career updates, industry insights, or mentorship opportunities.
- Students and faculty view alumni posts in their feed.

---

### 5. Feed Service

- **Responsibilities**:
  - Generate feed for a user based on following list
  - Aggregate posts from followed users
  - Order posts in reverse chronological order
- **Database**: No dedicated DB (fetches data from Post + Connection service)
- **Exposes APIs**:
  - `GET /feed/:userId`

**Alumni Use Case**:

- Alumni see updates from their connections (students, faculty, alumni).
- Students see alumni posts (e.g., career news, mentorship offers) in their feed.

---

### 6. API Gateway

- **Responsibilities**:
  - Single entry point for clients (frontend, mobile)
  - Route requests to appropriate microservice
  - Perform authentication (JWT validation)
- **Database**: None
- **Tech**: Express/Nginx/Node.js gateway

---

## 3. Service Communication

- **Clients → API Gateway → Services**
- **Services → Services** via REST APIs (no direct DB access across services)
- Example:
  - Feed Service calls:
    - Connection Service to get the list of followed users
    - Post Service to fetch posts from those users

---

## 4. Data Ownership

- **Auth Service** → credentials and tokens
- **User Service** → profiles (Students, Faculty, Alumni with role-specific fields)
- **Connection Service** → follow relationships
- **Post Service** → posts and media metadata

👉 No service reads another service’s database.  
👉 Data is shared only through APIs.

---

## 5. Deployment & Dev Environment

- **Local**: Docker Compose runs all services and MongoDB containers
- **GitHub**: Source code hosted in a monorepo
- **CI/CD**: GitHub Actions builds and tests each service

---

## 6. Future Extensions (Not MVP)

- **Notification Service** – in-app + email notifications
- **Messaging Service** – private 1:1 or group chats
- **Job Service** – alumni and recruiters post jobs for students
- **Search Service** – indexing profiles and posts for fast lookup
- **Mentorship Service** – alumni can opt-in to mentor students

---

**Summary:**  
The MVP supports **Students, Faculty, and Alumni** by providing role-based profiles, connections, posts, and feeds. Alumni are fully integrated into the architecture so they can share career updates, mentor students, and remain connected to the university community.
