# OQ RPI Cable Health Monitoring Dashboard MVP

A professional, enterprise-grade cable health monitoring dashboard designed for OQ RPI (Oman Oil Refineries) that showcases predictive maintenance capabilities for industrial control cables at Sohar and Duqm refineries.

## 🎯 Project Overview

This MVP demonstrates a complete predictive maintenance solution with:
- **Real-time cable health monitoring** across 33 cables
- **AI-powered failure prediction** with confidence scores
- **Bilingual support** (English/Arabic) with full RTL implementation
- **Animated data visualization** with Recharts and interactive maps
- **Cost savings analytics** showing ROI and business impact
- **Work order management** for maintenance scheduling

## ✨ Key Features

### Dashboard
- **KPI Cards**: Total cables, active alerts, system health, monthly savings
- **Interactive Map**: Leaflet-based facility maps for Sohar and Duqm refineries
- **Real-time Alerts Panel**: Live notifications with severity indicators
- **Activity Timeline**: Recent system activities and maintenance logs
- **Demo Scenario**: Simulate cable degradation from healthy → critical

### Cable Detail View
- **Comprehensive Cable Information**: Location, coordinates, installation date
- **Live Sensor Charts**: Temperature, Current, Vibration, PD Level trends
- **AI Prediction Panel**: Failure probability, days to failure, confidence score
- **Maintenance Recommendations**: Actionable insights based on sensor data
- **Cost Impact Analysis**: Estimated repair/replacement costs

### Analytics
- **ROI Calculator**: 600% return on investment
- **Cost Comparison**: Traditional vs Predictive maintenance
- **Historical Trends**: 6-month performance metrics
- **Savings Visualization**: Monthly and annual cost savings

### Maintenance
- **Work Order List**: Filterable by status and priority
- **Technician Assignment**: Assigned personnel and scheduled dates
- **Status Tracking**: Pending, In Progress, Completed, Cancelled
- **Cost Management**: Estimated vs actual costs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/salim/Desktop/هامات"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## 🎨 Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### UI & Visualization
- **Recharts** - Data visualization library
- **Leaflet** - Interactive maps
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icon library

### State Management & Data
- **Zustand** - Lightweight state management
- **date-fns** - Date formatting and manipulation

### Styling Utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes efficiently

## 📱 Features Deep Dive

### 1. Bilingual Support (English/Arabic)
- **Language Toggle**: Switch between English and Arabic in the header
- **RTL Layout**: Automatic right-to-left layout for Arabic
- **Full Translation**: All UI elements, labels, and messages translated
- **Locale-aware Formatting**: Dates, numbers, and currency formatted per locale
- **localStorage Persistence**: Language preference saved across sessions

### 2. Real-time Data Simulation
- **Animated Updates**: Sensor values update every 2 seconds
- **Realistic Noise**: Random variations simulate real-world conditions
- **Trend Analysis**: Historical data (24 hours) for pattern recognition
- **Demo Scenario**: Watch CB-089 degrade in real-time:
  - 0-10s: Healthy → Warning (temperature rises)
  - 10-20s: Warning → Caution (vibration increases)
  - 20s+: Critical status with high failure probability

### 3. Predictive Analytics
- **Failure Probability**: AI-calculated risk percentage (2-95%)
- **Days to Failure**: Estimated time until cable failure
- **Confidence Score**: Model accuracy indicator (85-95%)
- **Threshold Monitoring**: Visual indicators for warning/critical levels

### 4. Interactive Maps
- **Dual Refineries**: Sohar (23.6145, 58.5906) and Duqm (19.6645, 57.8784)
- **Color-coded Markers**: Green (healthy), Yellow (warning), Orange (caution), Red (critical)
- **Click Navigation**: Click any cable marker to view details
- **Zone Filtering**: Filter by refinery or view all
- **Cluster Support**: Efficient rendering of multiple markers

## 🎯 Demo Scenario Walkthrough

### For Presentations and Judges

1. **Start on Dashboard** - Shows healthy system (96% health)
2. **Click "Simulate Alert"** - Triggers CB-089 degradation scenario
3. **Watch Real-time Changes**:
   - Temperature rises from 35°C → 58°C
   - Status changes: Green → Yellow → Orange → Red
   - Alert panel updates with new warnings
   - KPI cards reflect increased active alerts
