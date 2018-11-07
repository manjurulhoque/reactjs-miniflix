import React, { Component } from 'react'

export default class VideoList extends Component {

    downloadVideo = url => {
        window.location.href = url;
    }

    render() {
        const {video} = this.props;
        const date = new Date(video.created_at).toLocaleDateString();
        return (
            <div className="col-sm-4">
                <div className="embed-responsive embed-responsive-4by3">
                    <video src={video.url} width="300" height="300" controls></video>
                </div>
                <div style={{marginTop: '20px'}}>
                    <div className="pull-left"> Created at {date} </div>
                    <button className="btn btn-sm btn-success pull-right" onClick={() => this.downloadVideo(video.url)}>Download</button>
                </div>
            </div>
        )
    }
}
