import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  tag?: string
}

export function ServiceCard({ icon: Icon, title, description, tag }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="bg-primary p-8 flex items-center justify-center h-32">
        <Icon className="h-16 w-16 text-white" />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {tag && (
          <div className="mt-4">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              {tag}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
