import { getSession } from "@/lib/auth/server";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function HomePage() {
  const session = await getSession();
  const user = session.data?.user;

  return (
    <div className="flex flex-col gap-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(168,117,255,0.22),_transparent_35%),linear-gradient(135deg,_#16161f,_#0d0d12)] px-6 py-20 text-center shadow-2xl md:px-12">
        <Badge variant="secondary" className="mb-5">
          Event planning made simple
        </Badge>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Create events, share invites, and track RSVPs in one place.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          Plan private gatherings, team dinners, meetups, and community events.
          Generate invite links, collect responses, and manage attendance from a
          simple dashboard.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {user ? (
            <>
              <Button asChild size="lg">
                <Link href="/events/new">Create Event</Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg">
                <Link href="/auth/sign-in">Get Started</Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/events">Browse Events</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-6">
            <p className="text-3xl font-bold">01</p>
            <h3 className="mt-4 text-lg font-semibold">Create an Event</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add event title, date, location, and description within seconds.
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-6">
            <p className="text-3xl font-bold">02</p>
            <h3 className="mt-4 text-lg font-semibold">Share Invite Link</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate a public RSVP link and share it with your guests.
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-6">
            <p className="text-3xl font-bold">03</p>
            <h3 className="mt-4 text-lg font-semibold">Track Responses</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              View Going, Maybe, and Not Going counts directly from your dashboard.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Feature Section */}
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Badge variant="outline" className="mb-4">
            Why use it?
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to manage event attendance.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Instead of manually asking people on WhatsApp or messages, create one
            event link and let guests submit their RSVP themselves.
          </p>

          <div className="mt-6 grid gap-3">
            <FeatureItem text="Authenticated dashboard for event owners" />
            <FeatureItem text="Public RSVP page for guests" />
            <FeatureItem text="Invite link generation and copy-to-clipboard" />
            <FeatureItem text="Live-style RSVP counts after submissions" />
          </div>
        </div>

        <Card className="border-white/10 bg-[#16161f] shadow-xl">
          <CardContent className="p-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Event</p>
                  <h3 className="text-xl font-semibold">Team Dinner</h3>
                </div>
                <Badge>RSVP</Badge>
              </div>

              <div className="space-y-3">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">Friday, 8:00 PM</p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Lahore, Pakistan</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <MiniStat label="Going" value="18" />
                  <MiniStat label="Maybe" value="6" />
                  <MiniStat label="Not Going" value="3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
        <h2 className="text-3xl font-bold">Ready to plan your next event?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Create your event, generate an invite link, and start collecting RSVPs
          today.
        </p>

        <div className="mt-6">
          <Button asChild size="lg">
            <Link href={user ? "/events/new" : "/auth/sign-in"}>
              {user ? "Create Event" : "Get Started"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs">
        ✓
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 p-3 text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}