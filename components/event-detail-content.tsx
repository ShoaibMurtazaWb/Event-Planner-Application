import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { countByStatus } from './DashboardContent'
import { Button } from './ui/button'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'
import { Form } from 'radix-ui'
import { createInviteAction } from '@/lib/actions/events'
import { CopyIcon } from 'lucide-react'
import { negative } from 'zod'
import CopyInviteButton from './copy-invite-button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export default async function EeventDetailContent({ userId, eventId }: { userId: string, eventId: string }) {

    const row = await prisma.event.findFirst({
        where: { id: eventId, ownerUserId: userId },
        select: {
            id: true,
            title: true,
            description: true,
            location: true,
            eventDate: true,
            invite: { select: { token: true } },
            rsvps: { select: { status: true } },
        }
    })

    if (!row) { notFound() }

    const counts = countByStatus(row.rsvps)
    const event = {
        id: row.id,
        title: row.title,
        description: row.description,
        location: row.location,
        eventDate: row.eventDate ? row.eventDate.toISOString() : null,
        inviteToken: row.invite?.token ?? null,
        goingCount: counts.goingCount,
        notGoingCount: counts.notGoingCount,
        maybeGoingCount: counts.maybeCount,
    }

    const rsvpRows = await prisma.eventRsvp.findMany({
        where: { eventId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            status: true,
            respondedAt: true
        }
    })

    const rsvps = rsvpRows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        status: r.status,
        respondedAt: r.respondedAt.toISOString()
    }))

    const inviteUrl = event.inviteToken ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}invite/${event.inviteToken}` : null

    const createInviteActionForEvent = createInviteAction.bind(null, eventId);

    async function copyInviteUrl(inviteUrl: string) {
        await window.navigator.clipboard.writeText(inviteUrl)
        alert("Invite url copies to clipboard")
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className='space-y-2'>
                    <h1>{event.title}</h1>
                    <p>{event.eventDate ? new Date(row.eventDate || new Date()).toLocaleString() : "No date selected"} {event.location ? ` - ${event.location}` : ""}</p>
                    {event.description && <p className='max-w-2xl text-sm text-muted-foreground'>{event.description}</p>}
                </div>
                <Button asChild variant={"outline"}>
                    <Link href={"/dashboard"}>Back</Link>
                </Button>
            </div>
            <div className='flex flex-wrap gap-2 text-xs'>
                <Badge>Going: {event.goingCount}</Badge>
                <Badge>Maybe: {event.maybeGoingCount}</Badge>
                <Badge>Not Going: {event.notGoingCount}</Badge>
            </div>

            <Card className='space-y-3 p-3'>
                <CardHeader>Invite Link</CardHeader>
                <CardContent><p>Share this with guests so they can RSVP without creating an account.</p></CardContent>

                <div className='rounded-md border border-border bg-surface p-3 text-sm'>
                    {inviteUrl ?
                        <div className="flex justify-between items-center">
                            {inviteUrl}
                            <CopyInviteButton inviteUrl={inviteUrl} />
                        </div> :
                        <p className='text-sm text-muted-foreground'>Not invite link generate yet.</p>
                    }
                </div>


                <form action={createInviteActionForEvent} className='px-3'>
                    <Button type='submit'>Generate Link</Button>
                </form>
            </Card>

            <Card>
                <CardHeader>
                    Attendees
                </CardHeader>
                <CardContent>
                    {rsvps.length < 1 ?
                        <p className='test-sm text-muted-foreground'>No responses yet.</p> :
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rsvps.map((rsvp) => (
                                    <TableRow key={rsvp.id}>
                                        <TableCell>{rsvp.name}</TableCell>
                                        <TableCell>{rsvp.email}</TableCell>
                                        <TableCell>{<Badge variant={"secondary"}> {rsvp.status === "not_going" ? "not going" : rsvp.status} </Badge>}</TableCell>                                        
                                        <TableCell>{new Date(rsvp.respondedAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </CardContent>
            </Card>
        </div>
    )
}
