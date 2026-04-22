// ─────────────────────────────────────────────────────────────────
//  scripts/generate-favicon.mjs — génération des icônes de marque
//  à partir du PNG source `public/images/logo/logo-mark.png`.
//
//  Sortie (convention Next.js App Router auto-détectée) :
//    - app/favicon.ico      : 16/32/48 multi-résolution (legacy + crawlers)
//    - app/icon.png         : 512×512 transparent (navigateurs modernes)
//    - app/apple-icon.png   : 180×180 sur fond blanc (iOS ne gère pas l'alpha)
//
//  Ré-exécuter après toute mise à jour du logo-mark source :
//    $ node scripts/generate-favicon.mjs
// ─────────────────────────────────────────────────────────────────

import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { writeFile } from 'node:fs/promises'

const SRC = 'public/images/logo/logo-mark.png'
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

// 1. icon.png — 512×512 transparent
await sharp(SRC)
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('app/icon.png')
console.log('✓ app/icon.png (512×512)')

// 2. apple-icon.png — 180×180 avec fond blanc plein (iOS compose mal l'alpha).
//    Padding 12% pour éviter que le logo touche les bords du masque iOS.
await sharp(SRC)
  .resize(156, 156, { fit: 'contain', background: WHITE })
  .extend({ top: 12, bottom: 12, left: 12, right: 12, background: WHITE })
  .flatten({ background: WHITE })
  .png()
  .toFile('app/apple-icon.png')
console.log('✓ app/apple-icon.png (180×180, fond blanc)')

// 3. favicon.ico — multi-résolution 16/32/48 (le navigateur choisit la meilleure taille)
const [png16, png32, png48] = await Promise.all([
  sharp(SRC).resize(16, 16).png().toBuffer(),
  sharp(SRC).resize(32, 32).png().toBuffer(),
  sharp(SRC).resize(48, 48).png().toBuffer(),
])
const ico = await pngToIco([png16, png32, png48])
await writeFile('app/favicon.ico', ico)
console.log('✓ app/favicon.ico (16/32/48 multi-résolution)')
