
const URL = "http://127.0.0.1:7010";

function Get (path, recv_func) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", URL+path, true); 
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status === 200){
            recv_func(xhr.responseText); 
        }
    };
    xhr.ontimeout = function() {
        cc.log("time out ..."); 
    };
    xhr.onerror = function(err) {
        cc.log("error ..", err)
    };
    xhr.send(); 
    return xhr;
}

module.exports = {
    Get
};