import { Cable, CableStatus } from '@/types';

const generateCableData = (): Cable[] => {
  const soharLocations = [
    { en: 'Unit 200 - Distillation Tower', ar: 'وحدة 200 - برج التقطير' },
    { en: 'Unit 300 - Cracking Unit', ar: 'وحدة 300 - وحدة التكسير' },
    { en: 'Unit 400 - Reforming Unit', ar: 'وحدة 400 - وحدة الإصلاح' },
    { en: 'Unit 500 - Hydrotreating', ar: 'وحدة 500 - المعالجة بالهيدروجين' },
    { en: 'Tank Farm A - Storage', ar: 'مزرعة الخزانات أ - التخزين' },
    { en: 'Tank Farm B - Distribution', ar: 'مزرعة الخزانات ب - التوزيع' },
    { en: 'Power Plant - Generator 1', ar: 'محطة الطاقة - المولد 1' },
    { en: 'Power Plant - Generator 2', ar: 'محطة الطاقة - المولد 2' },
  ];

  const muscatLocations = [
    { en: 'Mina Al Fahal - Loading Bay', ar: 'ميناء الفحل - منصة التحميل' },
    { en: 'Control Room - Main', ar: 'غرفة التحكم - الرئيسية' },
    { en: 'Pump Station - North', ar: 'محطة الضخ - الشمال' },
    { en: 'Storage Tank 101', ar: 'خزان التخزين 101' },
    { en: 'Process Unit A', ar: 'وحدة المعالجة أ' },
    { en: 'Utility Station', ar: 'محطة المرافق' },
    { en: 'Pipeline Junction', ar: 'تقاطع خطوط الأنابيب' },
  ];

  const duqmLocations = [
    { en: 'Unit 100 - Primary Processing', ar: 'وحدة 100 - المعالجة الأولية' },
    { en: 'Unit 250 - Catalytic Unit', ar: 'وحدة 250 - الوحدة التحفيزية' },
    { en: 'Unit 350 - Desulfurization', ar: 'وحدة 350 - إزالة الكبريت' },
    { en: 'Tank Farm C - Crude Storage', ar: 'مزرعة الخزانات ج - تخزين الخام' },
    { en: 'Power Substation - Main', ar: 'محطة فرعية - الرئيسية' },
    { en: 'Water Treatment Plant', ar: 'محطة معالجة المياه' },
    { en: 'Flare System - East', ar: 'نظام الحرق - الشرق' },
    { en: 'Pump Station B', ar: 'محطة المضخة ب' },
  ];

  const cables: Cable[] = [];
  let cableNumber = 1;

  // TDR Cable Properties
  const cableTypes = [
    { type: '4-20mA', vf: 0.66 },
    { type: 'Control', vf: 0.70 },
    { type: 'Instrumentation', vf: 0.65 },
    { type: 'Communication', vf: 0.78 }
  ] as const;

  const getRandomCableProps = () => {
    const typeObj = cableTypes[Math.floor(Math.random() * cableTypes.length)];
    return {
      cableType: typeObj.type,
      velocityFactor: typeObj.vf,
      length: Math.floor(50 + Math.random() * 450) // 50m to 500m
    };
  };

  // Helper function to generate realistic sensor values based on status
  const generateSensorValues = (status: CableStatus) => {
    switch (status) {
      case 'critical':
        return {
          temperature: 48 + Math.random() * 15, // 48-63°C
          current: 14 + Math.random() * 4, // 14-18A
          vibration: 8 + Math.random() * 4, // 8-12 Hz
          pdLevel: 300 + Math.random() * 200, // 300-500 pC
          failureProbability: 70 + Math.random() * 25, // 70-95%
          daysToFailure: 10 + Math.floor(Math.random() * 20), // 10-30 days
        };
      case 'caution':
        return {
          temperature: 40 + Math.random() * 8, // 40-48°C
          current: 10 + Math.random() * 4, // 10-14A
          vibration: 5 + Math.random() * 3, // 5-8 Hz
          pdLevel: 200 + Math.random() * 100, // 200-300 pC
          failureProbability: 45 + Math.random() * 25, // 45-70%
          daysToFailure: 30 + Math.floor(Math.random() * 30), // 30-60 days
        };
      case 'warning':
        return {
          temperature: 32 + Math.random() * 8, // 32-40°C
          current: 6 + Math.random() * 4, // 6-10A
          vibration: 3 + Math.random() * 2, // 3-5 Hz
          pdLevel: 100 + Math.random() * 100, // 100-200 pC
          failureProbability: 20 + Math.random() * 25, // 20-45%
          daysToFailure: 60 + Math.floor(Math.random() * 60), // 60-120 days
        };
      default: // healthy
        return {
          temperature: 20 + Math.random() * 12, // 20-32°C
          current: 2 + Math.random() * 4, // 2-6A
          vibration: 0.5 + Math.random() * 2.5, // 0.5-3 Hz
          pdLevel: 10 + Math.random() * 90, // 10-100 pC
          failureProbability: 2 + Math.random() * 18, // 2-20%
          daysToFailure: 120 + Math.floor(Math.random() * 240), // 120-360 days
        };
    }
  };

  // Status distribution: 70% healthy, 20% warning, 7% caution, 3% critical
  const getStatus = (index: number): CableStatus => {
    if (index === 0) return 'critical'; // CB-001 is always critical for demo
    const rand = Math.random();
    if (rand < 0.03) return 'critical';
    if (rand < 0.10) return 'caution';
    if (rand < 0.30) return 'warning';
    return 'healthy';
  };

  // Sohar Refinery cables
  soharLocations.forEach((location, index) => {
    const cableId = `CB-${String(cableNumber).padStart(3, '0')}`;
    const status = index === 0 ? 'critical' : getStatus(cableNumber);
    const sensorValues = generateSensorValues(status);
    const props = getRandomCableProps();
    
    // Sohar Refinery coordinates: ~24.475, 56.635
    const lat = 24.475 + (Math.random() - 0.5) * 0.02;
    const lon = 56.635 + (Math.random() - 0.5) * 0.02;

    cables.push({
      id: cableId,
      location: location.en,
      locationAr: location.ar,
      zone: 'Sohar',
      status,
      temperature: sensorValues.temperature,
      current: sensorValues.current,
      vibration: sensorValues.vibration,
      pdLevel: sensorValues.pdLevel,
      failureProbability: sensorValues.failureProbability,
      daysToFailure: sensorValues.daysToFailure,
      coordinates: [lat, lon],
      lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), 
      installDate: new Date(Date.now() - (365 * 3 + Math.random() * 365 * 4) * 24 * 60 * 60 * 1000), 
      unit: location.en.split('-')[0].trim(),
      voltage: 11000, 
      ...props
    });

    cableNumber++;
  });

  // Muscat Refinery (Mina Al Fahal) cables
  muscatLocations.forEach((location, index) => {
    const cableId = `CB-${String(cableNumber).padStart(3, '0')}`;
    const status = getStatus(cableNumber);
    const sensorValues = generateSensorValues(status);
    const props = getRandomCableProps();
    
    // Mina Al Fahal coordinates: ~23.635, 58.535
    const lat = 23.635 + (Math.random() - 0.5) * 0.02;
    const lon = 58.535 + (Math.random() - 0.5) * 0.02;

    cables.push({
      id: cableId,
      location: location.en,
      locationAr: location.ar,
      zone: 'Muscat',
      status,
      temperature: sensorValues.temperature,
      current: sensorValues.current,
      vibration: sensorValues.vibration,
      pdLevel: sensorValues.pdLevel,
      failureProbability: sensorValues.failureProbability,
      daysToFailure: sensorValues.daysToFailure,
      coordinates: [lat, lon],
      lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      installDate: new Date(Date.now() - (365 * 3 + Math.random() * 365 * 4) * 24 * 60 * 60 * 1000),
      unit: location.en.split('-')[0].trim(),
      voltage: 11000,
      ...props
    });

    cableNumber++;
  });

  // Duqm Refinery cables
  duqmLocations.forEach((location, index) => {
    const cableId = `CB-${String(cableNumber).padStart(3, '0')}`;
    const status = getStatus(cableNumber);
    const sensorValues = generateSensorValues(status);
    const props = getRandomCableProps();
    
    // Duqm Refinery coordinates: ~19.575, 57.715
    const lat = 19.575 + (Math.random() - 0.5) * 0.02;
    const lon = 57.715 + (Math.random() - 0.5) * 0.02;

    cables.push({
      id: cableId,
      location: location.en,
      locationAr: location.ar,
      zone: 'Duqm',
      status,
      temperature: sensorValues.temperature,
      current: sensorValues.current,
      vibration: sensorValues.vibration,
      pdLevel: sensorValues.pdLevel,
      failureProbability: sensorValues.failureProbability,
      daysToFailure: sensorValues.daysToFailure,
      coordinates: [lat, lon],
      lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      installDate: new Date(Date.now() - (365 * 3 + Math.random() * 365 * 4) * 24 * 60 * 60 * 1000),
      unit: location.en.split('-')[0].trim(),
      voltage: 11000,
      ...props
    });

    cableNumber++;
  });

  return cables;
};

export const mockCables = generateCableData();

export const getCableById = (id: string): Cable | undefined => {
  return mockCables.find(cable => cable.id === id);
};

export const getCablesByZone = (zone: 'Sohar' | 'Duqm' | 'Muscat'): Cable[] => {
  return mockCables.filter(cable => cable.zone === zone);
};

export const getCablesByStatus = (status: CableStatus): Cable[] => {
  return mockCables.filter(cable => cable.status === status);
};
