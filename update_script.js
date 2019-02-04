/*	
 * @author	Huggybe4r
 * @source	https://github.com/Huggybe4r/adventureland
 */

const baseURL = "https://raw.githubusercontent.com/Huggybe4r/adventureland/master/";

const allFiles = ["01_master.js"];

parent.api_call("list_codes", {
  callback: function () {
    game_log("Updating from GitHub/Huggybe4r...");
    for (let file of allFiles) {
      let request = new XMLHttpRequest();
      request.open("GET", baseURL + file);
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          let codeObject = getCodeObject(file);
          let data = {
            name: codeObject.name,
            slot: codeObject.slot,
            code: request.responseText
          }
          parent.api_call("save_code", data);
          game_log("Saved to slot [" + codeObject.name + "] as " + codeObject.slot);
        }
      }
      request.send();
    }
  }
});

function getCodeObject(file) {
  let codeObject;

  let arr = file.substring(0, file.length - 3).split("_");

  codeObject = {
    slot: arr[0],
    name: arr[1]
  };

  return codeObject;
}