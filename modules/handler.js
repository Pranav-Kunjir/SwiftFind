const {shell} = require("electron")

function handlePrompt(prompt){
    shell.openExternal(`https://chatgpt.com/?q=${prompt}`)
}

module.exports = {
    handlePrompt
};