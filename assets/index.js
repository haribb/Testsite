

let recorder_options = document.getElementsByName("recorder_options");
let color_picker = document.getElementsByName("color_picker");
let embedUrl;
let btn = document.getElementById('submit-video-btn');

const eventsElement = document.getElementById("eventsContainer");

// Recorder type selection
recorder_options.forEach((option) => {
  option.addEventListener("click", () => {
    if (
      document.querySelector('input[name="recorder_options"]:checked').value ===
      "custom"
    ) {
      document.getElementById("defaultButtonContainer").style.display = "none";
      document.getElementById("inlineRecordingContainer").style.display =
        "none";
      document.getElementById("customButtonContainer").style.display = "block";
    } else if (
      document.querySelector('input[name="recorder_options"]:checked').value ===
      "inline"
    ) {
      document.getElementById("customButtonContainer").style.display = "none";
      document.getElementById("defaultButtonContainer").style.display = "none";
      document.getElementById("inlineRecordingContainer").style.display =
        "block";
    } else {
      document.getElementById("customButtonContainer").style.display = "none";
      document.getElementById("inlineRecordingContainer").style.display =
        "none";
      document.getElementById("defaultButtonContainer").style.display = "block";
    }
  });
});

// Color picker selection
// color_picker.forEach((option) => {
//   option.addEventListener("click", () => {
//     let color = document.querySelector('input[name="color_picker"]:checked')
//       .value;
//     let optionButtons = document.getElementsByClassName("options-button");
//     for (let i = 0; i < optionButtons.length; i++) {
//       optionButtons[i].classList.remove("blue", "orange");
//       if (color !== "default") optionButtons[i].classList.add(color);
//     }
//   });
// });

// This will be called once the recorder has been loaded.
window.hippoWidget.onLoad(function () {
  // Recorder loading has been completed. You can enable your custom button now.
//   document.getElementById("screenRecord").addEventListener("click", () => {
//     let recordingConfiguration = {
//       screenRecord: true,
//       audio: true,
//       webCam: false,
//       systemAudio: true,
//       resolution: "1080",
//       separateLayer: false,
//       initiator: "generic_embed"
//     };
//     window.hippoWidget.startRecording(recordingConfiguration);
//   });
  document.getElementById("webcamRecord").addEventListener("click", () => {
    let recordingConfiguration = {
      screenRecord: false,
      audio: true,
      webCam: true,
    //   teleprompter: true, 
      // teleprompter_script_id: 151941,
      showPreview: true,
      systemAudio: true,
      resolution: "1080",
      separateLayer: false,
      initiator: "generic_embed"
    };
    window.hippoWidget.startRecording(recordingConfiguration);
  });
//   document.getElementById("import").addEventListener("click", () => {
//     window.hippoWidget.import();
//   });

  // Recorder event listeners
  window.hippoWidget.on("record_initiated", (e) => {
    embedUrl = e.embed_url;
    
    document.getElementById("iframeContainer").innerHTML = "";
    printEvent(e);
   
  });

  window.hippoWidget.on("video_submitted", (e) => {
    console.log("RECORD submitted ", embedUrl);
    let iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.width = "600px";
    iframe.height = "500px";
    iframe.style = "border: none";
    document.getElementById("iframeContainer").appendChild(iframe);
    printEvent(e);
    console.log("url",embedUrl);
    console.log("bhbhhhbbhj",btn);
  });

  window.hippoWidget.on("record_stopped", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("record_aborted", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("record_error", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("video_cancelled", (e) => {
    printEvent(e);
  });

  window.hippoWidget.on("import_progress", (e) => {
    document.getElementById("iframeContainer").innerHTML = "";
    printEvent(e);
  });

//   window.hippoWidget.on("import_complete", (e) => {
//     embedUrl = e.embed_url;
//     printEvent(e);
//     console.log("printEvent",e.recorded_url);
//   });

//   window.hippoWidget.on("import_failed", (e) => {
//     printEvent(e);
//   });

  window.hippoWidget.on("source_uploaded", (e) => {
    printEvent(e);
   
  });
});

function printEvent(event) {
  let elem = document.createElement("p");
  elem.innerHTML = JSON.stringify(event);
  eventsElement.appendChild(elem);

}
// var QRCode = require('qrcode')
// var canvas = document.getElementById('canvas')

// QRCode.toCanvas(canvas, 'sample text', function (error) {
//   if (error) console.error(error)
//   console.log('success!');
// })


