 <!-- 
 # Event Planner Application

A full-stack event planning application built with **Next.js**, **Neon Auth**, **Prisma**, **PostgreSQL**, **Tailwind CSS**, and **shadcn/ui**.

The app allows authenticated users to create events, generate invite links, collect RSVPs from guests, and track attendee responses through a dashboard.

---

## Features

### Authentication

- User sign up and sign in using Neon Auth
- Protected dashboard for logged-in users
- User menu with account actions using Neon Auth UI
- Session-based access control

### Event Management

- Create new events
- Add title, description, location, and event date/time
- View events created by the logged-in user
- View all public events on the Events page
- Open individual event detail pages
- Generate invite links for events

### RSVP System

- Guests can RSVP through a public invite link
- RSVP options:
  - Going
  - Maybe
  - Not Going
- Guests can update their RSVP using the same email
- RSVP counts update for each event
- Duplicate RSVP prevention using normalized email

### Dashboard

- Shows events created by the logged-in user
- Displays RSVP counts for each event
- Quick access to create and manage events

### Events Page

- Shows events created by all users
- Displays creator information
- Allows owners to manage their own events
- Allows non-owners to RSVP if an invite link exists

### UI

- Built with shadcn/ui components
- Tailwind CSS v4 styling
- Dark theme layout
- Responsive design

---

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Prisma 7**
- **PostgreSQL**
- **Neon Database**
- **Neon Auth**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Vercel Deployment**

---

## Project Structure

```txt
app/
  auth/
    [path]/
      page.tsx
  dashboard/
    page.tsx
  events/
    page.tsx
    new/
      page.tsx
    [id]/
      page.tsx
  invite/
    [token]/
      page.tsx
  layout.tsx
  globals.css

components/
  DashboardContent.tsx
  event-detail-content.tsx
  invite-rsvp-content.tsx
  copy-invite-button.tsx
  ui/

lib/
  actions/
    events.ts
  auth/
    client.ts
    server.ts
  prisma.ts

prisma/
  schema.prisma
-->




<div align="center">

# Event Planner & RSVP Management

### Full-Stack Event Platform with Public Invites and RSVP Tracking

Create events, share public invite links, and track guest responses in real time.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://event-planner-app-orcin.vercel.app/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Data Modeling Highlights](#data-modeling-highlights)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Skills Demonstrated](#skills-demonstrated)
- [Status & Roadmap](#status--roadmap)

---

## Overview

A full-stack event platform where authenticated users create events, generate public invite
links, and track RSVP responses from guests. It demonstrates combining private owner workflows
and public guest flows in one secure system.

> Add screenshots of the dashboard and invite page here (e.g. `docs/images/dashboard.png`).

---

## Features

| Area | Description |
| :--- | :--- |
| Authentication | Protected owner routes with session-based auth |
| Event management | Create and manage events with an owner dashboard |
| Public invites | Share token-based invite links for guest RSVP without sign-up |
| RSVP tracking | Guests respond `going`, `maybe`, or `not_going` |
| Data integrity | Duplicate RSVP prevention via normalized-email constraints |
| Live counts | Dynamic RSVP counts with route revalidation |

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Backend | Next.js Server Actions |
| Database | Neon PostgreSQL with Prisma ORM |
| Auth | Neon Auth (session-based) |
| Language | TypeScript |

---

## Architecture

- **Frontend:** Next.js 16 with React 19, styled using Tailwind CSS v4 and shadcn/ui.
- **Backend:** Next.js App Router with Server Actions for mutations and revalidation.
- **Database:** Neon PostgreSQL with Prisma ORM for relational modeling.
- **Auth:** Neon Auth provides session-based authentication and protected routes.

---

## Data Modeling Highlights

- Relational modeling for events, invites, and RSVP records.
- Public token-based guest access flow that requires no account.
- Unique constraints to preserve RSVP integrity per event and email.
- Owner-user scoping for all private management operations.

---

## Project Structure

```text
app/
  auth/[path]/page.tsx
  dashboard/page.tsx
  events/
    page.tsx
    new/page.tsx
    [id]/page.tsx
  invite/[token]/page.tsx
  layout.tsx

components/
  DashboardContent.tsx
  event-detail-content.tsx
  invite-rsvp-content.tsx
  ui/

lib/
  actions/events.ts
  auth/{client,server}.ts
  prisma.ts

prisma/
  schema.prisma
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Configure environment variables for Neon, Prisma, and Neon Auth before launching.

---

## Skills Demonstrated

`Next.js` · `TypeScript` · `PostgreSQL` · `Prisma ORM` · `Neon Auth` · `Server Actions` · `Public/Private Route Architecture` · `Relational Schema Design`

---

## Status & Roadmap

Core event, invite, and RSVP workflows are implemented with secure ownership validation.

Planned improvements:
- Edit and delete events
- Search, filters, and pagination
- Analytics charts and email invitations
