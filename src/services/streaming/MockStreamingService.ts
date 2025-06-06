import { StreamingSource } from '../../types/streaming';
import { STREAMING_CONFIG, getMockSources } from '../../config/streaming';

export class MockStreamingService {
  async searchSources(title: string): Promise<StreamingSource[]> {
    // Simulate network delay
    await new Promise(resolve => 
      setTimeout(resolve, STREAMING_CONFIG.MOCK_DELAY_MS)
    );
    
    return getMockSources(title);
  }
}