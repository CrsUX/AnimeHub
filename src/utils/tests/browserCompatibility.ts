export function checkBrowserCompatibility(): Record<string, boolean> {
  return {
    hlsSupport: 'MediaSource' in window,
    webmSupport: document.createElement('video').canPlayType('video/webm; codecs="vp8, vorbis"') !== '',
    h264Support: document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') !== '',
    mseSupport: 'MediaSource' in window && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E"'),
    fullscreenApi: document.fullscreenEnabled || (document as any).webkitFullscreenEnabled,
    pictureInPicture: 'pictureInPictureEnabled' in document,
    mediaSession: 'mediaSession' in navigator,
    networkInfo: 'connection' in navigator,
    storageQuota: 'storage' in navigator && 'estimate' in navigator.storage
  };
}

export function getMediaCapabilities(): Promise<Record<string, boolean>> {
  if (!('mediaCapabilities' in navigator)) {
    return Promise.resolve({
      smoothPlayback: false,
      powerEfficient: false,
      supported: false
    });
  }

  const videoConfig = {
    type: 'media-source',
    video: {
      contentType: 'video/mp4;codecs=avc1.42E01E',
      width: 1920,
      height: 1080,
      bitrate: 2000000,
      framerate: 30
    }
  };

  return navigator.mediaCapabilities
    .decodingInfo(videoConfig)
    .then(result => ({
      smoothPlayback: result.smooth,
      powerEfficient: result.powerEfficient,
      supported: result.supported
    }))
    .catch(() => ({
      smoothPlayback: false,
      powerEfficient: false,
      supported: false
    }));
}