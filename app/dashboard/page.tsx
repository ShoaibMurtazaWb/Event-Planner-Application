import DashboardContent from '@/components/DashboardContent'
import { getSession } from '@/lib/auth/server'
export default async function DashboardPage() {
  const session = await getSession()
  if (!session.data?.user){
    throw new Error("Unauthorized access")
  }

  return (
    <DashboardContent userId={session.data?.user.id} name={session.data?.user.name} />
  )
}
