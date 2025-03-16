# Conference Agenda Analyzer

A web application that analyzes conference agendas in PDF format using Venice.ai's powerful AI models.

## Features

- Upload and analyze PDF conference agendas
- Visualize topics being discussed in an interactive graph
- Identify key speakers and their affiliations
- Research speakers using Venice.ai's web search capability
- Generate comprehensive summaries of conference agendas

## How to Use

1. Open `index.html` in a web browser
2. Enter your Venice.ai API key (or use the provided one)
3. Click "Validate & Load Models" to verify your API key
4. Upload a PDF conference agenda
5. Select a Venice.ai model to use for analysis
6. Click "Analyze Agenda" to process the PDF
7. View the results in the various sections

## PDF Processing Notes

This application extracts text from PDFs for analysis. For best results:

- Use PDFs with selectable text rather than scanned documents
- For image-based PDFs or complex layouts, you may get better results by converting your PDF to an image first using a tool like ImageMagick:
  ```
  convert -density 150 document.pdf -quality 90 document.png
  ```

## Requirements

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A Venice.ai API key
- Internet connection to access the Venice.ai API

## Technologies Used

- HTML, CSS, and JavaScript
- Bootstrap 5 for UI components
- D3.js for interactive visualizations
- PDF.js for PDF text extraction
- Venice.ai API for AI-powered analysis

## Troubleshooting

- If you see a 400 Bad Request error, your PDF might be too large or complex. Try using a smaller PDF or extracting just the relevant pages.
- If text extraction is poor, the PDF might be image-based. Consider converting it to an image first as noted above.
- If the API key validation fails, ensure you have a valid Venice.ai API key with sufficient credits.

## License

MIT License 