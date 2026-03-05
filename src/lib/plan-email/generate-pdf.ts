/* ------------------------------------------------------------------ */
/*  Generate a branded ALE PDF from a DetailedPlan using pdf-lib       */
/* ------------------------------------------------------------------ */

import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from 'pdf-lib'
import type { DetailedPlan } from './generate-detailed-plan'

// Color palette
const PURPLE = rgb(109 / 255, 40 / 255, 217 / 255) // #6D28D9
const BLUE = rgb(37 / 255, 99 / 255, 235 / 255) // #2563EB
const DARK_HEADING = rgb(30 / 255, 58 / 255, 95 / 255) // #1E3A5F
const BODY_COLOR = rgb(55 / 255, 65 / 255, 81 / 255) // #374151
const ACCENT = rgb(124 / 255, 58 / 255, 237 / 255) // #7C3AED
const WHITE = rgb(1, 1, 1)
const LIGHT_BG = rgb(249 / 255, 250 / 255, 251 / 255) // #F9FAFB
const BORDER_COLOR = rgb(229 / 255, 231 / 255, 235 / 255) // #E5E7EB

const PAGE_WIDTH = 595.28 // A4
const PAGE_HEIGHT = 841.89
const MARGIN = 50
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN

interface DrawContext {
  doc: PDFDocument
  page: PDFPage
  y: number
  fontRegular: PDFFont
  fontBold: PDFFont
  email: string
}

function addNewPage(ctx: DrawContext): void {
  ctx.page = ctx.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  ctx.y = PAGE_HEIGHT - MARGIN
  drawFooter(ctx)
}

function ensureSpace(ctx: DrawContext, needed: number): void {
  if (ctx.y - needed < MARGIN + 30) {
    addNewPage(ctx)
  }
}

function drawFooter(ctx: DrawContext): void {
  const footerY = 25
  const text = `al-enterprise.com  |  Prepared for ${ctx.email}`
  const textWidth = ctx.fontRegular.widthOfTextAtSize(text, 8)
  ctx.page.drawText(text, {
    x: (PAGE_WIDTH - textWidth) / 2,
    y: footerY,
    size: 8,
    font: ctx.fontRegular,
    color: BODY_COLOR,
  })
}

/** Wrap text to fit within maxWidth, returns lines */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = []
  const paragraphs = text.split('\n')

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      lines.push('')
      continue
    }
    const words = paragraph.split(/\s+/)
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const testWidth = font.widthOfTextAtSize(testLine, size)

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)
  }

  return lines
}

function drawWrappedText(
  ctx: DrawContext,
  text: string,
  font: PDFFont,
  size: number,
  color: typeof BODY_COLOR,
  maxWidth: number = CONTENT_WIDTH,
  indent: number = 0,
): void {
  const lineHeight = size * 1.5
  const lines = wrapText(text, font, size, maxWidth - indent)

  for (const line of lines) {
    ensureSpace(ctx, lineHeight)
    if (line === '') {
      ctx.y -= lineHeight * 0.5
      continue
    }
    ctx.page.drawText(line, {
      x: MARGIN + indent,
      y: ctx.y,
      size,
      font,
      color,
    })
    ctx.y -= lineHeight
  }
}

function drawSectionHeading(ctx: DrawContext, title: string): void {
  ensureSpace(ctx, 40)
  ctx.y -= 12

  // Accent bar
  ctx.page.drawRectangle({
    x: MARGIN,
    y: ctx.y - 2,
    width: 4,
    height: 18,
    color: ACCENT,
  })

  ctx.page.drawText(title.toUpperCase(), {
    x: MARGIN + 12,
    y: ctx.y,
    size: 13,
    font: ctx.fontBold,
    color: DARK_HEADING,
  })
  ctx.y -= 24
}

