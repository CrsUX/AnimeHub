export class StreamingError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = 'StreamingError';
  }
}

export class ErrorHandler {
  static handlePlaybackError(error: Error): StreamingError {
    if (error instanceof StreamingError) {
      return error;
    }

    // Network errors
    if (error.name === 'NetworkError') {
      return new StreamingError(
        'Network connection error. Please check your internet connection.',
        'NETWORK_ERROR',
        true
      );
    }

    // Media errors
    if (error instanceof MediaError) {
      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          return new StreamingError(
            'Playback was aborted.',
            'PLAYBACK_ABORTED',
            true
          );
        case MediaError.MEDIA_ERR_NETWORK:
          return new StreamingError(
            'A network error occurred.',
            'NETWORK_ERROR',
            true
          );
        case MediaError.MEDIA_ERR_DECODE:
          return new StreamingError(
            'The video could not be decoded.',
            'DECODE_ERROR',
            false
          );
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          return new StreamingError(
            'The video format is not supported.',
            'FORMAT_ERROR',
            false
          );
        default:
          return new StreamingError(
            'An unknown error occurred.',
            'UNKNOWN_ERROR',
            false
          );
      }
    }

    return new StreamingError(
      error.message || 'An unknown error occurred.',
      'UNKNOWN_ERROR',
      false
    );
  }

  static isRecoverable(error: StreamingError): boolean {
    return error.recoverable;
  }

  static getRecoveryAction(error: StreamingError): (() => Promise<void>) | null {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
          // Retry connection
        };
      case 'PLAYBACK_ABORTED':
        return async () => {
          // Restart playback
        };
      default:
        return null;
    }
  }
}