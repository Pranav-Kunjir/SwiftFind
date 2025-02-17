const prompt = document.getElementById("prompt")
const change_llm = document.getElementById("llm")
if (window.location.pathname.includes("index.html")){
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
    change_llm.addEventListener("change", (e)=>{
        let new_llm = e.target.value;
        window.electron.change_llm_request(new_llm);
    })    
}else{
    console.log("change llm not found")
}




