'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import { Cable, CableStatus } from '@/types';

export function useDataSimulator() {
  const { 
    cables, 
    updateCable, 
    addSensorReading, 
    isSimulationRunning,
    isDemoScenarioActive,
    demoScenarioStep,
  } = useAppStore();
  
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(Date.now());
  const demoStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isSimulationRunning) return;

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdateRef.current;

      // Update every 2 seconds
      if (deltaTime > 2000) {
        lastUpdateRef.current = now;

        cables.forEach(cable => {
          // Add small random variations to sensor readings
          const noise = () => 0.98 + Math.random() * 0.04;
          
          let temperatureUpdate = cable.temperature * noise();
          let currentUpdate = cable.current * noise();
          let vibrationUpdate = cable.vibration * noise();
          let pdLevelUpdate = cable.pdLevel * noise();
          let statusUpdate: CableStatus = cable.status;

          // Demo scenario: CB-089 degradation
          if (isDemoScenarioActive && cable.id === 'CB-089') {
            const elapsed = (now - demoStartTimeRef.current) / 1000; // seconds

            if (elapsed < 10) {
              // Step 1: Warning (0-10s)
              temperatureUpdate = 35 + (elapsed / 10) * 8; // 35°C → 43°C
              currentUpdate = 7 + (elapsed / 10) * 2;
              statusUpdate = elapsed > 5 ? 'warning' : 'healthy';
            } else if (elapsed < 20) {
              // Step 2: Caution (10-20s)
              const phase2 = (elapsed - 10) / 10;
              temperatureUpdate = 43 + phase2 * 7; // 43°C → 50°C
              currentUpdate = 9 + phase2 * 4;
              vibrationUpdate = 3 + phase2 * 4;
              pdLevelUpdate = 150 + phase2 * 150;
              statusUpdate = 'caution';
            } else {
              // Step 3: Critical (20s+)
              temperatureUpdate = 50 + Math.random() * 8;
              currentUpdate = 13 + Math.random() * 3;
              vibrationUpdate = 7 + Math.random() * 3;
              pdLevelUpdate = 300 + Math.random() * 150;
              statusUpdate = 'critical';
            }
          }

          // Update cable with new sensor readings
          updateCable(cable.id, {
            temperature: temperatureUpdate,
            current: currentUpdate,
            vibration: vibrationUpdate,
            pdLevel: pdLevelUpdate,
            status: statusUpdate,
          });

          // Add to sensor history
          addSensorReading(cable.id, {
            timestamp: new Date(now),
            temperature: temperatureUpdate,
            current: currentUpdate,
            vibration: vibrationUpdate,
            pdLevel: pdLevelUpdate,
          });
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSimulationRunning, isDemoScenarioActive, cables, updateCable, addSensorReading]);

  // Track demo scenario start time
  useEffect(() => {
    if (isDemoScenarioActive) {
      demoStartTimeRef.current = Date.now();
    }
  }, [isDemoScenarioActive]);
}


