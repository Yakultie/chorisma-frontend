import {React, Component} from 'react'
import MicRecorder from 'mic-recorder-to-mp3';
import $ from 'jquery';
import logo from '../logo.png';

class Recognizer extends Component {
    async uploadViaPresignedURL(preSignedURL, file, key) {
        await fetch(preSignedURL, {
            method: "PUT",
            body: file
        }).then(response => {
            this.recognizeChord(key);
        })
    }

    async recognizeChord(key) {
        await fetch("https://chorisma.app/Prod/recognize_chord", {
            method: "POST",
            body: JSON.stringify({
                "resourceLocation": key
            })
        }).then(response => response.json())
        .then(res => {
            console.log(res)
        })
    }
    
    processAudio(recorder) {
        console.log("Now processing audio")
        recorder.stop().getMp3().then(([buffer, blob]) => {
            // do what ever you want with buffer and blob
            // Example: Create a mp3 file and play
            const file = new File(buffer, 'sample.mp3', {
                type: blob.type,
                lastModified: Date.now()
            });
            console.log(file)

            fetch("https://chorisma.app/Prod/get_presigned_url")
            .then(response => response.json())
            .then(res => {
                this.uploadViaPresignedURL(res.preSignedURL, file, res.key);
            })
        }).catch((e) => {
            alert('Failed to record audio');
            console.log(e);
        });
    }

    componentDidMount() {
        console.log("mounted");

        const recorder = new MicRecorder({
            bitRate: 128
        });

        $(document).on('click', '.clicker', () => {
            console.log("listening");

            recorder.start().then(() => {
                setTimeout(() => this.processAudio(recorder), 6000);
            }).catch((e) => {
                console.error(e);
            });
        });
    }

    render() {
        return (
            <div>
                <button className="clicker" onClick={this.startListening}>
                    <img src={logo} className="App-logo paused" alt="logo" />
                </button>
            </div>
        )
    }
}

export default Recognizer
