# Aviation MRO Gap Analysis Tool

A comprehensive self-assessment tool for aviation maintenance organizations to identify compliance gaps and operational improvements.

## Features

- **13 Comprehensive Assessment Sections** covering:
  - Company information
  - Certifications & standards (FAA Part 145, EASA, AS9100, IS-BAO)
  - Aircraft types & services
  - Software & process management
  - Parts & inventory control
  - Quality systems & tool control
  - Safety Management System (SMS)
  - Training & competency
  - Calibration programs
  - CAPA (Corrective & Preventive Action)
  - Regulatory compliance & audits
  - Production control
  - Metrics & financials

- **Automated Gap Analysis** - Identifies compliance gaps and operational inefficiencies
- **Professional PDF Reports** - Download comprehensive analysis with prioritized recommendations
- **Confidential & Free** - No data storage, completely client-side analysis
- **Modern UX** - Clean, responsive interface with dark navy theme and glassmorphism effects

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **PDF Generation**: pdf-lib
- **Icons**: React Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── sections/          # Assessment form sections
│   ├── LandingPage.tsx    # Home page
│   ├── AssessmentForm.tsx # Multi-step form
│   └── ResultsPage.tsx    # Analysis results
├── services/
│   ├── gapAnalysisService.ts # Gap analysis logic
│   └── pdfService.ts         # PDF generation
├── store/
│   └── assessmentStore.ts    # Zustand state management
├── types/
│   └── assessment.ts         # TypeScript interfaces
├── App.tsx                   # Main app component
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## Deployment

This project is configured for Vercel deployment:

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` configuration handles SPA routing.

## Assessment Coverage

The tool evaluates organizations across:

- **Regulatory Compliance**: FAA Part 145, EASA, AS9100, IS-BAO
- **Quality Systems**: CAPA, calibration, training, tool control
- **Operations**: Production control, work orders, capacity utilization
- **Documentation**: Process documentation, parts tracking, inventory management
- **Quality Metrics**: First pass rate, rework rates, audit findings
- **Financial Analysis**: Revenue per technician, job margins, cost optimization

## Gap Analysis Methodology

The analysis examines:
1. Certification status and compliance gaps
2. Quality system effectiveness
3. Training program adequacy
4. Calibration and equipment control
5. Tool control and FOD prevention
6. Production efficiency metrics
7. Financial performance indicators
8. Audit history and findings patterns

Results include:
- Overall compliance score (0-100%)
- Critical, high, medium, and low severity gaps
- Prioritized recommendations with timelines
- Estimated cost savings opportunities
- Actionable implementation roadmap

## License

MIT License

## Contact

Aviation Quality Company
For questions or support, contact through the assessment form.
