"use client"

import { LocateFixed, MapPinned, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FormularioBusquedaProps {
  inputComuna: string
  sugerencias: string[]
  onChangeInput: (valor: string) => void
  onSubmit: (e: React.FormEvent) => void
  onSeleccionarSugerencia: (comuna: string) => void
  /** Si se pasa, muestra el botón "Usar mi ubicación" a la derecha. */
  onUsarUbicacion?: () => void
}

export function FormularioBusqueda({
  inputComuna,
  sugerencias,
  onChangeInput,
  onSubmit,
  onSeleccionarSugerencia,
  onUsarUbicacion,
}: FormularioBusquedaProps) {
  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-3">
      <label htmlFor="buscador-comuna" className="sr-only">
        Buscar comuna o localidad
      </label>

      {/* Fila principal: input + botón buscar + botón ubicación */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="buscador-comuna"
            value={inputComuna}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder="Ingresa comuna, localidad o dirección"
            className="h-11 pl-9 pr-9"
            autoComplete="off"
          />

          {inputComuna && (
            <button
              type="button"
              onClick={() => onChangeInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer z-10"
              aria-label="Limpiar búsqueda"
            >
              <X className="size-4" />
            </button>
          )}

          {/* Dropdown de sugerencias */}
          {sugerencias.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
              {sugerencias.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => onSeleccionarSugerencia(c)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-popover-foreground hover:bg-accent"
                  >
                    <MapPinned
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>



        {/* Botón Usar mi ubicación (solo si se entrega el callback) */}
        {onUsarUbicacion && (
          <button
            type="button"
            onClick={onUsarUbicacion}
            className="flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <LocateFixed className="size-4 text-primary" aria-hidden="true" />
            <span className="hidden sm:inline">Usar mi ubicación</span>
          </button>
        )}
      </div>
    </form>
  )
}
