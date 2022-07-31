import React from 'react';
import videojs from 'video.js'
import '../../node_modules/video.js/dist/video-js.min.css';
import './VideoPlayer.module.scss';
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js" style={{ outline: 'none' }}></video>
        </div>
      </div>
    )
  }
}