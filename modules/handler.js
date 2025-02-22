const {shell} = require("electron")


// function searchgoogle(prompt){
//     let query = prompt.replace("/g","")
//     shell.openExternal(`https://www.google.com/search?q=${query}`)
// }
// function chatgpt(prompt){
//     shell.openExternal(`https://chatgpt.com/?q=${prompt}`)
// }

// function handlePrompt(prompt){
//     if(prompt.includes("/g")){
//         searchgoogle(prompt)
//     }else{
//         chatgpt(prompt)
//     }
// }

function handlePrompt(prompt, url){
    shell.openExternal(`${url}${prompt}`)
}



module.exports = {
    handlePrompt
};