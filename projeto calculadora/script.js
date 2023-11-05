const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')


const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]  // Aqui coloquei todos os simbolos/funções que existem na calculadora, que estão la no HTML



document.querySelectorAll('.charKey').forEach(function (charKeyBtn) { // aqui para fazer funcionar quando clica nos botoes da calculadora com o mouse, para cada click executa a function abaixo
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function () {  // aqui definido para quando clicar no botao de limpar/apagar o que esta digitado
    input.value = '' // aqui para quando clicar transformar em uma string vazia
    input.focus  // aqui apenas para melhorar a qualidade e depois que limpar ele continuar com o foco no campo de digitação aberto
})

document.getElementById('copyToClipboard').addEventListener('click', function  (ev) {
    const button = ev.currentTarget // o que acionou o evento, no caso o click no botao
    if   (button.innerText === 'Copy'){
        button.innerText = 'Copied!'  //texto q aparecera dps q clica em copias
        button.classList.add('success') // classe do css adicionada quando copia, para ficar mais bonito
        navigator.clipboard.writeText(resultInput.value) // esse comando serve para copiar o texto para o usuario da pagina
    } else {
        button.innerText = 'Copy' // aqui para quando clicar dnv pode copiar dnv
        button.classList.remove('success') 
    }
})

input.addEventListener('keydown', function (ev) {  //aqui estou dizendo que quando uma tecla for precionada na calculadora ela vai recber esta funcionabilidade
    ev.preventDefault()  //aqui para previnir que quando o usuario clicar na tecla nao va o valor, pois vamos controlar manualmente no codigo
    if (allowedKeys.includes(ev.key)) {   // aqui é se a tecla estiver inclusa dentro das que estao registradas no array
        input.value += ev.key //aqui se ela existir no array ela aparecec no campo de digitaçao
        return
    }
    if (ev.key === 'Backspace') { //aqui se a tecla que o usuario pressionar for igual a de apagar(backspace em ingles)
        input.value = input.value.slice(0, -1) // ele ira remover o ultimo caracter digitado
    }
    if (ev.key === 'Enter') { // aqui pra quando o usuario apertar a tecla enter
        calculate() // quando der enter executar essa function que vou criar abaixo
    }
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate(){
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')

   const result = eval(input.value) // esta função deve ser usada com muito cuidado pois ela executa o valor do input , podendo ate ser um codigo javascript malicioso
   resultInput.value = result
   resultInput.classList.remove('error')
}




  