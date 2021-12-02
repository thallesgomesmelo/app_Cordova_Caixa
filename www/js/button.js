let buttonLigar = document.getElementById('ligar')
let buttonEnviar = document.getElementById('send')
let buttonLer = document.getElementById('ready')

let inputInstalada = document.getElementById('alturaInstalada')
let inputMax = document.getElementById('alturaMax')
let inputMin = document.getElementById('alturaMin')
let inputAtual = document.getElementById('alturaAtual')

//Limpa campos input.
inputClean = () => {
    inputInstalada.value = ''
    inputMax.value = ''
    inputMin.value = ''
    inputAtual.value = ''
}

//Botão de Ligar Bomba.
buttonLigar.addEventListener('click',ligarBomba = () => {
                    bluetoothSerial.write('bb',null, () => {alert('Erro: Comando de ligar bomba falhou')})
                })

//Comando de envio de dados.
enviarDados = () => {
    let valueAlturaInstalada = parseFloat(inputInstalada.value*10)
    let valueAlturaMax = parseFloat(inputMax.value*10)
    let valueAlturaMin = parseFloat(inputMin.value*10)
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
    } else { //Validando Menor de 99 pra adicionar o 0.
        if(valueAlturaInstalada < 99){
            enviar = `ev,0${valueAlturaInstalada}0,${valueAlturaMax},${valueAlturaMin},`

        } else if(valueAlturaMax < 99){
            enviar = `ev,${valueAlturaInstalada},0${valueAlturaMax}0,${valueAlturaMin},`

        } else if(valueAlturaMin < 99){
            enviar = `ev,${valueAlturaInstalada},${valueAlturaMax},0${valueAlturaMin}0,`

        } else if(valueAlturaInstalada < 99 && valueAlturaMax < 99 && valueAlturaMin < 99){
            enviar = `ev,0${valueAlturaInstalada}0,0${valueAlturaMax}0,0${valueAlturaMin}0,`

        } else {
            enviar = `ev,${valueAlturaInstalada},${valueAlturaMax},${valueAlturaMin},`
        }
    }
    bluetoothSerial.write(enviar,null, () => {alert('Erro: Comando de enviar dados falhou')})
}
buttonEnviar.addEventListener('click',enviarDados)

//Comando que faz leitura de dados.
lerDado = () => {    
    inputClean() //Limpa campos input.
    
    setTimeout(() => {
        bluetoothSerial.write("lr",null, () => {alert('Erro: Comando de ler dados falhou')})
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
