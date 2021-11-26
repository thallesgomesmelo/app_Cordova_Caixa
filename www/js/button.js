let buttonLigar = document.getElementById('ligar')
let buttonEnviar = document.getElementById('send')
let buttonLer = document.getElementById('ready')

//Comando de Ligar Bomba.
ligarBomba = () => {
    let bomba = "bb"
    bluetoothSerial.write(bomba,null, () => {alert('Erro: Comando de ligar bomba falhou')})
}
buttonLigar.addEventListener('click',ligarBomba)

//Comando de envio de dados.
enviarDados = () => {
    let valueAlturaInstalada = inputInstalada.value
    let valueAlturaMax = inputMax.value
    let valueAlturaMin = inputMin.value
    let enviar //Comando com valores certos.
    
    if(valueAlturaInstalada === '' && valueAlturaMax === '' && valueAlturaMin === '') {
        alert("Erro: Não foi informado valores.")
    } else if(valueAlturaInstalada === '') {
        alert("Erro: Altura Instalada não foi informada.")
    } else if(valueAlturaMax === '') {
        alert("Erro: Altura Máxima não foi informada.")
    } else if(valueAlturaMin === '') {
        alert("Erro: Altura Mínima não foi informada.")
    } else if(valueAlturaMax < valueAlturaMin) {
        alert("Erro: Altura máxima menor que altura mínima informada.")
    } else if(valueAlturaMin > valueAlturaMax) {
        alert("Erro: Altura mínima maior que altura máxima informada.")
    } else {
        enviar = `ev,${valueAlturaInstalada},${valueAlturaMax},${valueAlturaMin}`
    }

    bluetoothSerial.write(enviar,null, () => {alert('Erro: Comando de enviar dados falhou')})
}
buttonEnviar.addEventListener('click',enviarDados)

//Comando que faz leitura de dados.
lerDado = () => {
    let ler = "lr"

    inputClean() //Limpa campos input.
    
    setTimeout(() => {
        bluetoothSerial.write(ler,null, () => {alert('Erro: Comando de ler dados falhou')})
    },500)
}
buttonLer.addEventListener('click',lerDado)

//Pegando valor recebido pelo dispositivo e dividindo por 10 e transformando em float e colocando nos campos input.
formatarInput = () => {
    inputInstalada.value = parseFloat(getData[0]/10)
    inputMax.value = parseFloat(getData[1]/10)
    inputMin.value = parseFloat(getData[2]/10)
    inputAtual.value = parseFloat(getData[3]/10)
}
