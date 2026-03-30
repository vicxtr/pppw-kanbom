const inputTarefa = document.getElementById("dadosLista")
const pessoaTarefa = document.getElementById("pessoaTarefa")
const tarefaImportante = document.getElementById("tarefaImportante")
const lista = document.getElementById("lista")  
const container = document.getElementById("container")
let textoAntigo = []
let contagemTarefa = 0

function criarTarefas() {

    const tarefa = inputTarefa.value
    const pessoa = pessoaTarefa.value
    const criarTarefa = document.createElement("span")

    if (tarefa === "" || pessoa === "") {

        alert("Preencha todos os campos de informações")

        return

    } else {

        contagemTarefa++
        criarTarefa.id = `tarefa${contagemTarefa}`
        criarTarefa.className = "areaLista"
    }

    criarTarefa.innerHTML = `
        <p id="texto${contagemTarefa}">
            ${tarefaImportante.checked ? "<strong>Tarefa importante</strong><br><br>" : ""}
            Tarefa:  ${tarefa}<br>
            Pessoa:  ${pessoa}
        </p>
        <div class="todosBotoes">
            <div class="tarefaConcluida">
                    <label class="checkbox-container">Tarefa concluída:
                    <input type="checkbox" id="check${contagemTarefa}" onchange="marcarConcluida(${contagemTarefa})"/>
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="botoesLista">
                <button onclick="apagarTarefa(${contagemTarefa})">
                    Apagar
                </button>
                <button id="botaoEditar${contagemTarefa}" onclick="editarTarefa(${contagemTarefa})">
                    Editar
                </button>
            </div>
        </div>
    `

    tarefaImportante.checked 
    ?   lista.prepend(criarTarefa) 
    :   lista.appendChild(criarTarefa)

    inputTarefa.value = ""
    pessoaTarefa.value = ""
    tarefaImportante.checked = false

}

function limparLista() {

    if (lista.childElementCount > 0) {
        lista.innerHTML = ""
        contagemTarefa = 0

        alert("Lista limpa com sucesso")
    }


}

function apagarTarefa(indice) {

    const tarefaApagar = document.getElementById(`tarefa${indice}`)
    lista.removeChild(tarefaApagar)

    alert("Tarefa apagada com sucesso")
}

function marcarConcluida(indice) {

    const checkbox = document.getElementById(`check${indice}`)
    const elementoSelecionado = document.getElementById(`texto${indice}`)
    const span = document.getElementById(`tarefa${indice}`)
    const botao = document.getElementById(`botaoEditar${indice}`)

    if(checkbox.checked){
        elementoSelecionado.style.textDecoration = "line-through"
        elementoSelecionado.style.textDecorationColor = "#00ff33da"
        span.style.opacity = "50%"
        botao.style.display = "none"

    }else{
        elementoSelecionado.style.textDecoration = "none" 
        span.style.opacity = "100%"
        botao.style.display = "flex"
    }
}

function editarTarefa(indice) {

    const tarefaEditar = document.getElementById(`tarefa${indice}`)

    textoAntigo[indice] = tarefaEditar.innerHTML

    tarefaEditar.className = "areaEditar"

    tarefaEditar.innerHTML = `
            <div class="informacoesTarefaEditar">
                <label>Insira a atividade:</label>
                <input type="text" id="editarTarefa${indice}">
                <label>Quem irá realizar:</label>
                <input type="text" id="editarPessoa${indice}">
            </div>
            <div class="todosBotoesEditar">
                <div class="tarefaImportanteEditar">
                    <label class="checkbox-container">Tarefa importante:
                        <input type="checkbox" id="check${indice}" onchange="editarImportante(${indice})"/>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="botoesEditar">
                    <button onclick="salvarEdicao(${indice})">Salvar</button>
                    <button onclick="cancelarEdicao(${indice})">Cancelar</button>
                </div>
            </div>
    `
}

function salvarEdicao(indice) {

    const tarefa = document.getElementById(`editarTarefa${indice}`).value
    const pessoa = document.getElementById(`editarPessoa${indice}`).value
    const importante = document.getElementById(`check${indice}`).checked


    const tarefaEditar = document.getElementById(`tarefa${indice}`)

    if (tarefa === "" || pessoa === "") {

        
        alert("Preencha todos os campos de informações")

        return

    }

    tarefaEditar.innerHTML = `
        <p id="texto${indice}">
            ${importante ? "<strong>Tarefa importante</strong><br><br>" : ""}
            Tarefa: ${tarefa}<br>
            Pessoa: ${pessoa}<br>
        </p>
        <div class="todosBotoes">
        <div class="tarefaConcluida">
            <label class="checkbox-container">Tarefa importante:
                <input type="checkbox" id="check${indice}" onchange="marcarConcluida(${indice})"/>
                <span class="checkmark"></span>
             </label>
        </div>
            <div class="botoesLista">
                <button onclick="apagarTarefa(${indice})">Apagar</button>
                <button id="botaoEditar${indice}" onclick="editarTarefa(${indice})">Editar</button>
            </div>
        </div>
    `

    tarefaEditar.className = "areaLista"
    
    alert("Alterações salvas com sucesso")
}

function cancelarEdicao(indice) {
    const span = document.getElementById(`tarefa${indice}`)

    const cancelar = document.getElementById(`tarefa${indice}`)
    cancelar.innerHTML = textoAntigo[indice]

    span.className = "areaLista"
}