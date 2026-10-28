"""Gera o manual PDF a partir da fonte Markdown, sem serviços externos."""
from pathlib import Path
from html import escape
import re
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Preformatted, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'docs/manual-qa-automation-lab.pdf'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle('BodyManual', fontName='Helvetica', fontSize=10, leading=15, textColor=colors.HexColor('#334155'), spaceAfter=9))
styles.add(ParagraphStyle('CodeManual', fontName='Courier', fontSize=8, leading=12, backColor=colors.HexColor('#f1f5f9'), borderPadding=10, spaceAfter=14))
styles['Heading1'].textColor = colors.HexColor('#0f766e')
styles['Heading1'].spaceBefore = 18
styles['Heading2'].textColor = colors.HexColor('#0f172a')

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#cbd5e1'))
    canvas.line(2*cm, 1.6*cm, 19*cm, 1.6*cm)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#64748b'))
    canvas.drawString(2*cm, 1.1*cm, 'QA AUTOMATION LAB | Manual de estudo')
    canvas.drawRightString(19*cm, 1.1*cm, str(doc.page))
    canvas.restoreState()

def generate():
    story = [Spacer(1, 3*cm), Paragraph('QA AUTOMATION<br/>LAB', ParagraphStyle('Cover', fontName='Helvetica-Bold', fontSize=38, leading=44, textColor=colors.HexColor('#0f172a'))), Spacer(1, cm), Paragraph('Manual de arquitetura e aprendizado', styles['Heading1']), Paragraph('Playwright + TypeScript<br/>Da regra de negócio à execução no navegador', styles['BodyManual']), Spacer(1, 2*cm), Paragraph('PORTFÓLIO QA / 28 OUT 2026', styles['BodyManual']), PageBreak()]
    paragraph, code = [], []
    in_code = False
    def flush():
        if paragraph:
            story.append(Paragraph(escape(' '.join(paragraph)), styles['BodyManual']))
            paragraph.clear()
    for line in (ROOT / 'docs/MANUAL.md').read_text().splitlines():
        if line.startswith('```'):
            flush()
            if in_code:
                story.append(Preformatted('\n'.join(code), styles['CodeManual'], maxLineLength=88))
                code.clear()
            in_code = not in_code
        elif in_code:
            code.append(line)
        elif line.startswith('#'):
            flush()
            heading = re.sub(r'^#+\s*', '', line)
            story.append(Paragraph(escape(heading), styles['Heading1'] if line.startswith('## ') else styles['Heading2']))
        elif line.startswith('- '):
            flush()
            story.append(Paragraph('• ' + escape(line[2:]), styles['BodyManual']))
        elif not line.strip():
            flush()
        else:
            paragraph.append(line)
    flush()
    doc = SimpleDocTemplate(str(OUTPUT), pagesize=(21*cm, 29.7*cm), rightMargin=2*cm, leftMargin=2*cm, topMargin=2*cm, bottomMargin=2.2*cm, title='QA Automation Lab - Manual', author='QA Automation Lab')
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)

if __name__ == '__main__':
    generate()
