function o(str){return document.getElementById(str)};
function getRand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function isLocalStorage(){ // if local storage available
	try {return 'localStorage' in window && window['localStorage'] !== null;}
	catch(e) {return false;}
}
function getLocal(storage_name, default_value){
    if(isLocalStorage()){
        var val=localStorage.getItem(storage_name);
        if(val===false || val===undefined || val===null) return default_value;
        else if(val=='true') return true;
        else if(val=='false') return false;
        else return val;
    }
    else return default_value;
}
function setLocal(storage_name,stored_value){
    if(isLocalStorage()){
        if(stored_value===true) stored_value='true';
        else if(stored_value===false) stored_value='false';
        localStorage.setItem(storage_name,stored_value);
        return true;
    }
    else return false;
}
function copyObject(obj) {
    if (typeof obj != "object") {
        return obj;
    }
    var copy = obj.constructor();
    for (var key in obj) {
        if (typeof obj[key] == "object") {
            copy[key] = this.copyObject(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
}
function inArray(elm,arr){for(var i=0;i<arr.length;i++){if(arr[i]==elm) return true;}return false;}
function isTouch(){return ('ontouchstart' in window);}
function getFrameDocument(frame){return frame && (frame.contentDocument || frame.contentWindow || null);}
///////////////////// AJAX ////////////////////
var xhr = new XMLHttpRequest();
// called from customized script
function sendRequest(actionFile,strRequest,fnc){
    if(fnc) xhr.fnc=fnc;
	xhr.open('POST', actionFile, true);
	xhr.onreadystatechange = checkState;
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(strRequest);
}
function checkState(){
    // customized functions
	if (xhr.readyState==4){
        if (xhr.status==200){
            //handleResponse(xhr.responseText);
            if(xhr.fnc) xhr.fnc();
        }
    }
}
