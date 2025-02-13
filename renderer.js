const prompt = document.getElementById("prompt")

prompt.addEventListener("keydown", (e) =>{
    if (e.key === "Enter"){
        let prompt_value = prompt.value;
        window.electron.sendPrompt(prompt_value);
        setTimeout(() =>{
            prompt.value = "";
        }, 100);
    }
})