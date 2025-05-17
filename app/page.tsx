import { redirect } from "next/navigation"
import ClientWebsiteBuilder from "../components/client-website-builder"

export default function Home() {
  // Check if we're on the landing page route
  const isLandingPage = false // This would be determined by your routing logic

  if (isLandingPage) {
    redirect("/landing")
  }

  return (
    <main className="min-h-screen">
      <ClientWebsiteBuilder />
    </main>
  )
}
