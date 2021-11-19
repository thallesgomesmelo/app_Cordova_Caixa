let address = ""
let list = document.getElementById("listDevices")

refresh = () => {
    address = ""
    clean()
    App.listPairedDevices()
}

clean = () => {
    document.getElementById('listDevices').innerHTML = ' '
}

cleanTerminal = () => {
    document.getElementById('screenTerminal').innerHTML = ' '
}

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
                    cleanTerminal()
                    refresh()             
                },
                () => {
                    closeTerminal()
                    cleanTerminal()
                    refresh()
                }
        )
    },

    openTerminal() {
        document.querySelector('.terminal').classList.add('active')
        cleanTerminal()
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
        let dataContainer = document.getElementById('screenTerminal')
       
        if (isIncoming) {
           
        } 
        dataContainer.append(data)
    }
}

App.initialize()

// ********************   Chamados dos Botões   ******************************************
document.getElementById("conectar").addEventListener("click", App.connect)
document.getElementById("disconnect").addEventListener('click', App.toggleConnection)
document.getElementById("refreshList").addEventListener("click", refresh)
document.getElementById("clean").addEventListener('click', cleanTerminal)