4. **Navigate to CB-089**:
   - Click on CB-089 in the map or alerts panel
   - View detailed sensor charts showing degradation
   - See AI prediction: 78% failure probability
   - Review maintenance recommendations
5. **Check Analytics** - Show cost savings and ROI metrics
6. **Review Work Orders** - Demonstrate maintenance management
7. **Reset Demo** - Click "Reset Demo" to return to initial state

## 📊 Mock Data

### Cable Distribution
- **Total Cables**: 33 (18 Sohar + 15 Duqm)
- **Status Mix**: 70% Healthy, 20% Warning, 7% Caution, 3% Critical
- **Featured Cable**: CB-089 (Critical status for demo)

### Sensor Ranges
- **Temperature**: 20-63°C (Normal: 20-32°C, Critical: >50°C)
- **Current**: 2-18A (Normal: 2-6A, Critical: >14A)
- **Vibration**: 0.5-12Hz (Normal: 0.5-3Hz, Critical: >8Hz)
- **PD Level**: 10-500pC (Normal: 10-100pC, Critical: >300pC)

### Locations (Arabic Names Included)
- **Sohar**: Unit 200, Unit 300, Power Plant, Control Room, etc.
- **Duqm**: Unit 100, Unit 250, Water Treatment, Flare System, etc.

## 🎨 OQ Brand Colors

```javascript
Navy Blue (Primary): #1E2761
Light Blue (Secondary): #CADCFC
Orange/Gold (Accent): #F9E795
Status Green: #10b981
Status Yellow: #fbbf24
Status Orange: #f97316
Status Red: #ef4444
```

## 📂 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Dashboard (home)
│   ├── cable/[id]/          # Dynamic cable detail pages
│   ├── analytics/           # Analytics & ROI page
│   ├── maintenance/         # Work orders page
│   ├── cables/              # All cables list
│   ├── reports/             # Reports (placeholder)
│   └── settings/            # Settings (placeholder)
├── components/
│   ├── layout/              # Header, Sidebar, AppLayout
│   ├── shared/              # Reusable components
│   ├── dashboard/           # Dashboard-specific components
│   ├── cable/               # Cable detail components
│   ├── analytics/           # Analytics components
│   └── maintenance/         # Maintenance components
├── lib/
│   ├── data/                # Mock data generators
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Internationalization
│   ├── store/               # Zustand state management
│   └── utils/               # Utility functions
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## 🔧 Configuration Files

- **tailwind.config.ts** - Custom OQ theme, colors, animations
- **tsconfig.json** - TypeScript configuration
- **next.config.js** - Next.js configuration
- **package.json** - Dependencies and scripts

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Dynamic Imports**: Leaflet map lazy-loaded for SSR compatibility
- **Optimized Rendering**: React.memo and useCallback where needed
- **Efficient State**: Zustand for minimal re-renders
- **Data Windowing**: Last 50 data points for charts

## 🎭 Demo Tips

### For Best Presentation

1. **Start Fresh**: Reset demo before presenting
2. **Use Full Screen**: F11 for immersive experience
3. **Show Mobile**: Demo responsive design on tablet/phone
4. **Toggle Language**: Demonstrate Arabic support
5. **Click Around**: Show interactive elements and navigation
6. **Explain ROI**: Emphasize 600% ROI and 50% cost savings

### Key Talking Points

- **Predictive vs Reactive**: Show how early detection prevents failures
- **Cost Impact**: 1.2M OMR annual savings
- **Dual Refineries**: Sohar and Duqm coverage
- **Real-time Monitoring**: Live data updates
- **Actionable Insights**: Specific maintenance recommendations
- **Mobile-Ready**: Field technicians can use on tablets

## 🚨 Troubleshooting

### Map Not Loading
- Ensure internet connection for OpenStreetMap tiles
- Check browser console for Leaflet errors
- Leaflet CSS is loaded from CDN in layout.tsx

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

### TypeScript Errors
- Run type check: `npx tsc --noEmit`
- Check import paths use `@/` alias correctly

## 📝 License

This is a demonstration project for OQ RPI.

## 👥 Contact

For questions about this demo, please contact the development team.

---

**Built with ❤️ for OQ RPI Predictive Maintenance Initiative**


