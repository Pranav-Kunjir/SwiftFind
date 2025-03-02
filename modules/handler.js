const {shell} = require("electron")
const {bangs} = require("./bangs.js")

// this is the standart !bang which is used by duck duck go 
// function getBangURL(prompt) {
//     const match = prompt.match(/^(.*)\s+!(\w+)$|^!(\w+)\s+(.*)$/);
//     if (!match) return null; // Return null if no bang is found

//     const query = match[1] || match[4]; // Extract search query
//     const bang = match[2] || match[3];  // Extract bang keyword

//     if (!query || !bang) return null;

//     const foundBang = bangs.find(b => b.t === bang);
//     if (!foundBang) return null;

//     return foundBang.u.replace("{{{s}}}", encodeURIComponent(query.trim()));
// }

// this code is to use .bang than !bang on suggestion of shreyash wale
function getBangURL(prompt) {
    // Adjusted regex to match .bang instead of !bang
    const match = prompt.match(/^(.*)\s\.(\w+)$|^\.(\w+)\s(.*)$/);
    if (!match) return null; // Return null if no bang is found

    const query = match[1] || match[4]; // Extract search query
    const bang = match[2] || match[3];  // Extract bang keyword

    if (!query || !bang) return null;

    const foundBang = bangs.find(b => b.t === bang);
    if (!foundBang) return null;

    return foundBang.u.replace("{{{s}}}", encodeURIComponent(query.trim()));
}



function handlePrompt(prompt, url){
    let result = getBangURL(prompt)
    if (result === null){
        shell.openExternal(`${url}${prompt}`)
    }
    else{
        shell.openExternal(`${result}`)
    }
}



module.exports = {
    handlePrompt
};