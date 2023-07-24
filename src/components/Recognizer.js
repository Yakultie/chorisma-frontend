import {React, Component} from 'react'
import MicRecorder from 'mic-recorder-to-mp3';
import logo from '../logo.png';

class Recognizer extends Component {
    processAudio(recorder) {
        console.log("Now processing audio")
        recorder
        .stop()
        .getMp3().then(([buffer, blob]) => {
            // do what ever you want with buffer and blob
            // Example: Create a mp3 file and play
            const file = new File(buffer, 'sample.mp3', {
            type: blob.type,
            lastModified: Date.now()
            });

            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://2qfawbnaa4.execute-api.ap-southeast-2.amazonaws.com/Prod/recognize_chord");
            xhr.send();
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.response);
                    var chord = response.chord;
                    console.log(chord);
                } else {
                    console.log(`Error: ${xhr.status}`);
                }
            };
        
            const player = new Audio(URL.createObjectURL(file));
            player.play();
            console.log(file)
        
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
                <button className="clicker">
                    <img src={logo} className="App-logo" alt="logo" />
                </button>
            </div>
        )
    }
}

export default Recognizer