"use server"

import { redirect } from "next/navigation"
import { getSession } from "../auth/server"
import prisma from "../prisma"
import { RsvpStatus } from "@/app/generated/prisma/enums"
import { revalidatePath } from "next/cache"

function parseCreateEvent(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim()

    if (title.length < 3 || title.length > 120) {
        throw new Error("Title must be between 3 and 120 characters.")
    }

    const description = String(formData.get("description") ?? "").trim()
    const location = String(formData.get("location") ?? "").trim()
    const eventDate = String(formData.get("eventDate") ?? "").trim()

    return {
        title,
        description: description.length ? description.slice(0, 200) : null,
        location: location.length ? location.slice(0, 200) : null,
        eventDate: eventDate.length ? new Date(eventDate) : null
    }
}

const RSVP_STATUSES = ["going", "maybe", "not_going"] as const;

function isRsvpStatus(s: string): s is RsvpStatus{
    return (RSVP_STATUSES as readonly string[]).includes(s);
}


function parseRsvp(formData: FormData){
    const name = String(formData.get("name") ?? "").trim();
    if(name.length < 2 || name.length > 120){
        throw new Error("Name must be between 2 and 120 characters")
    }

    const email = String(formData.get("email") ?? "").trim()
    if(email.length < 3 || email.length > 320 || !email.includes("@")){
        throw new Error("Please enter a valid email.")
    }

    const status = String(formData.get("status") ?? "").trim()
    if(!isRsvpStatus(status)){
        throw new Error("Invalid RSVP status.")
    }

    return {name, email, status};
}



export async function createEventAction(formData: FormData) {
    console.log("CREATE EVENT ACTION CALLED");
    
    const session = await getSession()
    const userId = session.data?.user.id

    if (!userId) {
        redirect("/auth/sign-in");
    }

    const input = parseCreateEvent(formData)
    let createdId: string
    try {
        const created = await prisma.event.create({
            data: {
                ownerUserId: userId,
                title: input.title,
                description: input.description,
                location: input.location,
                eventDate: input.eventDate,
            },
        })
        createdId = created.id
    } catch (err) {
        console.log("CREATE EVENT ACTION CALLED");
        throw new Error("Failed to create event.");

    }
    redirect(`/events/${createdId}`);
}



export async function createInviteAction(eventId: string) {

    const session = await getSession()
    const userId = session.data?.user.id
    const owns = await prisma.event.findFirst({where: {id: eventId, ownerUserId: userId}})
    if (!userId) {
        redirect("/auth/sign-in");
    }
    if (!owns) {
        throw new Error("Event not found.")
    }

    const token = crypto.randomUUID().replace(/-/g, "")

    await prisma.eventInvite.upsert({
        where: {eventId},
        create: {eventId, token},
        update: {token}
    })

    redirect(`/events/${eventId}`);
    
    
}




export async function submitOrUpdateRsvpAction(token: string, formData: FormData) {
    const input = parseRsvp(formData)

    const invite = await prisma.eventInvite.findFirst({
        where: { token },
        select: {
            id: true,
            event: {
                select: {
                    id: true,
                },
            },
        },
    })

    if (!invite) {
        throw new Error("Invite link is invalid.")
    }

    const eventId = invite.event.id
    const emailNormalized = input.email.toLowerCase()

    await prisma.eventRsvp.upsert({
        where: {
            eventId_emailNormalized: {
                eventId,
                emailNormalized,
            },
        },
        create: {
            eventId,
            inviteId: invite.id,
            name: input.name,
            email: input.email,
            emailNormalized,
            status: input.status as RsvpStatus,
        },
        update: {
            name: input.name,
            status: input.status,
            respondedAt: new Date(),
        },
    })

    revalidatePath(`/events/${eventId}`)
    revalidatePath("/dashboard")

    redirect(`/invite/${token}?submitted=1`)
}