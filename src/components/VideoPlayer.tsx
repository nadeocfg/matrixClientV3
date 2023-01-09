import React, { useEffect, useRef } from 'react';
import Video from 'react-native-video';
import { useAppDispatch } from '../hooks/useDispatch';
import { useAppSelector } from '../hooks/useSelector';
import { setVideoFullscreen } from '../store/actions/videoPlayerActions';
import { StoreModel } from '../types/storeTypes';

const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const isFullscreen = useAppSelector(
    (state: StoreModel) => state.videoStore.isFullScreen,
  );
  const videoUrl = useAppSelector((state: StoreModel) => state.videoStore.url);
  const playerRef = useRef<Video>(null);

  const onVideoPlayerOpen = () => {
    console.log('player open');
    playerRef.current?.seek(0, 0);
  };

  console.log(isFullscreen);

  const onDismiss = () => {
    console.log('player close');
    dispatch(setVideoFullscreen(false));
  };

  return (
    <Video
      fullscreen={true}
      onVideoFullscreenPlayerWillPresent={onVideoPlayerOpen}
      onVideoFullscreenPlayerDidDismiss={onDismiss}
      playInBackground={false}
      controls={true}
      source={{
        uri: videoUrl,
      }}
      ref={playerRef}
      currentTime={0}
    />
  );
};

export default VideoPlayer;
