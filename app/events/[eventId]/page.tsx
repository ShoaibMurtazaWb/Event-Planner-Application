import EeventDetailContent from '@/components/event-detail-content';
import { getSession } from '@/lib/auth/server';

export default async function EventDetailPage({params}: {params: Promise<{eventId: string}>}) {

    const {eventId} = await params;
    const session = await getSession()

    if(!session.data?.user){
        console.error("User not Logged In")
        throw new Error("Unauthorized Access")
    }


  return (
    <EeventDetailContent userId={session.data?.user.id} eventId={eventId} />
  )
}
