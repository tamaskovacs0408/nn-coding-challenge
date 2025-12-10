import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import "./FeatureCard.scss"

export default function FeatureCard({icon: Icon, text}: { icon: LucideIcon, text: string}) {
  return (
    <Card className="feature-card">
      <CardHeader className="feature-card__header">
        <Icon size={32} />
        <CardTitle>{text}</CardTitle>
      </CardHeader>
    </Card>
  )
}