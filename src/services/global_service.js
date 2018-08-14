//================================
// Globals Class
//================================

class Globals {

  // production only url
  // url= 'http://www.courtney.matthew-lefevre.com/server.php';
  url= 'http://site2/server.php';

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

  createRequest(data, jsonEncode = true) {
    let jsonData;
    
    if(jsonEncode === true) {
      jsonData = JSON.stringify(data);
    } else {
      jsonData = data;
    }

    let req = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: jsonData,
    }

    return req;
  }
}

//Export Statement
export default Globals;