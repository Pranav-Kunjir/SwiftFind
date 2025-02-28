const { rejects } = require("assert");
const { error } = require("console")
const jsonfile = require('jsonfile');
const { resolve } = require("path");




// function readSettings(path){
//     jsonfile.readFile(path, (err, data) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         for (const [key,value] of Object.entries(data)){

//           if (key === "default_llm"){
//             return value
//           }
//         }
//       });
// }

function readSettings(path){
  return new Promise((resolve,reject) =>{
    jsonfile.readFile(path, (err,data) =>{
      if (err) {
        reject(err)
      }else{
        resolve(data.default_llm);
      }
    })
  })
}


function returnUrl(path,llm){
  return new Promise((resolve,reject) =>{
    jsonfile.readFile(path, (err,data) =>{
      if (err) {
        reject(err)
      }else{
        resolve(data[llm]);
      }
    })
  })
}

function change_llm(path,llm){
    jsonfile.readFile(path, (err,data) =>{

      try{
        data.default_llm = llm
        jsonfile.writeFile(path, data, { spaces: 4 }, (err) => {
          if (err) {
              console.error("Error writing file:", err);
          } 
        });
      }catch(error){
        console.log(error)
      }
    })
  }
  function change_theme(path,theme){
    jsonfile.readFile(path, (err,data) =>{

      try{
        data.theme = theme
        jsonfile.writeFile(path, data, { spaces: 4 }, (err) => {
          if (err) {
              console.error("Error writing file:", err);
          } 
        });
      }catch(error){
        console.log(error)
      }
    })
  }


  function runOnStartUp(path){
    return new Promise((resolve,reject) =>{
      jsonfile.readFile(path, (err,data) =>{
        if (err) {
          reject(err)
        }else{
          resolve(data.runOnStartUp);
        }
      })
    })
  }

module.exports = {
    readSettings,
    returnUrl,
    change_llm,
    change_theme,
    runOnStartUp
}