function drawBullet(ctx: DrawContext, text: string, indent: number = 12): void {
  ensureSpace(ctx, 20)
  ctx.page.drawText('\u2022', {
    x: MARGIN + indent,
    y: ctx.y,
    size: 10,
    font: ctx.fontRegular,
    color: ACCENT,
  })
  drawWrappedText(ctx, text, ctx.fontRegular, 10, BODY_COLOR, CONTENT_WIDTH - indent - 12, indent + 12)
}

function drawSolutionCard(
  ctx: DrawContext,
  solution: { name: string; description: string; benefit: string },
): void {
  const cardHeight = 70
  ensureSpace(ctx, cardHeight + 10)

  // Card background
  ctx.page.drawRectangle({
    x: MARGIN,
    y: ctx.y - cardHeight + 14,
    width: CONTENT_WIDTH,
    height: cardHeight,
    color: LIGHT_BG,
    borderColor: BORDER_COLOR,
    borderWidth: 0.5,
  })

  // Solution name
  ctx.page.drawText(solution.name, {
    x: MARGIN + 10,
    y: ctx.y,
    size: 11,
    font: ctx.fontBold,
    color: PURPLE,
  })
  ctx.y -= 16

  // Description (truncated to fit card)
  const descLines = wrapText(solution.description, ctx.fontRegular, 9, CONTENT_WIDTH - 20)
  for (const line of descLines.slice(0, 2)) {
    ctx.page.drawText(line, {
      x: MARGIN + 10,
      y: ctx.y,
      size: 9,
      font: ctx.fontRegular,
      color: BODY_COLOR,
    })
    ctx.y -= 13
  }

  // Benefit
  ctx.page.drawText(`Benefit: ${solution.benefit}`, {
    x: MARGIN + 10,
    y: ctx.y,
    size: 9,
    font: ctx.fontBold,
    color: DARK_HEADING,
  })
  ctx.y -= 20
}

