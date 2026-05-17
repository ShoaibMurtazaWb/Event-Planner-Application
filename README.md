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
