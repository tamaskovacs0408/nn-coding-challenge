import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import "./ActionCard.scss"

export default function ActionCard({title, btnTitle, url}: {title: string, btnTitle: string, url: string}   ) {
  return (
    <Card className='action-card'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={url} className='action-card__btn'>
          {btnTitle}
        </Link>
      </CardContent>
    </Card>
  );
}
