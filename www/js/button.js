let buttonLigar = document.getElementById('ligar')
let buttonEnviar = document.getElementById('send')
let buttonLer = document.getElementById('ready')

ligarBomba = () => {
    let bomba = "bb"
    bluetoothSerial.write(bomba,null, () => {alert('Erro: Comando de ligar bomba falhou')})
}
buttonLigar.addEventListener('click',ligarBomba)

enviarDados = () => {
    let valorInstalado = parseFloat(inputInstalada.value/10)
    let valorMax = parseFloat(inputMax.value/10)
    let valorMin = parseFloat(inputMin.value/10)
    let enviar = `ev,${valorInstalado},${valorMax},${valorMin}`
    enviar += "\n"
    alert(enviar)
    bluetoothSerial.write(enviar,null, () => {alert('Erro: Comando de enviar dados falhou')})
}
buttonEnviar.addEventListener('click',enviarDados)

lerDados = () => {
    let ler = "lr"
    bluetoothSerial.write(ler,null, () => {alert('Erro: Comando de ler dados falhou')})
}
buttonLer.addEventListener('click',lerDados)

//Pegando valor recebido pelo dispositivo e dividindo por 10 e transformando em float e colocando nos campos input.
formatarInput = () => {
    inputInstalada.value = parseFloat(getData[0]/10)
    inputMax.value = parseFloat(getData[1]/10)
    inputMin.value = parseFloat(getData[2]/10)
    inputAtual.value = parseFloat(getData[3]/10)
}
