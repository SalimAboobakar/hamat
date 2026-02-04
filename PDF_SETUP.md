# PDF Report Setup Instructions

## Required Libraries

To enable PDF generation, you need to install two libraries:

```bash
npm install jspdf html2canvas
```

## What These Libraries Do:

- **jspdf**: Creates PDF documents from JavaScript
- **html2canvas**: Converts HTML content to canvas/image for PDF export

## After Installation:

1. The "Download PDF" button will work properly
2. PDF will include:
   - OQ logo and branding
   - Professional report layout
   - All cable test results
   - Critical findings highlighted
   - Ready for printing and documentation

## Alternative (if libraries not installed):

The report still works with the "Print" button which uses browser's native print functionality.

## File Size:

- jspdf: ~200KB
- html2canvas: ~100KB
- Total: ~300KB additional bundle size

