import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { videosRef } from '../firebase';

export default class Upload extends Component {

    state = {
        file: null,
        rejectedFile: null,
        filePath: null,
        downloadURL: null,
        uploading: false
    }

    onDrop = (files, rejectedFiles) => {
        this.setState({file: files[0]});
        const reader = new FileReader();
        // reader.onload = function(file) {
        //     //var fileContent = file.target.result;
        //     self.setState({filePath: file.target.result});
        // };
        reader.addEventListener("load", () => {
            this.setState({filePath: reader.result});
        }, false);
        reader.readAsDataURL(files[0]);
        if(rejectedFiles && rejectedFiles.length > 0){
            this.setState({rejectedFile: rejectedFiles[0]});
        }
    }

    uploadVideo = () => {
        const video = this.state.file;
        if(video){
            this.setState({uploading: true});
            //const {rejectedFile} = this.state.rejectedFile;
            const storageRef = firebase.storage().ref();
            storageRef.child(`videos/${Math.floor(Date.now() / 1000) + video.name}`).put(video).then(snapshot => {
                let self = this;
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log("File available at", downloadURL);
                    self.setState({downloadURL});
                    firebase.auth().onAuthStateChanged(user => {
                        if(user){
                            //videosRef.child(uid).child("vidoes").push({url: downloadURL});
                            videosRef.child("videos").push(
                                {
                                    url: downloadURL,
                                    created_at: Date.now()
                                }
                            );
                            self.setState({uploading: false});
                            Swal("Video Uploaded");
                        }
                    })
                });
            });
        }else {
            Swal("warning", "Select video file");
        }
    }

    render() {
        return (
            <div>
                <h3 className="text-center">Upload Your small second Video in a Jiffy</h3>
                <hr/>
        
                <div className="jumbotron" style={{height: '400px'}}>
                    <div className="col-sm-5">
                        <Dropzone onDrop={this.onDrop} accept='video/*' multiple={false}>Drop video here</Dropzone>
                        <button style={{marginTop: '20px'}} onClick={this.uploadVideo} className="btn btn-lg btn-info"> Upload Video</button>
                    </div>
                    <div className="col-md-7">
                        {
                            this.state.uploading && <h2>Uploading....</h2>
                        }
                        {
                            this.state.file &&
                            <video src={this.state.filePath} width="320" height="240" controls/>
                        }
                        {/* {
                            this.state.downloadURL &&
                            <video src={this.state.downloadURL} width="320" height="240" controls/>
                        } */}
                    </div>
                </div>
            </div>
        )
    }
}
