import * as React from "react"
import { Mic, Send, Paperclip, Sparkles, StopCircle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

interface ChatAreaProps {
  onToggleSetup: () => void
}

type Message = {
  id: string
  role: "user" | "assistant"
  type: "text" | "audio" | "image"
  content: string | React.ReactNode
  timestamp: string
}

export function ChatArea({ onToggleSetup }: ChatAreaProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      role: "user",
      type: "text",
      content: "Criar anuncio, curso desenvolvimento com IA",
      timestamp: "19:44"
    },
    {
      id: "2",
      role: "assistant",
      type: "text",
      content: (
        <div className="space-y-2">
          <p>Ótimo! Para criar o anúncio ideal, me conta rapidinho:</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Qual o <strong>nome do curso</strong> e o que ele ensina na prática (ex: criar sites, automações, apps)?</li>
            <li>Quem é o <strong>público-alvo</strong> (ex: iniciantes, programadores, donos de negócio)?</li>
            <li>Qual o <strong>preço/oferta</strong> e o <strong>orçamento diário</strong> que pretende investir?</li>
          </ol>
        </div>
      ),
      timestamp: "19:44"
    },
    {
      id: "3",
      role: "user",
      type: "text",
      content: "Criar SaaS",
      timestamp: "19:44"
    },
    {
      id: "4",
      role: "assistant",
      type: "text",
      content: (
        <div className="space-y-2">
          <p>Perfeito! Mas preciso de alguns detalhes pra montar uma campanha que converte:</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Qual o <strong>nome do SaaS</strong> e o que ele faz (qual problema resolve)?</li>
            <li>Quem é o <strong>público-alvo</strong> (ex: donos de loja, agências, freelancers)?</li>
            <li>Qual a <strong>oferta</strong> (teste grátis, demo, desconto) e o <strong>orçamento diário</strong>?</li>
          </ol>
          <p className="mt-2 text-zinc-400">Obs: aqui no Lunna Ads sou especializado em anúncios — então vamos focar na campanha do seu SaaS. 🚀</p>
        </div>
      ),
      timestamp: "19:44"
    }
  ])
  
  const [inputText, setInputText] = React.useState("")
  const [isRecording, setIsRecording] = React.useState(false)
  const [recordingTime, setRecordingTime] = React.useState(0)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    
    const tick = () => {
      setRecordingTime((prev) => prev + 1)
      timeoutId = setTimeout(tick, 1000)
    }

    if (isRecording) {
      timeoutId = setTimeout(tick, 1000)
    } else {
      setRecordingTime(0)
    }
    
    return () => clearTimeout(timeoutId)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const handleSendText = () => {
    if (!inputText.trim()) return
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "user",
      type: "text",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInputText("")
  }

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "user",
        type: "audio",
        content: `Áudio gravado (${formatTime(recordingTime)})`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } else {
      setIsRecording(true)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "user",
        type: "image",
        content: imageUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }
  }

  return (
    <div className="flex flex-col h-full relative font-sans bg-[#121212]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <div className="w-4 h-4 bg-blue-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  <div className="w-2 h-2 bg-white rounded-sm -rotate-45" />
                </div>
              </div>
            )}
            
            <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`p-4 rounded-2xl shadow-sm ${
                msg.role === "user" 
                  ? "bg-[#6366f1] text-white rounded-tr-sm" 
                  : "bg-[#1c1f26] text-zinc-200 rounded-tl-sm border border-white/5"
              }`}>
                {msg.type === "text" && (
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                )}
                {msg.type === "audio" && (
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <Button size="icon" variant="secondary" className="w-8 h-8 shrink-0 rounded-full bg-black/20 text-white hover:bg-black/30 border-none">
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-current border-b-[5px] border-b-transparent ml-1" />
                    </Button>
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-white rounded-full" />
                    </div>
                    <span className="text-xs font-medium">{typeof msg.content === 'string' ? msg.content.match(/\((.*?)\)/)?.[1] || "0:00" : "0:00"}</span>
                  </div>
                )}
                {msg.type === "image" && (
                  <div className="relative rounded-lg overflow-hidden max-w-[250px]">
                    <img src={msg.content as string} alt="Upload" className="w-full h-auto object-cover" />
                  </div>
                )}
                <div className={`text-[10px] mt-2 ${msg.role === "user" ? "text-white/70 text-right" : "text-zinc-500 text-left"}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Floating Action Banner at bottom of messages */}
        <div className="max-w-4xl mx-auto w-full mt-6">
          <div className="bg-[#111827] border border-blue-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-blue-900/10">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-100">Campanha Pronta para Revisão</h4>
                <p className="text-xs text-zinc-400 mt-1">A IA gerou as configurações e copies da campanha "[nome]".</p>
              </div>
            </div>
            <Button onClick={onToggleSetup} className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white shrink-0 shadow-md h-9">
              Abrir Configurações
            </Button>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 shrink-0 bg-[#121212]">
        <div className="max-w-3xl mx-auto relative flex items-center bg-[#1a1a1a] rounded-full p-1.5 border border-white/5 transition-colors focus-within:border-white/20">
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {!isRecording && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="shrink-0 text-zinc-400 hover:text-white rounded-full w-10 h-10 hover:bg-white/5 ml-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5" />
            </Button>
          )}

          {isRecording ? (
            <div className="flex-1 flex items-center gap-3 px-4 h-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium text-red-500">Gravando áudio... {formatTime(recordingTime)}</span>
            </div>
          ) : (
            <Input 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendText()
                }
              }}
              placeholder="Descreva sua campanha ou envie uma mensagem..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 px-3 shadow-none text-sm text-zinc-100 placeholder:text-zinc-500 h-10"
            />
          )}

          <div className="flex items-center gap-2 shrink-0 mr-1">
            <Button type="button" size="icon" variant="ghost" onClick={handleToggleRecord} className={`rounded-full w-10 h-10 hover:bg-white/5 ${isRecording ? "text-red-500 hover:text-red-400" : "text-zinc-400 hover:text-white"}`}>
              {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Button type="button" size="icon" onClick={handleSendText} className="rounded-xl w-10 h-10 bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-sm">
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
