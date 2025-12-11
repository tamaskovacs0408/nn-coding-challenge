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
            Váratlan hiba történt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="error-page__text">
            Váratlan hiba történt az oldal betöltése közben.
            Próbáld újra, vagy térj vissza a főoldalra.
          </p>

          <p className="error-page__debug">
            {error.message}
          </p>

          <div className="error-page__actions">
            <Button onClick={() => reset()}>
              Újrapróbálom
            </Button>

            <Button variant="secondary" onClick={() => router.push("/")}>
              Főoldal
            </Button>

          </div>
        </CardContent>
      </Card>
    </main>
  )
}