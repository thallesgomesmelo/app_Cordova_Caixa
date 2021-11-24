let address = ""
let getData = []
let list = document.getElementById("listDevices")
let inputInstalada = document.getElementById('alturaInstalada')
let inputMax = document.getElementById('alturaMax')
let inputMin = document.getElementById('alturaMin')
let inputAtual = document.getElementById('alturaAtual')


refresh = () => {
    address = ""
    clean()
    App.listPairedDevices()
}

clean = () => {
    document.getElementById('listDevices').innerHTML = ' '
}

inputClean = () => {
    inputInstalada.value = ''
    inputMax.value = ''
    inputMin.value = ''
    inputAtual.value = ''
}

// cleanTerminal = () => {
//     document.getElementById('screenTerminal').innerHTML = ' '
// }

closeTerminal = () => { 
    document.querySelector('.terminal').classList.remove('active')
}

const App = {
    initialize() {
        document.addEventListener('deviceready', App.onDeviceReady);
    },
    
    onDeviceReady() {
        bluetoothSerial.isEnabled(App.listPairedDevices, () => {alert("Erro: Bluetooth desligado")})
    },

    listPairedDevices() {
        bluetoothSerial.list(devices => {
            if(devices == devices.length){
                list.append('Erro: Não encontrou dispositivos')
            } else {
                devices.forEach(device => {                    
                    inputRadio = document.createElement('input')
                    inputRadio.setAttribute('type', 'radio')
                    inputRadio.setAttribute('id', device.id)
                    inputRadio.value = device.address
                    inputRadio.name = 'device.name'
                    inputRadio.addEventListener('click', App.selectDevice)
                    let tagLabel = document.createElement('label')
                    let texto = document.createTextNode(`${device.name}`)
                    tagLabel.setAttribute('for', device.id)
                    tagLabel.appendChild(texto)

                    let tagDiv = document.createElement('div')
                    tagDiv.appendChild(inputRadio)
                    tagDiv.appendChild(tagLabel)

                    list.append(tagDiv)
                })
            }
        }, () => {alert("Don't list")}) 
    },

    selectDevice(event) { 
        address = event.currentTarget.value
    },  

    connect() {
        bluetoothSerial.connect(address, App.openTerminal, 
            () => {
                if(address === ""){
                    alert("Erro: Não foi selecionado um dispositivo.")
                } else {
                    alert("Erro: Perdeu conexão com dispositivo.")
                }
            })
    },

    toggleConnection() {
        //Botão Desconectar
        bluetoothSerial.isConnected(
            () => { bluetoothSerial.disconnect(App.deviceDisconnected, error => {alert("Error:\n" + error)})
                    closeTerminal()
                    // cleanTerminal()
                    refresh()             
                },
                () => {
                    closeTerminal()
                    // cleanTerminal()
                    refresh()
                }
        )
    },

    openTerminal() {
        document.querySelector('.terminal').classList.add('active')
        inputClean()
        bluetoothSerial.subscribe('\n', App.handleData, error => {alert("Erro:\n" + error)})
    },

    deviceDisconnected() {
        bluetoothSerial.unsubscribe(App.handleData, error => {alert('Erro:\n' + error)})
        address = ""
    },

    handleData(data) {
        App.displayInTerminal(data, true)
    },

    displayInTerminal(data, isIncoming) {       
        if (isIncoming) {
            //resposta do dispositivo
            alert("dados chegando " +data)
            if(/ev/.test(data)){
                //Pegando valores e separando, depois adiciona a um array
                let guarda = data.slice(3)
                getData = guarda.split(",")
                
                inputClean() //Limpo os campos input depois adiciono valores a eles

                //Adiciomando valores nos campos input
                inputInstalada.value = getData[0]
                inputMax.value = getData[1]
                inputMin.value = getData[2]
                inputAtual.value = getData[3]
            } else if(/evok/.test(data)) {
                alert("testando valor ok")
            } else {
                alert("Retormando vazio" + data)
            }
        } else {
            //dados que usuario envia
            alert("estou enviando: " + data)
        }
    }
}

App.initialize()

// ********************   Chamados dos Botões   ******************************************
document.getElementById("conectar").addEventListener("click", App.connect)
document.getElementById("disconnect").addEventListener('click', App.toggleConnection)
document.getElementById("refreshList").addEventListener("click", refresh)