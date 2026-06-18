# Udhaar Book

Udhaar Book is a simple and modern credit ledger website designed to help users track money they lend to others, monitor repayments, and stay aware of overdue balances.

## About the Website

This project allows you to:
- Add new credit entries with borrower details, amount lent, amount returned, and due date.
- Track outstanding balances and overdue records.
- View quick summary statistics such as total given, total recovered, remaining balance, and overdue count.
- Search entries by name.
- Export the ledger data to CSV for reporting.

## Features

- Dashboard with key financial insights
- Add, edit, and delete credit records
- Search and filter records easily
- Automatic sorting for priority and due dates
- Clean UI for managing personal or small business lending records

## Tech Stack

- Frontend: React + Vite
- Styling: Custom CSS
- Backend: Express.js
- Database: MongoDB

## Project Structure

- `frontend/` - all frontend React/Vite files (`src/`, `public/`, config files)
- `backend/` - server and API logic
- `dist/` - build output

## Getting Started

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Start the frontend

```bash
cd frontend
npm run dev
```

### 3. Start the backend server

From the project root:

```bash
node backend/server.js
```

## Environment Setup

Create a `.env` file and configure your MongoDB connection:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/credit-book
```

## Purpose

This website is useful for anyone who wants a clean way to manage lending records without using spreadsheets or manual notebooks.
