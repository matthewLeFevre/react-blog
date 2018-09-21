//================================
// Globals Class
//================================

class Globals {

  // production only url
  // url= 'http://courtney.matthew-lefevre.com/server.php';
  url= 'http://courtneylefevre.com/server.php';
  // url= 'http://site2/server.php';

  headers= {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  createRandomKey(length) {
    let id = "";
    let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }

    return id;
  }

  createRequest(data) {

    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    }

    return req;
  }

  createBody(controller, action, payload) {
    let body = {
      controller: controller,
      action: action,
      payload: payload,
    }

    return body;
  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
}

//Export Statement
export default Globals;