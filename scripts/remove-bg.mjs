import sharp from 'sharp'
import { readdir, writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const LOGOS_DIR = './public/logos'
const THRESHOLD = 200  // pixels > 200 sur R,G,B → transparents

async function removeBg(filePath) {
  const img = sharp(filePath).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels
    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]

    // Pixel blanc ou quasi-blanc → transparent
    if (r > THRESHOLD && g > THRESHOLD && b > THRESHOLD) {
      data[idx + 3] = 0
    }
  }

  const buffer = await sharp(data, { raw: { width, height, channels } })
    .webp({ lossless: true })
    .toBuffer()

  await writeFile(filePath, buffer)
}

const files = (await readdir(LOGOS_DIR)).filter(f => f.endsWith('.webp'))
console.log(`\n🖼  Traitement de ${files.length} logos...\n`)

for (const file of files) {
  const path = join(LOGOS_DIR, file)
  try {
    await removeBg(path)
    console.log(`✅  ${file}`)
  } catch (err) {
    console.log(`❌  ${file} — ${err.message}`)
  }
}

console.log('\n✨ Terminé — fonds blancs supprimés\n')
