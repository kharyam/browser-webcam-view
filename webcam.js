function onWebcamSelect() {
    deviceId = document.getElementById("webcams").value;
    deviceName = document.getElementById("webcams").label;
    enableDevice(deviceId, deviceName);
}

function enableDevice(deviceId = null) {
    var video = document.querySelector("#videoElement");

    hdConstraints = {
    video: { width: { min: 1920 }, height: { min: 1080 } },
    };

    if (deviceId != null) {
        hdConstraints.video.deviceId = deviceId;
    }

    if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(hdConstraints)
        .then(function (stream) {
        video.srcObject = stream;
        document.getElementById("error").innerHTML=""
            document.getElementById('videoElement').style.visibility = 'visible';
        })
        .catch(function (error) {
            document.getElementById("error").innerHTML='Unable to display webcam "' + getDeviceName(deviceId) + '"';
            document.getElementById('videoElement').style.visibility = 'hidden';
        });
    }
}

function getDeviceName(deviceId) {
    var allInputs = document.getElementsByTagName("option");
    for(var x=0; x<allInputs.length; x++)
        if(allInputs[x].value == deviceId)
           return allInputs[x].label;
}

function init() {
    let menu = document.createElement("div")
    menu.id = "contextMenu"
    menu.onmouseleave = () => contextMenu.outerHTML = ''

    oncontextmenu = (e) => {
        e.preventDefault()
        menu.style = `top:${e.pageY-10}px;left:${e.pageX-40}px`
        document.body.appendChild(menu)
    }

    navigator.mediaDevices.enumerateDevices().then(function (devices) {
        numDevices = 0;
        innerHtml ="";
        for(var i = 0; i < devices.length; i++){
            device=devices[i];
            if (device.kind === 'videoinput') {
                numDevices++;
                innerHtml+="  <option value='" + device.deviceId +"' onselect='alert(tada)'>" + device.label +"</option>";
            }
        }
        innerHtml+='</select>'
        menu.innerHTML = "<Select Camera<select name='webcams' id='webcams' size='" + numDevices + "' onchange='onWebcamSelect()'>" + innerHtml;
       });
    enableDevice();
}

init();
