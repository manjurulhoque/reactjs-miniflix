import React, { Component } from 'react'
import VideoList from '../components/VideoList';
import { videosRef } from '../firebase';

export default class Home extends Component {
    state = {
        videos: []
    };

    componentDidMount() {
        videosRef.child("videos").once("value").then(snapshot => {
            var objects = [];
            snapshot.forEach(data => {
                console.log(data.val());
                objects.push(data.val());
            });
            this.setState({videos: objects});
        }).catch((error) => {
                console.log(error);
            }
        )
    }

    render() {

        return (
            <div>
                <h3 className="text-center"> Latest Videos on Miniflix </h3>
                <div className="row">
                { 
                    this.state.videos.map((video, index) =>
                        <VideoList video={video} key={index} />
                    )
                }
                </div>
            </div>
        )
    }
}
