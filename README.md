# CableGuard AI - Portable TDR Service System

A professional, enterprise-grade **portable TDR (Time Domain Reflectometry) service system** designed for OQ RPI (Oman Oil Refineries) that enables field technicians to quickly detect, locate, and diagnose faults in buried industrial cables at Sohar and Duqm refineries.

## 🎯 Project Overview

This system demonstrates a **portable field service solution** with:
- **On-demand cable testing** using portable TDR device
- **AI-powered fault classification** with precise location mapping
- **Bilingual support** (English/Arabic) with full RTL implementation
- **Interactive TDR analysis** with signal reflection visualization
- **Comprehensive service reports** for documentation
- **Field-ready interface** optimized for laptop/tablet use
- **Offline capability** - works without internet connection

## ✨ Key Features

### Dashboard
- **Device Status**: Real-time TDR device connection, battery level, signal quality
- **Service KPIs**: Total scans performed, faults detected, time saved
- **Interactive Map**: Visual representation of tested cables across refineries
- **TDR Calculator**: Distance-to-fault calculation with velocity factor
- **Recent Faults**: Quick access to detected issues
- **Demo Scenario**: Simulate TDR test for presentation purposes

### TDR Analysis View
- **Signal Reflection Chart**: Visual TDR trace showing fault location
- **Comprehensive Cable Information**: Location, coordinates, cable specifications
- **Fault Classification**: AI-powered analysis of fault type and severity
- **Distance Calculation**: Precise fault location in meters
- **Action Recommendations**: Specific repair/excavation guidance

### Service Report
- **Comprehensive PDF Report**: Full summary of all cables tested
- **Critical Findings**: Immediate action required items highlighted
- **Maintenance Schedule**: Recommended follow-up actions
- **Executive Summary**: High-level overview for management
- **Print/Export**: Ready for documentation and compliance

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

## 📱 Service Workflow

### Typical Field Service Scenario:

1. **Technician arrives at site** with portable TDR device + laptop
2. **Connect device** - System shows device status (battery, signal quality)
3. **Select cable** to test from map or enter cable ID
4. **Run TDR test** - Device sends signal and captures reflections
5. **AI Analysis** - System classifies fault and calculates distance
6. **View results** - Precise location and recommended action
7. **Generate report** - Comprehensive documentation for all tested cables
8. **Submit findings** - Print/export PDF for records

### Key Benefits:
- ✅ **No excavation guesswork** - Know exact location before digging
- ✅ **Save hours** - Find faults in minutes vs hours of manual inspection
- ✅ **Professional reports** - Auto-generated documentation
- ✅ **Works offline** - No internet required in field
- ✅ **Bilingual** - English/Arabic for local workforce

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)
- TDR device (for actual field use - demo uses simulated data)

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
- **Demo Scenario**: Watch CB-001 degrade in real-time:
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

### For Presentations and Hackathon Judges

1. **Start on Dashboard** - Shows TDR device connected and ready
   - Device status: Connected, 87% battery, 95% signal quality
   - 23 cables already scanned across Sohar and Duqm refineries
   
2. **Click "Simulate Test"** - Demonstrates live TDR testing on CB-001
   - Watch TDR signal trace animate in real-time
   - Fault detected at specific distance
   - AI classifies fault type and severity
   
3. **Explore TDR Calculator**:
   - Input cable parameters (length, velocity factor)
   - Calculate distance to fault
   - See excavation zone visualization
   
4. **Navigate to Cable Details** (CB-001):
   - View TDR signal reflection chart
   - See precise fault location
   - Review AI-powered recommendations
   - Check estimated repair time
   
5. **Generate Service Report**:
   - Click golden "Generate Report" button
   - View comprehensive report for all 23 cables
   - See critical findings highlighted
   - Print/Export for documentation
   
6. **Check Interactive Map**:
   - See all tested cables color-coded by status
   - Click any cable to view its test results
   - Filter by refinery (Sohar/Duqm)
   
7. **Reset Demo** - Return to initial state for next presentation

## 📊 Mock Data

### Cable Distribution
- **Total Cables**: 23 (8 Sohar + 7 Muscat + 8 Duqm)
- **Status Mix**: 70% Healthy, 20% Warning, 7% Caution, 3% Critical
- **Featured Cable**: CB-001 (Critical status for demo)

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


