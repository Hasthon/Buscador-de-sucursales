const fs = require('fs');

const tipos = ["tradicional", "24/7", "soy-starken", "red-alianzas"];
const estados = ["abierto", "cerrado", "con_retraso"];

// Coordinates of major Chilean cities
const ciudades = {
  "Santiago Centro": { lat: -33.4489, lng: -70.6693, count: 15 },
  "Providencia": { lat: -33.4326, lng: -70.6120, count: 15 },
  "Las Condes": { lat: -33.4116, lng: -70.5695, count: 15 },
  "Maipú": { lat: -33.5152, lng: -70.7630, count: 15 },
  "La Florida": { lat: -33.5222, lng: -70.5982, count: 10 },
  "Puente Alto": { lat: -33.6146, lng: -70.5755, count: 10 },
  "Iquique": { lat: -20.2133, lng: -70.1503, count: 4 },
  "Antofagasta": { lat: -23.6509, lng: -70.3975, count: 5 },
  "La Serena": { lat: -29.9027, lng: -71.2519, count: 4 },
  "Valparaíso": { lat: -33.0472, lng: -71.6127, count: 5 },
  "Viña del Mar": { lat: -33.0246, lng: -71.5518, count: 5 },
  "Concepción": { lat: -36.8201, lng: -73.0444, count: 6 },
  "Temuco": { lat: -38.7359, lng: -72.5904, count: 5 },
  "Valdivia": { lat: -39.8196, lng: -73.2452, count: 3 },
  "Puerto Montt": { lat: -41.4693, lng: -72.9424, count: 3 }
};

function randomOffset() {
  return (Math.random() - 0.5) * 0.04; // Very small offset (around 2km) to stay on land
}

let branches = [];
let idCounter = 1;

for (const [ciudad, data] of Object.entries(ciudades)) {
  for (let i = 0; i < data.count; i++) {
    const lat = data.lat + randomOffset();
    const lng = data.lng + randomOffset();
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    
    const isStgo = ["Santiago Centro", "Providencia", "Las Condes", "Maipú", "La Florida", "Puente Alto"].includes(ciudad);
    
    branches.push(`  {
    id: "br-${idCounter++}",
    nombre: "Starken ${ciudad} ${i + 1}",
    direccion: "Av. Principal ${Math.floor(Math.random() * 1000)}, ${ciudad}",
    comuna: "${ciudad}",
    region: "${isStgo ? 'Región Metropolitana' : 'Regiones'}",
    lat: ${lat.toFixed(4)},
    lng: ${lng.toFixed(4)},
    tipo: "${tipo}",
    estado: "${estado}",
    horario: horarioEstandar,
    modalidades: ["Envío de paquetes", "Retiro", "Encomiendas"],
    dimensionesMax: "150 x 80 x 80 cm · hasta 50 kg",
    ultimoRetiro: "18:30",
    telefono: "+56 9 ${Math.floor(Math.random() * 8999 + 1000)} ${Math.floor(Math.random() * 8999 + 1000)}",
  }`);
  }
}

const fileContent = `import type { HorarioDia, Sucursal } from "./types"

const horarioEstandar: HorarioDia[] = [
  { dia: "Lunes", apertura: "09:00", cierre: "19:00" },
  { dia: "Martes", apertura: "09:00", cierre: "19:00" },
  { dia: "Miércoles", apertura: "09:00", cierre: "19:00" },
  { dia: "Jueves", apertura: "09:00", cierre: "19:00" },
  { dia: "Viernes", apertura: "09:00", cierre: "19:00" },
  { dia: "Sábado", apertura: "10:00", cierre: "14:00" },
  { dia: "Domingo", apertura: "Cerrado", cierre: "Cerrado" },
]

export const sucursales: Sucursal[] = [
${branches.join(',\n')}
]

export const comunasDisponibles = Array.from(new Set(sucursales.map((s) => s.comuna))).sort()
`;

fs.writeFileSync('lib/sucursales.ts', fileContent);
