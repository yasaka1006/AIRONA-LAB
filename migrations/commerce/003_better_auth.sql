-- Better Auth tables for COMMERCE_DB (generated via getMigrations; user first for FKs)
-- Apply: wrangler d1 execute airona-commerce --local|--remote --file=./migrations/commerce/003_better_auth.sql

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "user" (
  "id" text not null primary key,
  "name" text not null,
  "email" text not null unique,
  "emailVerified" integer not null,
  "image" text,
  "createdAt" date not null,
  "updatedAt" date not null
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text not null primary key,
  "expiresAt" date not null,
  "token" text not null unique,
  "createdAt" date not null,
  "updatedAt" date not null,
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references "user" ("id") on delete cascade
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" text not null primary key,
  "issuer" text not null,
  "accountId" text not null,
  "providerId" text not null,
  "userId" text not null references "user" ("id") on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" date,
  "refreshTokenExpiresAt" date,
  "scope" text,
  "password" text,
  "createdAt" date not null,
  "updatedAt" date not null
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text not null primary key,
  "identifier" text not null,
  "value" text not null,
  "expiresAt" date not null,
  "createdAt" date not null,
  "updatedAt" date not null
);

CREATE UNIQUE INDEX IF NOT EXISTS "account_issuer_accountId_uidx" on "account" ("issuer", "accountId");
CREATE INDEX IF NOT EXISTS "account_userId_idx" on "account" ("userId");
CREATE INDEX IF NOT EXISTS "session_userId_idx" on "session" ("userId");
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" on "verification" ("identifier");

-- Commerce link to Better Auth user (safe if re-run fails on duplicate column — apply once)
-- D1: run ALTER only if column missing; for fresh DBs after 001, this adds the column.
ALTER TABLE customers ADD COLUMN auth_user_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_auth_user_id
  ON customers(auth_user_id)
  WHERE auth_user_id IS NOT NULL;
