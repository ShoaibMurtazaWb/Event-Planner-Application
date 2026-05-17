import { AccountView, accountViewPaths } from "@neondatabase/auth/react";

export function generateStatisParams(){
    return Object.values(accountViewPaths).map(path => ({path}))
}


export default async function AccountPage({params}: {params: Promise<{path: string}>}) {
    const {path} = await params
  return (  
    <main className="container p-4 md:p-6">
      <AccountView path={path}></AccountView>
    </main>
  )
}
