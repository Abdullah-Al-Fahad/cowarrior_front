# PostgreSQL Migration Guide

This document outlines the steps to connect your local PostgreSQL database and migrate the data from `db.json`.

## 1. Set Up Your Database Connection

- Open the `.env` file in the root of the project.
- This file contains a variable `DATABASE_URL`.
- You need to replace the placeholder value with the connection string for your local PostgreSQL database.

The format of the connection string is:
`postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

For example:
`postgresql://postgres:mysecretpassword@localhost:5432/mydb`

**Important:** Make sure the `.env` file is listed in your `.gitignore` file to prevent committing your database credentials.

## 2. Create the Database Schema

Once your `DATABASE_URL` is configured, you need to create the database tables based on the Prisma schema.

Run the following command in your terminal:

```bash
npx prisma db push
```

This command will inspect your `prisma/schema.prisma` file and create the corresponding tables in your PostgreSQL database.

## 3. Migrate the Data

After the database schema is created, you can migrate the data from the `db.json` file into your new database tables.

Run the following command in your terminal:

```bash
npm run db:seed
```

This command executes the `prisma/seed.ts` script, which reads the `db.json` file and populates your PostgreSQL database with all the data.

---

After completing these steps, your application will be fully configured to use PostgreSQL as its database. All API routes have been refactored to query the database using Prisma.