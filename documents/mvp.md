# University LinkedIn - Minimum Viable Product (MVP)

## Goal

Build a LinkedIn-style networking platform for our university community using a microservices architecture.  
The MVP should provide the core experience of creating a profile, connecting with others, and sharing posts, while being containerized with Docker and maintained on GitHub.

## Target Users

- **Students** – create profiles, share skills and posts, connect with peers.
- **Faculty** – showcase expertise, interact with students and alumni.
- **Alumni** – share career paths, mentor students, and stay connected with the university.
- **Recruiters** – browse profiles, discover potential candidates.
- **Admins** – manage platform health and data integrity.

## Core MVP Features

1. **Authentication Service**

   - Signup with email + password
   - Login with JWT-based authentication

2. **User Profile Service**

   - Create/update a basic profile (name, branch, year, skills, profile picture URL)
   - Support role-based profiles (Student, Faculty, Alumni)
   - View other users’ profiles

3. **Connections Service**

   - Follow/unfollow other users
   - View followers/following counts

4. **Post Service**

   - Create posts (text, optional image)
   - Read posts

5. **Feed Service**
   - Display posts from followed users
   - Order: reverse chronological (latest first)

## Non-Goals for MVP (Future Features)

- Direct/private messaging
- Job postings
- Notifications
- Groups or communities
- Advanced search or recommendations
- Premium features

## Technical Requirements

- Each feature implemented as a **separate microservice**
- All services run via **Docker Compose** for local development
- Codebase maintained in **GitHub repository**
- Basic CI pipeline with **GitHub Actions**
- MongoDB/Postgres as the database (decide per service)
- API Gateway as the single entry point for clients

---

**Summary:**  
The MVP is the smallest working version of Saber that allows signup/login, role-based profiles (student, faculty, alumni), connections, posting, and a feed — nothing more.
