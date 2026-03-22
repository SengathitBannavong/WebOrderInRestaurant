# Web Order in Restaurant

A full-stack web application that allows restaurant customers
to browse the menu and place orders from their table,
while staff manage incoming orders through an admin dashboard.

Built as a course project for Web Technologies & e-Services (IT4409) at HUST.

## Features

**Customer side**
- Browse menu by category
- Add items to cart and place order
- Track order status in real time

**Admin side**
- View and manage incoming orders
- Update order status (pending → preparing → ready)
- Manage menu items

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, pure CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Runtime | Node.js |

## Architecture
```
client/
  customer/   ← React app for customers
  admin/      ← React app for staff
server/       ← Express.js REST API + MongoDB
```

## Run Locally
```bash
# Install dependencies
npm install

# Start server
node server/index.js

# Start frontend (in separate terminal)
cd customer && npm start
```

Or on Windows:
```bash
run.bat
```

## What I Learned

- Building a REST API with Express.js and MongoDB
- Managing state across multiple React components
- Designing separate frontend views for different user roles
- Full-stack project structure and deployment basics

## Status

Archived — completed as a university course project.
