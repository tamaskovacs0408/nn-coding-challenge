"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "./error.scss";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  const router = useRouter();

  return (
    <main className="error-page">
      <Card className="error-page__card">
        <CardHeader>
          <CardTitle className="error-page__title">
            Unexpected error happened
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="error-page__text">
            An unexpected error happened while loading the page.
            Please try again or return to the home page
          </p>

          <p className="error-page__debug">
            {error.message}
          </p>

          <div className="error-page__actions">
            <Button onClick={() => reset()}>
              Try again
            </Button>

            <Button variant="secondary" onClick={() => router.push("/")}>
              Home page
            </Button>

          </div>
        </CardContent>
      </Card>
    </main>
  )
}