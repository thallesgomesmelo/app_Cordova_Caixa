let buttonLigar = document.getElementById('ligar')
let buttonEnviar = document.getElementById('send')
let buttonLer = document.getElementById('ready')

ligarBomba = () => {
    let bomba = ""
    bomba += '\n'

    alert("Função botao Ligar")
    bluetoothSerial.write(bomba,null, () => {alert('Erro: Comando de ligar bomba falhou')})
}
buttonLigar.addEventListener('click',ligarBomba)

enviarDados = () => {
    let enviar = ""
    enviar += '\n'

    alert("Função botao Enviar")
    bluetoothSerial.write(enviar,null, () => {alert('Erro: Comando de enviar dados falhou')})
}
buttonEnviar.addEventListener('click',enviarDados)

lerDados = () => {
    let ler = ""
    ler += '\n'

    alert("Função botao Ler")
    bluetoothSerial.write(ler,null, () => {alert('Erro: Comando de ler dados falhou')})
}
buttonLer.addEventListener('click',lerDados)