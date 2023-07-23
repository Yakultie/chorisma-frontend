import {React, Component} from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

class Recognizer extends Component {
    uploadViaPresignedURL(preSignedURL, file) {
        fetch(preSignedURL, {
            method: "PUT",
            body: JSON.stringify(file)
        }).then(response => {
            console.log(response)
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

            fetch("http://127.0.0.1:3000/get_presigned_url")
            .then(response => response.json())
            .then(res => {
                this.uploadViaPresignedURL(res.preSignedURL, file);
                console.log(res.preSignedURL)
            })
        }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
        });
    }

    componentDidMount() {
        const recorder = new MicRecorder({
            bitRate: 128
        });

        recorder.start().then(() => {
            setTimeout(() => this.processAudio(recorder), 1000)
        }).catch((e) => {
            console.error(e);
        });
    
    }

    render() {
        return (
            <div>
                <h1>Listening</h1>
            </div>
        )
    }
}

export default Recognizer