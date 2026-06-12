"use client"

import { useState } from "react"
import { Info, X } from "lucide-react"

export function AlertaInformativa() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-banner text-banner-foreground">
      <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4 px-5 py-3 lg:px-8">
        <div className="flex items-start gap-3 text-[13px] font-medium">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p className="leading-relaxed">
            Informamos que nuestra sucursal Laja no se encuentra operativa por motivos de fuerza mayor.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-sm p-1 transition-colors hover:bg-black/10"
          aria-label="Cerrar aviso"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