export async function generatePlanPdf(
  plan: DetailedPlan,
  email: string,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica)
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold)

  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  const ctx: DrawContext = { doc, page, y: PAGE_HEIGHT, fontRegular, fontBold, email }

  // ── Header gradient bar ──
  const headerHeight = 100
  const gradientSteps = 20
  const stepWidth = PAGE_WIDTH / gradientSteps

  for (let i = 0; i < gradientSteps; i++) {
    const t = i / (gradientSteps - 1)
    const r = (109 + (37 - 109) * t) / 255
    const g = (40 + (99 - 40) * t) / 255
    const b = (217 + (235 - 217) * t) / 255

    page.drawRectangle({
      x: i * stepWidth,
      y: PAGE_HEIGHT - headerHeight,
      width: stepWidth + 1,
      height: headerHeight,
      color: rgb(r, g, b),
    })
  }

  // Header text
  page.drawText('ALCATEL-LUCENT ENTERPRISE', {
    x: MARGIN,
    y: PAGE_HEIGHT - 35,
    size: 10,
    font: fontBold,
    color: WHITE,
  })

  // Title in header
  const titleLines = wrapText(plan.title, fontBold, 20, CONTENT_WIDTH)
  let titleY = PAGE_HEIGHT - 60
  for (const line of titleLines.slice(0, 2)) {
    page.drawText(line, {
      x: MARGIN,
      y: titleY,
      size: 20,
      font: fontBold,
      color: WHITE,
    })
    titleY -= 26
  }

  ctx.y = PAGE_HEIGHT - headerHeight - 20

  // Footer on first page
  drawFooter(ctx)

  // ── Executive Summary ──
  drawSectionHeading(ctx, 'Executive Summary')
  drawWrappedText(ctx, plan.executiveSummary, fontRegular, 10, BODY_COLOR)
  ctx.y -= 8

  // ── Challenge Analysis ──
  drawSectionHeading(ctx, 'Challenge Analysis')
  drawWrappedText(ctx, plan.challenge.analysis, fontRegular, 10, BODY_COLOR)
  ctx.y -= 8

  // Key Insights
  if (plan.challenge.keyInsights?.length > 0) {
    ensureSpace(ctx, 20)
    ctx.page.drawText('Key Insights:', {
      x: MARGIN,
      y: ctx.y,
      size: 11,
      font: fontBold,
      color: DARK_HEADING,
    })
    ctx.y -= 16

    for (const insight of plan.challenge.keyInsights) {
      drawBullet(ctx, insight)
    }
    ctx.y -= 4
  }

  // Industry Context
  if (plan.challenge.industryContext) {
    drawWrappedText(ctx, plan.challenge.industryContext, fontRegular, 10, BODY_COLOR)
    ctx.y -= 8
  }

  // ── Recommendation ──
  drawSectionHeading(ctx, 'Recommended Solution')
  drawWrappedText(ctx, plan.recommendation.overview, fontRegular, 10, BODY_COLOR)
  ctx.y -= 10

  // Solution cards
  if (plan.recommendation.solutions?.length > 0) {
    for (const solution of plan.recommendation.solutions) {
      drawSolutionCard(ctx, solution)
    }
    ctx.y -= 4
  }

  // Architecture note
  if (plan.recommendation.architectureNote) {
    ensureSpace(ctx, 30)
    ctx.page.drawText('Architecture Note:', {
      x: MARGIN,
      y: ctx.y,
      size: 10,
      font: fontBold,
      color: DARK_HEADING,
    })
    ctx.y -= 14
    drawWrappedText(ctx, plan.recommendation.architectureNote, fontRegular, 9, BODY_COLOR, CONTENT_WIDTH, 0)
    ctx.y -= 8
  }

  // ── Next Steps / Roadmap ──
  drawSectionHeading(ctx, 'Implementation Roadmap')

  if (plan.nextSteps.roadmap?.length > 0) {
    for (const phase of plan.nextSteps.roadmap) {
      ensureSpace(ctx, 50)

      // Phase heading with timeline
      ctx.page.drawText(phase.phase, {
        x: MARGIN + 4,
        y: ctx.y,
        size: 11,
        font: fontBold,
        color: PURPLE,
      })

      const timelineWidth = fontRegular.widthOfTextAtSize(phase.timeline, 9)
      ctx.page.drawText(phase.timeline, {
        x: PAGE_WIDTH - MARGIN - timelineWidth,
        y: ctx.y,
        size: 9,
        font: fontRegular,
        color: BLUE,
      })
      ctx.y -= 16

      drawWrappedText(ctx, phase.description, fontRegular, 9, BODY_COLOR, CONTENT_WIDTH - 8, 4)
      ctx.y -= 8
    }
  }

  // Quick Wins
  if (plan.nextSteps.quickWins?.length > 0) {
    ensureSpace(ctx, 30)
    ctx.page.drawText('Quick Wins:', {
      x: MARGIN,
      y: ctx.y,
      size: 11,
      font: fontBold,
      color: DARK_HEADING,
    })
    ctx.y -= 16

    for (const win of plan.nextSteps.quickWins) {
      drawBullet(ctx, win)
    }
  }

  // ── CTA section ──
  ensureSpace(ctx, 60)
  ctx.y -= 16

  const ctaBoxHeight = 45
  ctx.page.drawRectangle({
    x: MARGIN,
    y: ctx.y - ctaBoxHeight + 14,
    width: CONTENT_WIDTH,
    height: ctaBoxHeight,
    color: PURPLE,
  })

  ctx.page.drawText('Ready to get started? Contact our team for a personalized consultation.', {
    x: MARGIN + 15,
    y: ctx.y - 2,
    size: 11,
    font: fontBold,
    color: WHITE,
  })

  ctx.page.drawText('Visit: al-enterprise.com/contact  |  Email: sales@al-enterprise.com', {
    x: MARGIN + 15,
    y: ctx.y - 20,
    size: 9,
    font: fontRegular,
    color: WHITE,
  })

  const pdfBytes = await doc.save()
  console.log(`[PlanEmail] PDF generated: ${pdfBytes.length} bytes, ${doc.getPageCount()} pages`)
  return pdfBytes
}
