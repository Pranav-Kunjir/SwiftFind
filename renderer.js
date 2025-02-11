const information = document.getElementById("info")
information.innerText = `this app uses chrome version v${versions.chrome()}, node version v${versions.node()}`
const func = async () =>{
    const response = await window.versions.ping()
    console.log(response)
    console.log("hsdlfjsd")
}
func()