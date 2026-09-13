import { Construction } from "lucide-react"

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4 animate-in fade-in duration-500">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
        <Construction className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-md">
        Esta página está atualmente em desenvolvimento e estará disponível em breve!
      </p>
    </div>
  )
}
