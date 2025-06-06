import { StreamingSource } from '../../types/streaming';

export function createTestStream(quality: string = '1080p'): StreamingSource {
  return {
    id: `test-${quality}`,
    title: `Test Stream (${quality})`,
    quality,
    size: 1024 * 1024 * 1024, // 1GB
    seeds: 100,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    provider: 'test'
  };
}

export function simulateNetworkCondition(
  downlink: number, // Mbps
  rtt: number = 100 // ms
): void {
  Object.defineProperty(navigator, 'connection', {
    value: {
      downlink,
      rtt,
      effectiveType: downlink >= 10 ? '4g' : downlink >= 2 ? '3g' : '2g'
    }
  });
}

export function createPerformanceMetrics() {
  let startTime = performance.now();
  let metrics = {
    loadTime: 0,
    bufferingEvents: 0,
    qualitySwitches: 0,
    errors: 0
  };

  return {
    start() {
      startTime = performance.now();
    },
    recordBuffering() {
      metrics.bufferingEvents++;
    },
    recordQualitySwitch() {
      metrics.qualitySwitches++;
    },
    recordError() {
      metrics.errors++;
    },
    getMetrics() {
      metrics.loadTime = performance.now() - startTime;
      return metrics;
    }
  };
}