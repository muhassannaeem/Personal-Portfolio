"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

const ADMIN_KEY = "abc123" // Match the server-side key

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const key = searchParams.get("key")
    if (key === ADMIN_KEY) {
      setIsAuthorized(true)
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This admin dashboard requires a secret key. Please use the correct URL with the admin key parameter.
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full"
            >
              Return to Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
