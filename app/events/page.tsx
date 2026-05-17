import Link from "next/link"

import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth/server"
import { countByStatus } from "@/components/DashboardContent"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

type AuthUser = {
  id: string
  name: string | null
  email: string | null
}

export default async function EventsPage() {
  const session = await getSession()
  const currentUserId = session.data?.user?.id

  const rows = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      ownerUserId: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      createdAt: true,
      invite: {
        select: {
          token: true,
        },
      },
      rsvps: {
        select: {
          status: true,
        },
      },
    },
  })

  const ownerIds = [...new Set(rows.map((event) => event.ownerUserId))]

  const users =
    ownerIds.length > 0
      ? await prisma.$queryRaw<AuthUser[]>`
        SELECT id::text as id, name, email
        FROM neon_auth."user"
        WHERE id = ANY(${ownerIds}::uuid[])
      `
      : []

  const usersById = new Map(users.map((user) => [user.id, user]))

  const events = rows.map((event) => {
    const counts = countByStatus(event.rsvps)
    const owner = usersById.get(event.ownerUserId)

    return {
      id: event.id,
      ownerUserId: event.ownerUserId,
      ownerName: owner?.name ?? null,
      ownerEmail: owner?.email ?? null,
      isOwner: currentUserId === event.ownerUserId,
      title: event.title,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate ? event.eventDate.toISOString() : null,
      inviteToken: event.invite?.token ?? null,
      goingCount: counts.goingCount,
      maybeCount: counts.maybeCount,
      notGoingCount: counts.notGoingCount,
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">All Events</h1>
          <p className="text-sm text-muted-foreground">
            Explore events created by all users.
          </p>
        </div>

        {currentUserId ? (
          <Button asChild>
            <Link href="/events/new">Create Event</Link>
          </Button>
        ) : null}
      </div>

      {events.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No events found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No events have been created yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="gap-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold">
                      {event.title}
                    </CardTitle>

                    {event.isOwner ? (
                      <Badge variant="outline" className="w-fit">
                        Your Event
                      </Badge>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Created by:{" "}
                        {event.ownerName ?? event.ownerEmail ?? "Unknown user"}
                      </p>
                    )}
                  </div>

                  {event.isOwner ? (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/events/${event.id}`}>Manage</Link>
                    </Button>
                  ) : event.inviteToken ? (
                    <Button size="sm" asChild>
                      <Link href={`/invite/${event.inviteToken}`}>RSVP</Link>
                    </Button>
                  ) : (
                    <Badge variant="secondary">No Invite</Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Going: {event.goingCount}</Badge>
                  <Badge variant="secondary">Maybe: {event.maybeCount}</Badge>
                  <Badge variant="outline">
                    Not Going: {event.notGoingCount}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleString()
                    : "No date selected"}
                  {event.location ? ` - ${event.location}` : ""}
                </p>

                {event.description ? (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                ) : null}
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}