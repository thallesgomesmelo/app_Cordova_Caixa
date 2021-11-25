let buttonLigar = document.getElementById('ligar')
let buttonEnviar = document.getElementById('send')
let buttonLer = document.getElementById('ready')

ligarBomba = () => {
    let bomba = "bb"
    bluetoothSerial.write(bomba,null, () => {alert('Erro: Comando de ligar bomba falhou')})
}
buttonLigar.addEventListener('click',ligarBomba)

enviarDados = () => {
    let enviar = `ev,${inputInstalada.value},${inputMax.value},${inputMin.value},`
    alert(enviar)
    bluetoothSerial.write(enviar,null, () => {alert('Erro: Comando de enviar dados falhou')})
}
buttonEnviar.addEventListener('click',enviarDados)

lerDados = () => {
    let ler = "lr"
    bluetoothSerial.write(ler,null, () => {alert('Erro: Comando de ler dados falhou')})
}
buttonLer.addEventListener('click',lerDados)