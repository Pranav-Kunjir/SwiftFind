const prompt = document.getElementById("prompt")
const change_llm = document.getElementById("llm")
const current_llm = document.getElementById("current_llm")
const theme = document.getElementById("theme")
const current_theme = document.getElementById("current_theme")

let set_theme = "dark"
// async function checkDefaultLLM (){
//     try{
//         fetch("./../setting.json")
//         .then(response => response.json())
//         .then(jsonData =>{
//             for (let key in jsonData){
//                 if (key === "default_llm"){
//                     current_llm.innerText = `Select the LLm current is ${jsonData[key]}`
//                 }
//                 if (key === "theme"){
//                     current_theme.innerText = `Change the theme current is ${jsonData[key]}`
//                     window.set_theme = jsonData[key]
//                 }
//             }
//         })

//     }catch(error)
//     {
//         console.log(error)
//     }
// }
async function checkDefaultLLM() {
    try {
        const response = await fetch("./../setting.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        // Ensure elements exist
        const current_llm = document.getElementById("current_llm");
        const current_theme = document.getElementById("current_theme");

        if (!current_llm || !current_theme) {
            throw new Error("DOM elements not found!");
        }

        if ("default_llm" in jsonData) {
            current_llm.innerText = `Select the LLM, current is ${jsonData.default_llm}`;
        }

        if ("theme" in jsonData) {
            current_theme.innerText = `Change the theme, current is ${jsonData.theme}`;
            window.set_theme = jsonData.theme; // Ensure set_theme is globally accessible if needed
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
    }
}

async function handleLLMChange(e) {
    let new_llm = e.target.value;
    try {
        await window.electron.change_llm_request(new_llm);
        console.log("LLM change request completed");
    } catch (error) {
        console.error("Error changing LLM:", error);
    }
}
async function handleThemeChange(e) {
    let new_theme = e.target.value;
    try {
        await window.electron.change_theme_request(new_theme);
        console.log("theme change request completed");
    } catch (error) {
        console.error("Error changing theme:", error);
    }
}


if (window.location.pathname.includes("index.html")){
    prompt.classList.add(set_theme)
    prompt.addEventListener("keydown", (e) =>{
        if (e.key === "Enter"){
            let prompt_value = prompt.value;
            window.electron.sendPrompt(prompt_value);
            setTimeout(() =>{
                prompt.value = "";
            }, 100);
        }
    })
}else{
    console.log("prompt skipped not found")
}
if(window.location.pathname.includes("setting.html")){
    document.body.classList.add(set_theme)
    console.log(set_theme)
    try{
        fetch("./../llm_source.json")
        .then(response => response.json())
        .then(jsonData => {
            for (let key in jsonData) {
                console.log(key, jsonData[key]);
                const option = document.createElement("option")
                option.value = key;
                option.textContent = key;
                option.classList.add(set_theme)
                change_llm.appendChild(option);
            }
        })
        checkDefaultLLM()
    }catch(error){
        console.log(error)
    }
    change_llm.addEventListener("change", (e)=>{
        location.reload()
        handleLLMChange(e)
    })  
    theme.addEventListener("change", (e)=>{
        location.reload()
        handleThemeChange(e)
    })      

}else{
    console.log("change llm not found")
}




