import { Button } from './ui/button'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import type { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums"
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { notFound } from 'next/navigation'
import { Field, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { submitOrUpdateRsvpAction } from '@/lib/actions/events'


export default async function InviteRsvpContent({ token, submitted }: { token: string, submitted: boolean }) {

    const row = await prisma.eventInvite.findFirst({
        where: { token },
        include: {
            event: {
                select: {
                    id: true, 
                    title: true,
                    description: true,
                    location: true,
                    eventDate: true,
                }
            }
        }
    })

    if(!row){ notFound() }
    
    const e = row.event;
    const event = {
        title: e.title,
        description: e.description,
        location: e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null
    }

    const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token)


    return (
        <div className='mx-auto w-full max-w-2xl'>
           <Card>
            <CardHeader className='space-y-3'>
                <Badge variant={"secondary"} className='w-fit'>RSVP</Badge>
                <CardTitle>{event.title}</CardTitle>
                <p className='text-sm text-muted-foreground'>
                    {event.eventDate ? new Date(event.eventDate).toLocaleString() : "No date selected"}
                    {event.location ? ` - ${event.location}` : ''}
                </p>
                {event.description ? <p className="text-sm text-muted-foreground">{event.description}</p> : null} 
            </CardHeader>
            <CardContent>

                {submitted ? 
                <p className='mb-4 p-3 rounded-md border border-accent/50 bg-accent/15 '>
                    Thanks your RSVP has been submitted (or updated).
                </p> :
                null }

                <form action={submitRsvpForToken} className='space-y-3'>
                    <Field>
                        <FieldLabel htmlFor='name'>Name</FieldLabel>
                        <Input type='text' id='name' name='name' required placeholder='Your name' />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='email'>Email</FieldLabel>
                        <Input type='email' id='email' name='email' required placeholder='you@example.com' />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='status'>Attendence</FieldLabel>
                            <Select name='status' required>
                                <SelectTrigger id='status'>
                                    <SelectValue placeholder="Choose attendance status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="going">Going</SelectItem>
                                        <SelectItem value="maybe">Maybe Going</SelectItem>
                                        <SelectItem value="not_going">Not Going</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                    </Field>
                    <Button type='submit'>Submit RSVP</Button>
                </form>
            </CardContent>
           </Card>
        </div>
    )
}
