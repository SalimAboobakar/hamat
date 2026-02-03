# 🚀 Quick Start Guide - OQ RPI Dashboard

## ✅ Setup Complete!

Your OQ RPI Cable Health Monitoring Dashboard is ready!

## 🌐 Access the Application

The development server is running at:
**http://localhost:3000**

Open this URL in your web browser to start using the dashboard.

## 🎯 First Steps

### 1. Explore the Dashboard
- View the main dashboard with KPI cards
- See 33 cables distributed across Sohar and Duqm refineries
- Check the interactive map with color-coded cable markers
- Review active alerts in the right panel

### 2. Try the Demo Scenario
1. Click the **"Simulate Alert"** button in the top-right corner
2. Watch as **CB-001** degrades from healthy to critical status
3. Observe real-time changes in:
   - Temperature rising from 35°C → 58°C
   - Status changes: Green → Yellow → Orange → Red
   - Alert panel updating with warnings
   - KPI cards reflecting changes
4. Click **"Reset Demo"** to return to the initial state

### 3. Navigate Cable Details
- Click on any cable marker on the map
- OR click on an alert in the alerts panel
- View detailed sensor charts (Temperature, Current, Vibration, PD Level)
- See AI-powered failure prediction
- Review maintenance recommendations

### 4. Check Analytics
- Navigate to **Analytics** in the sidebar
- View ROI analysis (600% return)
- See cost savings comparison (50% reduction)
- Review historical trends over 6 months

### 5. Review Work Orders
- Navigate to **Maintenance** in the sidebar
- Filter work orders by status and priority
- View technician assignments and scheduled dates
- See cost estimates for maintenance activities

### 6. Test Language Support
- Click the **language toggle** (EN/ع) in the header
- Switch between English and Arabic
- Notice the RTL layout change for Arabic
- All text, dates, and numbers are localized

## 📱 Pages Available

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `/` | Main overview with KPIs, map, and alerts |
| **Cables** | `/cables` | List view of all monitored cables |
| **Cable Detail** | `/cable/[id]` | Individual cable monitoring (e.g., `/cable/CB-001`) |
| **Analytics** | `/analytics` | Business intelligence and ROI analysis |
| **Maintenance** | `/maintenance` | Work order management and scheduling |
| **Reports** | `/reports` | Coming soon |
| **Settings** | `/settings` | Coming soon |

## 🎨 Key Features to Demo

### For Judges/Executives

1. **Real-time Monitoring** ⏱️
   - Watch live sensor data updates every 2 seconds
   - Animated charts with smooth transitions
   - Status indicators with pulsing critical alerts

2. **Predictive Analytics** 🤖
   - AI-powered failure probability (78% for CB-001)
   - Days to failure countdown
   - Confidence scores (85-95%)

3. **Cost Savings** 💰
   - 1.2M OMR annual savings
   - 600% ROI
   - 2-month payback period
   - 50% reduction in maintenance costs

4. **Bilingual Support** 🌍
   - Full English and Arabic translation
   - RTL layout for Arabic
   - Locale-aware formatting

5. **Interactive Maps** 🗺️
   - Sohar Refinery: 23.6145°N, 58.5906°E
   - Duqm Refinery: 19.6645°N, 57.8784°E
   - Click-to-navigate functionality

## 🎬 Demo Script (5 minutes)

### Minute 1: Dashboard Overview
"This is the OQ RPI Cable Health Monitoring Dashboard. We're monitoring 33 cables across Sohar and Duqm refineries. System health is at 96% with 8 active alerts. We've saved 180K OMR this month through predictive maintenance."

### Minute 2: Interactive Map
"The interactive map shows all cables color-coded by health status. Green is healthy, yellow is warning, orange is caution, and red is critical. Let me click on CB-001..."

### Minute 3: Cable Details & AI Prediction
"Here we see detailed sensor readings for CB-001. The AI predicts a 78% failure probability within 18 days. Temperature is elevated at 52°C, and partial discharge levels are critical. The system recommends immediate inspection."

### Minute 4: Live Demo Scenario
"Let me demonstrate the real-time monitoring by simulating an alert. Watch CB-001 degrade in real-time... Temperature is rising, status changing from green to critical. This is how the system detects issues before they become failures."

### Minute 5: Analytics & ROI
"In our analytics dashboard, you can see the business impact. We've achieved 600% ROI with just a 2-month payback period. Annual savings are 1.2 million Omani Rials compared to traditional reactive maintenance. System uptime improved to 97.1%."

## 🔧 Troubleshooting

### Server Not Starting?
```bash
# Kill any existing processes on port 3000
lsof -ti:3000 | xargs kill -9

# Restart the server
npm run dev
```

### Page Not Loading?
1. Check browser console for errors (F12)
2. Ensure you're on `http://localhost:3000` (not https)
3. Clear browser cache and refresh (Cmd+Shift+R or Ctrl+Shift+R)

### Map Not Showing?
- Check internet connection (OpenStreetMap tiles load from CDN)
- Look for Leaflet errors in browser console

## 📞 Quick Tips

- **F11**: Full screen mode for presentations
- **Cmd/Ctrl + Shift + R**: Hard refresh if something looks wrong
- **Responsive Design**: Resize browser to see mobile/tablet layouts
- **Print**: Most pages are print-friendly

## 🌟 Impressive Stats to Highlight

- **33 cables** monitored in real-time
- **96% system health** maintained
- **180K OMR monthly savings**
- **600% ROI** within 2 months
- **50% cost reduction** vs traditional maintenance
- **97.1% uptime** achieved
- **Bilingual** (English/Arabic) with full RTL support
- **Real-time predictions** updated every 2 seconds

## 📚 Additional Resources

- Full documentation: See `README.md`
- Technology stack details: See `package.json`
- Architecture overview: See plan file

---

**Need Help?** Check the browser console (F12) for any error messages.

**Enjoy the demo! 🎉**


