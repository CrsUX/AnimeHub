import { StreamingSource } from '../../types/streaming';
import { QualityManager } from '../../services/streaming/QualityManager';
import { CacheManager } from '../../services/streaming/CacheManager';
import { ErrorHandler } from '../../services/streaming/ErrorHandler';

export class StreamTester {
  private qualityManager = QualityManager.getInstance();
  private cacheManager = CacheManager.getInstance();
  private metrics = new Map<string, any>();

  async testStream(source: StreamingSource): Promise<boolean> {
    try {
      // Test stream availability
      const response = await fetch(source.url, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Stream not available');
      }

      // Test quality switching
      const qualities = ['1080p', '720p', '480p'];
      for (const quality of qualities) {
        await this.testQualitySwitch(quality);
      }

      // Test cache
      await this.testCaching(source.url);

      // Test error recovery
      await this.testErrorRecovery();

      return true;
    } catch (error) {
      console.error('Stream test failed:', error);
      return false;
    }
  }

  private async testQualitySwitch(quality: string): Promise<void> {
    const startTime = performance.now();
    this.qualityManager.setQuality(quality);
    
    // Simulate quality switch delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.metrics.set(`quality_switch_${quality}`, {
      time: performance.now() - startTime,
      success: this.qualityManager.getCurrentQuality() === quality
    });
  }

  private async testCaching(url: string): Promise<void> {
    const startTime = performance.now();
    await this.cacheManager.getOrFetch(url);
    const cachedResult = await this.cacheManager.getOrFetch(url);
    
    this.metrics.set('caching', {
      time: performance.now() - startTime,
      success: !!cachedResult
    });
  }

  private async testErrorRecovery(): Promise<void> {
    const testError = new Error('Test network error');
    const streamingError = ErrorHandler.handlePlaybackError(testError);
    
    if (ErrorHandler.isRecoverable(streamingError)) {
      const recovery = ErrorHandler.getRecoveryAction(streamingError);
      if (recovery) {
        await recovery();
      }
    }
    
    this.metrics.set('error_recovery', {
      success: ErrorHandler.isRecoverable(streamingError)
    });
  }

  getMetrics(): Record<string, any> {
    return Object.fromEntries(this.metrics);
  }
}