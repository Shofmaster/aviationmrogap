import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { GapAnalysisResult } from '../types/assessment';

export async function generatePDFReport(result: GapAnalysisResult): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 595; // A4 width in points
  const pageHeight = 842; // A4 height in points
  const margin = 50;
  const contentWidth = pageWidth - 2 * margin;

  // Colors
  const navy = rgb(0.118, 0.161, 0.231);
  const skyBlue = rgb(0.055, 0.647, 0.914);
  const gold = rgb(0.961, 0.620, 0.043);
  const textColor = rgb(0.2, 0.2, 0.2);
  const grayText = rgb(0.5, 0.5, 0.5);

  // Add first page
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;

  // Title Page
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: navy,
  });

  page.drawText('AeroGap Assessment', {
    x: margin,
    y: yPosition,
    size: 32,
    font: boldFont,
    color: skyBlue,
  });
  yPosition -= 50;

  page.drawText('Gap Analysis Report', {
    x: margin,
    y: yPosition,
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  yPosition -= 100;

  page.drawText(result.companyName, {
    x: margin,
    y: yPosition,
    size: 20,
    font: font,
    color: rgb(1, 1, 1),
  });
  yPosition -= 30;

  page.drawText(`Analysis Date: ${new Date(result.analysisDate).toLocaleDateString()}`, {
    x: margin,
    y: yPosition,
    size: 12,
    font: font,
    color: grayText,
  });
  yPosition -= 100;

  // Score Box
  page.drawRectangle({
    x: margin,
    y: yPosition - 80,
    width: contentWidth,
    height: 100,
    borderColor: skyBlue,
    borderWidth: 2,
  });

  page.drawText('Overall Compliance Score', {
    x: margin + 20,
    y: yPosition - 30,
    size: 14,
    font: font,
    color: rgb(1, 1, 1),
  });

  page.drawText(`${result.overallScore}%`, {
    x: margin + 20,
    y: yPosition - 60,
    size: 36,
    font: boldFont,
    color: gold,
  });

  const scoreColor = result.overallScore >= 80 ? rgb(0, 1, 0) : result.overallScore >= 60 ? rgb(1, 0.65, 0) : rgb(1, 0, 0);
  page.drawRectangle({
    x: margin + 200,
    y: yPosition - 70,
    width: (contentWidth - 220) * (result.overallScore / 100),
    height: 20,
    color: scoreColor,
  });

  // Add second page for gaps and recommendations
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  yPosition = pageHeight - margin;

  // Header
  page.drawText('Identified Gaps & Recommendations', {
    x: margin,
    y: yPosition,
    size: 20,
    font: boldFont,
    color: navy,
  });
  yPosition -= 40;

  // Summary insights
  if (result.summaryInsights && result.summaryInsights.length > 0) {
    page.drawText('Executive Summary', {
      x: margin,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: textColor,
    });
    yPosition -= 25;

    for (const insight of result.summaryInsights) {
      if (yPosition < margin + 100) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      const lines = wrapText(insight, contentWidth - 20, font, 10);
      for (const line of lines) {
        page.drawText(`• ${line}`, {
          x: margin + 10,
          y: yPosition,
          size: 10,
          font: font,
          color: textColor,
        });
        yPosition -= 15;
      }
    }
    yPosition -= 20;
  }

  // Critical Gaps
  if (result.criticalGaps && result.criticalGaps.length > 0) {
    page.drawText('Critical & High-Priority Gaps', {
      x: margin,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: textColor,
    });
    yPosition -= 25;

    for (const gap of result.criticalGaps) {
      if (yPosition < margin + 150) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      // Severity badge
      const severityColor = gap.severity === 'critical' ? rgb(1, 0, 0) :
        gap.severity === 'high' ? rgb(1, 0.5, 0) :
        gap.severity === 'medium' ? rgb(1, 0.84, 0) : rgb(0, 0.5, 1);

      page.drawRectangle({
        x: margin,
        y: yPosition - 15,
        width: 60,
        height: 15,
        color: severityColor,
      });

      page.drawText(gap.severity.toUpperCase(), {
        x: margin + 5,
        y: yPosition - 12,
        size: 8,
        font: boldFont,
        color: rgb(1, 1, 1),
      });

      // Gap title
      page.drawText(gap.title, {
        x: margin + 70,
        y: yPosition - 12,
        size: 11,
        font: boldFont,
        color: textColor,
      });
      yPosition -= 20;

      // Category
      page.drawText(`Category: ${gap.category}`, {
        x: margin + 10,
        y: yPosition,
        size: 9,
        font: font,
        color: grayText,
      });
      yPosition -= 15;

      // Description
      const descLines = wrapText(gap.description, contentWidth - 20, font, 9);
      for (const line of descLines) {
        page.drawText(line, {
          x: margin + 10,
          y: yPosition,
          size: 9,
          font: font,
          color: textColor,
        });
        yPosition -= 12;
      }
      yPosition -= 5;

      // Impact
      if (gap.impact) {
        page.drawText('Impact:', {
          x: margin + 10,
          y: yPosition,
          size: 9,
          font: boldFont,
          color: textColor,
        });
        yPosition -= 12;

        const impactLines = wrapText(gap.impact, contentWidth - 20, font, 9);
        for (const line of impactLines) {
          page.drawText(line, {
            x: margin + 10,
            y: yPosition,
            size: 9,
            font: font,
            color: textColor,
          });
          yPosition -= 12;
        }
      }

      yPosition -= 15;
    }
  }

  // Recommendations
  if (result.recommendations && result.recommendations.length > 0) {
    if (yPosition < margin + 100) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }

    yPosition -= 20;
    page.drawText('Prioritized Recommendations', {
      x: margin,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: textColor,
    });
    yPosition -= 25;

    for (const rec of result.recommendations) {
      if (yPosition < margin + 120) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      // Priority badge
      const priorityColor = rec.priority === 'high' ? rgb(1, 0, 0) :
        rec.priority === 'medium' ? rgb(1, 0.84, 0) : rgb(0, 1, 0);

      page.drawRectangle({
        x: margin,
        y: yPosition - 15,
        width: 60,
        height: 15,
        color: priorityColor,
      });

      page.drawText(rec.priority.toUpperCase(), {
        x: margin + 5,
        y: yPosition - 12,
        size: 8,
        font: boldFont,
        color: rgb(1, 1, 1),
      });

      // Rec title
      page.drawText(rec.area, {
        x: margin + 70,
        y: yPosition - 12,
        size: 11,
        font: boldFont,
        color: textColor,
      });
      yPosition -= 25;

      // Recommendation
      const recLines = wrapText(rec.recommendation, contentWidth - 20, font, 9);
      for (const line of recLines) {
        page.drawText(line, {
          x: margin + 10,
          y: yPosition,
          size: 9,
          font: font,
          color: textColor,
        });
        yPosition -= 12;
      }

      yPosition -= 5;

      // Expected impact
      if (rec.expectedImpact) {
        page.drawText(`Expected Impact: ${rec.expectedImpact}`, {
          x: margin + 10,
          y: yPosition,
          size: 8,
          font: font,
          color: grayText,
        });
        yPosition -= 12;
      }

      // Timeline
      if (rec.implementationTimeline) {
        page.drawText(`Timeline: ${rec.implementationTimeline}`, {
          x: margin + 10,
          y: yPosition,
          size: 8,
          font: font,
          color: grayText,
        });
        yPosition -= 12;
      }

      yPosition -= 15;
    }
  }

  // Footer on last page
  page.drawText('© 2026 AeroGap | Confidential', {
    x: margin,
    y: 30,
    size: 8,
    font: font,
    color: grayText,
  });

  // Save and download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeFileName(result.companyName || 'Gap_Analysis')}_Report.pdf`;
  link.click();
  URL.revokeObjectURL(url);

  return pdfBytes;
}

function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);

    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

export function sanitizeFileName(name: string): string {
  const cleaned = name
    .replace(/[\s]+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return cleaned.length > 0 ? cleaned : 'Gap_Analysis';
}
