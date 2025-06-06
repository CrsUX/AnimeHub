import { StreamingQuality } from '../../types/streaming';
import { STREAMING_CONFIG } from '../../config/streaming';

export class QualityManager {
  private static instance: QualityManager;
  private currentQuality: string;
  private availableQualities: StreamingQuality[];

  private constructor() {
    this.currentQuality = STREAMING_CONFIG.DEFAULT_QUALITY;
    this.availableQualities = [];
  }

  static getInstance(): QualityManager {
    if (!QualityManager.instance) {
      QualityManager.instance = new QualityManager();
    }
    return QualityManager.instance;
  }

  setAvailableQualities(qualities: StreamingQuality[]): void {
    this.availableQualities = qualities;
    this.selectOptimalQuality();
  }

  getCurrentQuality(): string {
    return this.currentQuality;
  }

  getAvailableQualities(): StreamingQuality[] {
    return this.availableQualities;
  }

  setQuality(quality: string): void {
    if (this.availableQualities.some(q => q.value === quality)) {
      this.currentQuality = quality;
    }
  }

  private selectOptimalQuality(): void {
    // Select quality based on network conditions and device capabilities
    const connection = (navigator as any).connection;
    const bandwidth = connection?.downlink || Infinity;
    
    const optimalQuality = this.availableQualities.find(quality => {
      const requiredBandwidth = quality.bitrate / (1024 * 1024); // Convert to Mbps
      return bandwidth >= requiredBandwidth;
    });

    if (optimalQuality) {
      this.currentQuality = optimalQuality.value;
    }
  }
}