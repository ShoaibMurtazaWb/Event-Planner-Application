import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createEventAction } from '@/lib/actions/events'
import Link from 'next/link'
import { Form } from 'radix-ui'
import React from 'react'

export default function NewEventPage() {
    return (
        <div className='mx-auto w-full max-w-2xl '>
            <Card>
                <CardHeader>
                    <CardTitle>Create Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createEventAction} className='flex flex-col gap-3'>
                        <Field className='gap-1'>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Team Dinner..."
                            />
                        </Field>
                        <Field className='gap-1'>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Optional details about the event"
                            />
                        </Field>
                        <Field className='gap-1'>
                            <FieldLabel htmlFor="location">Location</FieldLabel>
                            <Input
                                id="location"
                                name='location'
                                placeholder="Optional location"
                            />
                        </Field>
                        <Field className='gap-1'>
                            <FieldLabel htmlFor="eventDate">Date and Time</FieldLabel>
                            <Input
                                id="eventDate"
                                name='eventDate'
                                type='datetime-local'
                            />
                            <FieldDescription>Optional, you can set this later.</FieldDescription>
                        </Field>

                        <div className='flex items-center gap-3'>
                            <Button type='submit'>Create event</Button>
                            <Button type='button' variant={"outline"} asChild>
                                <Link href={"/dashboard"}>Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
