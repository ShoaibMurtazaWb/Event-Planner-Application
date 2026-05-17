import { Button } from './ui/button'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import type { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'


export function countByStatus(rspvs: { status: PrismaRsvpStatus }[]) {
    let goingCount = 0
    let maybeCount = 0
    let notGoingCount = 0

    for (const r of rspvs) {
        if (r.status === "going") goingCount += 1;
        if (r.status === "maybe") maybeCount += 1;
        if (r.status === "not_going") notGoingCount += 1;
    }

    return { goingCount, maybeCount, notGoingCount }
}


export default async function DashboardContent({ userId, name }: { userId: string, name: string }) {

    const rows = await prisma.event.findMany({
        where: { ownerUserId: userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            eventDate: true,
            location: true,
            rsvps: { select: { status: true } }
        }
    })

    const events = rows.map((e) => ({
        id: e.id,
        title: e.title,
        location: e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
        ...countByStatus(e.rsvps)
    }))
    return (
        <div className='flex flex-col flex-1 gap-6'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className=''>
                    <h1 className='text-2xl font-semibold tracking-tight'>Your Events</h1>
                    <p>Track attendee responses and manage invite links.</p>
                </div>
                <Button asChild>
                    <Link href="/events/new">Create event</Link>
                </Button>
            </div>

            {/* List of Events */}
            {events.length === 0 ? <Card>
                <CardHeader>
                    <CardTitle>No events yet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-sm text-muted-foreground'>Create your first event to start collecting RSVPs.</p>
                </CardContent>
            </Card> :
                <div className='grid gap-4 md:grid-cols-2'>
                    {events.map((event) => (
                        <Card key={event.id}>
                            <CardHeader className='gap-y-3'>
                                <div className='flex items-start justify-between gap-2'>
                                    <CardTitle className='text-xl font-semibold'>
                                        <Link href={`/events/${event.id}`}>{event.title}</Link>
                                    </CardTitle>
                                    <Button size={"sm"} asChild>
                                        <Link href={`/events/${event.id}`}>Open</Link>
                                    </Button>
                                </div>
                                <div className='space-x-2'>
                                    <Badge variant={"secondary"}>Going: {event.goingCount}</Badge>
                                    <Badge variant={"secondary"}>Maybe: {event.maybeCount}</Badge>
                                    <Badge variant={"secondary"}>Not Going: {event.notGoingCount}</Badge>
                                </div>
                                <p>{event.eventDate ? new Date(event.eventDate).toLocaleString() : "No date selected"}
                                    {event.location ? ` - ${event.location}` : ""}
                                </p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>}
        </div>
    )
}
