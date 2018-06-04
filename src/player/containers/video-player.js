import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from '../components/video';
import Title from '../components/title';
import PlayPause from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/full-screen';

class VideoPlayer extends Component {
    state= {
        pause: true,
        duration: 0,
        currentTime: 0,
        loading: false,
    }

    togglePlay = (event) => {
        this.setState({
            pause: !this.state.pause
        })
    }

    componentDidMount() {
        this.setState({
            pause: (!this.props.autoplay)
        })
    }

    handleLoadedMetadata = event => {
        this.video = event.target
        this.setState({
            duration: this.video.duration,
        })
    }

    handleTimeUpdate = event => {
        this.setState({
            currentTime: this.video.currentTime,
        })
    }

    handleProgressChange = event => {
        this.video.currentTime = event.target.value
    }

    handleSeeking = event => {
        this.setState({
            loading: true,
        })
    }

    handleSeeked = event => {
        this.setState({
            loading: false,
        })
    }

    handleVolumeChange = event => {
        this.video.volume = event.target.value
    }

    handleFullScreenClick = event => {
        if (!document.webkitIsFullScreen) {
            this.player.webkitRequestFullScreen()
        } else {
            document.webkitExitFullscreen()
        }
    }

    setRef = element => {
        this.player = element
    }

    render() {
        return (
            <VideoPlayerLayout
                setRef={this.setRef}
            >
                <Title
                    title="Esto es un video chévere"
                />
                <Controls>
                    <PlayPause
                        pause={this.state.pause}
                        handleClick={this.togglePlay}
                    />
                    <Timer
                        duration={this.state.duration}
                        currentTime={this.state.currentTime}
                    />
                    <ProgressBar
                        duration={this.state.duration}
                        value={this.state.currentTime}
                        handleProgressChange={this.handleProgressChange}
                    />
                    <Volume
                        handleVolumeChange={this.handleVolumeChange}
                    />
                    <FullScreen
                        handleFullScreenClick={this.handleFullScreenClick}
                    />
                </Controls>
                <Spinner
                    active={this.state.loading}
                />
                <Video
                    autoplay={this.props.autoplay}
                    pause={this.state.pause}
                    handleLoadedMetadata={this.handleLoadedMetadata}
                    handleTimeUpdate={this.handleTimeUpdate}
                    handleSeeking={this.handleSeeking}
                    handleSeeked={this.handleSeeked}
                    src="http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
                />
            </VideoPlayerLayout>
        )
    }
}

export default VideoPlayer