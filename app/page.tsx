import { SiteHeader } from "@/components/site-header"
import { BuscadorSucursales } from "@/components/buscador-sucursales"
import { AlertaInformativa } from "@/components/alerta-informativa"

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col bg-background lg:h-dvh lg:overflow-hidden">
      <SiteHeader />
      {/* Aviso informativo (banner turquesa) */}
      <AlertaInformativa />
      <BuscadorSucursales />
    </main>
  )
}

