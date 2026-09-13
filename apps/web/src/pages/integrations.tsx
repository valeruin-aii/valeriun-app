import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { RefreshCw, Unplug, Settings, Sparkles, CheckCircle2, AlertCircle, Link2, Key } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Input } from "@workspace/ui/components/input"
import {
  fetchCurrentIntegration,
  fetchConnectedAdAccounts,
  getMetaAuthUrl,
  handleMetaCallback,
  triggerMetaSync,
  disconnectMetaIntegration,
  type MetaIntegration,
  type MetaAdAccount,
} from "@/lib/meta-api"

export function IntegrationsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = React.useState<"todas" | "meta" | "google">("meta")

  // Estado da integracao Meta
  const [integration, setIntegration] = React.useState<MetaIntegration | null>(null)
  const [accounts, setAccounts] = React.useState<MetaAdAccount[]>([])
  const [loading, setLoading] = React.useState(true)
  const [syncing, setSyncing] = React.useState(false)
  const [feedbackMessage, setFeedbackMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Token manual opcional
  const [showManualInput, setShowManualInput] = React.useState(false)
  const [manualToken, setManualToken] = React.useState("")

  // Carrega dados iniciais do Supabase
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      const [currentInt, currentAccounts] = await Promise.all([
        fetchCurrentIntegration(),
        fetchConnectedAdAccounts(),
      ])
      setIntegration(currentInt)
      setAccounts(currentAccounts)
    } catch (err: any) {
      console.error("Erro ao carregar dados:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Evita execucao duplicada em React StrictMode
  const processingCodeRef = React.useRef<string | null>(null)

  // Processa callback OAuth se houver parametro ?code= na URL
  React.useEffect(() => {
    const code = searchParams.get("code")
    if (code) {
      if (processingCodeRef.current === code) {
        return
      }
      processingCodeRef.current = code

      const processCode = async () => {
        try {
          setSyncing(true)
          setFeedbackMessage({ type: "success", text: "Processando autorizacao da Meta..." })
          
          // Limpa parametros da URL imediatamente
          searchParams.delete("code")
          searchParams.delete("state")
          setSearchParams(searchParams, { replace: true })

          await handleMetaCallback(code)
          setFeedbackMessage({ type: "success", text: "Conta Meta conectada e contas sincronizadas com sucesso." })
          await loadData()
        } catch (err: any) {
          if (err.message?.includes("This authorization code has been used")) {
            await loadData()
            setFeedbackMessage({ type: "success", text: "Conta Meta conectada e contas sincronizadas com sucesso." })
          } else {
            setFeedbackMessage({ type: "error", text: err.message || "Erro ao conectar conta da Meta." })
          }
        } finally {
          setSyncing(false)
        }
      }
      processCode()
    } else {
      loadData()
    }
  }, [searchParams, setSearchParams, loadData])

  // Iniciar fluxo OAuth
  const handleConnectOAuth = async () => {
    try {
      setSyncing(true)
      setFeedbackMessage(null)
      const url = await getMetaAuthUrl(window.location.origin + "/integracoes")
      window.location.href = url
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "Falha ao gerar URL de autorizacao." })
      setSyncing(false)
    }
  }

  // Sincronizar contas (usando token salvo no Supabase ou inserido)
  const handleSync = async (customToken?: string) => {
    try {
      setSyncing(true)
      setFeedbackMessage(null)
      await triggerMetaSync(customToken)
      setFeedbackMessage({ type: "success", text: "Contas de anuncios sincronizadas com sucesso." })
      setShowManualInput(false)
      setManualToken("")
      await loadData()
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "Erro ao sincronizar com a Meta." })
    } finally {
      setSyncing(false)
    }
  }

  // Desconectar integracao
  const handleDisconnect = async () => {
    if (!confirm("Deseja realmente desconectar a conta da Meta? As contas vinculadas serao removidas.")) {
      return
    }
    try {
      setSyncing(true)
      await disconnectMetaIntegration()
      setIntegration(null)
      setAccounts([])
      setFeedbackMessage({ type: "success", text: "Conta Meta desconectada com sucesso." })
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err.message || "Erro ao desconectar integracao." })
    } finally {
      setSyncing(false)
    }
  }

  // Contas Google estaticas para exibicao de portfolio
  const googleAccounts = [
    {
      company: "Dr. Implantes",
      segment: "Rede Odontologica",
      accountName: "Google Search Local SP",
      accountId: "492-381-0021",
      bm: "MCC Agencia Central",
      platform: "Google Ads",
      initials: "DI",
      isGoogle: true,
      status: "Ativa",
    },
    {
      company: "TechStore E-com",
      segment: "Varejo Eletronico",
      accountName: "Shopping & Performance Max",
      accountId: "812-401-9231",
      bm: "MCC Agencia Central",
      platform: "Google Ads",
      initials: "TE",
      isGoogle: true,
      status: "Ativa",
    },
    {
      company: "EcoClean Solar",
      segment: "Energia Sustentavel",
      accountName: "Geracao de Leads B2B",
      accountId: "301-842-1994",
      bm: "MCC Agencia Central",
      platform: "Google Ads",
      initials: "ES",
      isGoogle: true,
      status: "Ativa",
    },
  ]

  const isConnected = !!integration || accounts.length > 0

  return (
    <div className="w-full p-4 md:p-8 pt-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
          CONFIGURACOES DO WORKSPACE / <span className="text-blue-500">CANAIS & CONTAS</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
          Integracoes & Contas de Anuncios
        </h1>
        <p className="text-sm text-muted-foreground">
          Conecte seus canais de trafego pago e gerencie os acessos de Agentes Autonomos de IA.
        </p>
      </div>

      {/* FEEDBACK BANNER */}
      {feedbackMessage && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border text-sm transition-all ${
            feedbackMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}
        >
          {feedbackMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="font-medium flex-1">{feedbackMessage.text}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 font-semibold"
          >
            Fechar
          </button>
        </div>
      )}

      {/* TABS */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("todas")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "todas"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveTab("meta")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
            activeTab === "meta"
              ? "bg-[#0064e0] text-white"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Meta Ads
        </button>
        <button
          onClick={() => setActiveTab("google")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "google"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Google Ads
        </button>
      </div>

      {/* META ADS INTEGRATION CARD */}
      <div className="border border-border/60 rounded-2xl p-6 bg-background shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0064e0]/10 text-[#0064e0] rounded-xl flex items-center justify-center font-bold text-xl">
              M
            </div>
            <div>
              <h3 className="text-lg font-bold">Meta Ads</h3>
              <p className="text-sm text-muted-foreground">Facebook & Instagram Marketing API</p>
            </div>
          </div>
          {isConnected ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              Sincronizado
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              Nao Conectado
            </div>
          )}
        </div>

        {/* Informacoes da Conexao */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-border/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${integration?.facebook_user_id || "meta"}`} />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  {integration?.facebook_user_name || "Conta Meta Ads"}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {integration?.facebook_user_id
                    ? `ID do Perfil: ${integration.facebook_user_id}`
                    : "Credenciais de API cadastradas no Supabase"}
                </p>
              </div>
            </div>

            <div className="text-xs font-medium text-right">
              <span className="text-muted-foreground block">
                {accounts.length} {accounts.length === 1 ? "conta ativa importada" : "contas ativas importadas"}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                {isConnected ? "Sincronizacao automatica habilitada" : "Aguardando conexao"}
              </span>
            </div>
          </div>

          {/* Form de Token Manual Expansivel */}
          {showManualInput && (
            <div className="mt-4 pt-4 border-t border-border/40 space-y-3">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-muted-foreground" /> Inserir Token de Acesso da Meta
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="EAA..."
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="text-xs font-mono h-9"
                />
                <Button
                  onClick={() => handleSync(manualToken)}
                  disabled={!manualToken || syncing}
                  className="bg-[#0064e0] hover:bg-[#0052c2] text-white h-9 text-xs"
                >
                  Salvar e Sincronizar
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Insira o token gerado no Graph API Explorer para sincronizar as contas de anuncios imediatamente.
              </p>
            </div>
          )}
        </div>

        {/* Botoes de Acao */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {!isConnected ? (
            <>
              <Button
                onClick={handleConnectOAuth}
                disabled={syncing}
                className="flex-1 bg-[#0064e0] hover:bg-[#0052c2] text-white h-10 shadow-sm"
              >
                <Link2 className="w-4 h-4 mr-2" /> Conectar Conta Meta (OAuth)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSync()}
                disabled={syncing}
                className="h-10 text-xs font-semibold"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-2 ${syncing ? "animate-spin" : ""}`} />
                Sincronizar via Supabase
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowManualInput(!showManualInput)}
                className="h-10 text-xs text-muted-foreground"
              >
                Inserir Token
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => handleSync()}
                disabled={syncing}
                className="flex-1 bg-[#0064e0] hover:bg-[#0052c2] text-white h-10 shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Sincronizando Contas..." : "Sincronizar Contas"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowManualInput(!showManualInput)}
                className="h-10 text-xs text-muted-foreground"
              >
                Atualizar Token
              </Button>
              <Button
                variant="secondary"
                onClick={handleDisconnect}
                disabled={syncing}
                className="px-6 font-medium bg-muted hover:bg-muted/80 h-10 text-destructive hover:text-destructive"
              >
                <Unplug className="w-4 h-4 mr-2" /> Desconectar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* SECAO DA TABELA DE CONTAS */}
      <div className="pt-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-3">
              Contas de Anuncios Cadastradas
              <Badge variant="secondary" className="bg-muted text-muted-foreground font-semibold">
                {activeTab === "meta"
                  ? `${accounts.length} ativas`
                  : activeTab === "google"
                  ? `${googleAccounts.length} ativas`
                  : `${accounts.length + googleAccounts.length} ativas`}
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xl">
              Gerenciamento direto de permissoes, vinculacao a BMs/MCCs e acionamento de Agentes Autonomos.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              onClick={() => handleSync()}
              disabled={syncing}
              className="h-9 font-medium shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${syncing ? "animate-spin" : ""}`} /> Sincronizar Todas
            </Button>
          </div>
        </div>

        <div className="border border-border/60 rounded-xl overflow-hidden bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Empresa / BM</th>
                  <th className="px-5 py-4">Conta de Anuncios</th>
                  <th className="px-5 py-4">ID da Conta</th>
                  <th className="px-5 py-4">Moeda / Fuso</th>
                  <th className="px-5 py-4">Plataforma</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {/* LINHAS DA META ADS */}
                {(activeTab === "meta" || activeTab === "todas") && (
                  <>
                    {accounts.length === 0 && activeTab === "meta" && (
                      <tr>
                        <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground text-sm">
                          {loading ? (
                            <span>Carregando contas...</span>
                          ) : (
                            <div className="space-y-2">
                              <p>Nenhuma conta de anuncios da Meta vinculada no momento.</p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSync()}
                                disabled={syncing}
                                className="text-xs"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${syncing ? "animate-spin" : ""}`} />
                                Sincronizar Contas da Meta
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                    {accounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                              {acc.name?.substring(0, 2).toUpperCase() || "MA"}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm">
                                {acc.business_name || "Meta Business"}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">Marketing API</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 font-semibold text-sm">{acc.name}</td>
                        <td className="px-5 py-3 text-muted-foreground text-xs font-mono">
                          act_{acc.account_id}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground text-xs">
                          {acc.currency} / {acc.timezone_name}
                        </td>
                        <td className="px-5 py-3">
                          <Badge
                            variant="secondary"
                            className="font-semibold px-2 py-0.5 border-none bg-[#0064e0]/10 text-[#0064e0] dark:bg-[#0064e0]/20"
                          >
                            Meta Ads
                          </Badge>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                acc.is_active ? "bg-emerald-500" : "bg-muted-foreground"
                              }`}
                            ></div>
                            {acc.is_active ? "Ativa" : "Pausada"}
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
                            >
                              <Settings className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}

                {/* LINHAS DO GOOGLE ADS */}
                {(activeTab === "google" || activeTab === "todas") &&
                  googleAccounts.map((acc, i) => (
                    <tr key={`google-${i}`} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {acc.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{acc.company}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{acc.segment}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-semibold text-sm">{acc.accountName}</td>
                      <td className="px-5 py-3 text-muted-foreground text-xs font-mono">{acc.accountId}</td>
                      <td className="px-5 py-3 text-muted-foreground text-xs">BRL / America/Sao_Paulo</td>
                      <td className="px-5 py-3">
                        <Badge
                          variant="secondary"
                          className="font-semibold px-2 py-0.5 border-none bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          Google Ads
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          Ativa
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 text-xs bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 font-bold border-none"
                          >
                            <Sparkles className="w-3 h-3 mr-1" /> Ver Agente IA
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-[11px] text-muted-foreground font-medium">
            Mostrando {accounts.length + (activeTab !== "meta" ? googleAccounts.length : 0)} contas no workspace
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            Credenciais validadas via Supabase
          </div>
        </div>
      </div>
    </div>
  )
}
