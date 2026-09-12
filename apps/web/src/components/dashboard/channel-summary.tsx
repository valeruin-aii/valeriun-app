export function ChannelSummary() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-base font-semibold">Resumo por Posicionamento</h3>
          <p className="text-xs text-muted-foreground">Rateio de orçamento vs geração de valor acumulada na Meta.</p>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">2 Principais</span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Instagram Ads Card */}
        <div className="flex flex-col p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold">IG</div>
              <div>
                <div className="font-semibold text-sm">Instagram (Reels & Stories)</div>
                <div className="text-xs text-muted-foreground">4 conjuntos de anúncios</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ativo
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Investido</div>
              <div className="font-bold text-sm">R$ 32.400</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Conversões</div>
              <div className="font-bold text-sm">2.380</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">ROAS</div>
              <div className="font-bold text-sm text-blue-500">5.2x</div>
            </div>
          </div>
        </div>

        {/* Facebook Feed Card */}
        <div className="flex flex-col p-4 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">FB</div>
              <div>
                <div className="font-semibold text-sm">Facebook (Feed & Vídeo)</div>
                <div className="text-xs text-muted-foreground">3 conjuntos de anúncios</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ativo
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Investido</div>
              <div className="font-bold text-sm">R$ 16.250</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Conversões</div>
              <div className="font-bold text-sm">1.040</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">ROAS</div>
              <div className="font-bold text-sm text-blue-500">4.4x</div>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="flex gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 mt-2">
          <div className="text-primary mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div>
            <div className="font-semibold text-sm text-foreground mb-1">Oportunidade Detectada</div>
            <div className="text-xs text-muted-foreground">Instagram Reels apresenta ROAS 18% superior neste ciclo. Recomenda-se migrar 15% da verba remanescente para escala vertical em vídeos curtos.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
