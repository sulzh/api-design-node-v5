## API Design with Node.js, v5 - Course Project

A comprehensive Node.js REST API project built while completing the [API Design with Node.js, v5](https://frontendmasters.com/courses/api-design-nodejs-v5) course on Frontend Masters. This project demonstrates core backend development concepts and best practices.

[![Frontend Masters](https://static.frontendmasters.com/assets/brand/logos/full.png)](https://frontendmasters.com/courses/api-design-nodejs-v5)

### 📚 Project Overview

A full-featured REST API built with Node.js that demonstrates proper API design patterns, authentication, database integration, and middleware implementation. This is a portfolio project showcasing completion of professional-grade backend development training.

### 🛠️ Tech Stack

- **Runtime**: Node.js 23.6.0+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Vitest
- **Routing**: RESTful API design

### ✨ Key Features

- ✅ User authentication system with JWT tokens
- ✅ Password hashing and security best practices
- ✅ Database schema with migrations
- ✅ Input validation middleware
- ✅ Authentication middleware
- ✅ Habit tracking API (CRUD operations)
- ✅ User management endpoints
- ✅ Structured error handling
- ✅ Environment configuration management

### 📦 Installation & Setup

```bash
# Node.js 23.6.0 or higher is required
git clone https://github.com/sulzh/api-design-node-v5.git
cd api-design-node-v5

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

### 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio UI
- `npm test` - Run tests with Vitest

### 🌿 Branch Structure

- **`main`** - Production-ready code (stable version)
- **`development`** - Active development branch
- `lesson-X` - Course checkpoints for reference
- `lesson-X-solution` - Course solutions for comparison
- `live-lesson-X` - Live-coded solutions from course sessions

### 📚 Learning Outcomes

This project demonstrates proficiency in:
- RESTful API architecture and best practices
- TypeScript for type-safe backend development
- Database design and ORM usage
- Authentication and security implementation
- Middleware patterns and request handling
- Error handling and validation
- Environment-based configuration
- Database migrations and schema management

### 📖 Course Resources

- [Course Notes](https://api-design-with-node-v5.super.site/)
- [Frontend Masters Course](https://frontendmasters.com/courses/api-design-nodejs-v5)
