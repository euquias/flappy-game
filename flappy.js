function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}
function barreira(revesa = false) {
    this.Elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.Elemento.appendChild(revesa ? corpo : borda)
    this.Elemento.appendChild(revesa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}
/* const b = new barreira(true)
b.setAltura(300)
document.querySelector('[wm-flappy]').appendChild(b.Elemento) */

function pardebarreira(altura, abertura, x) {
    this.Elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new barreira(true)
    this.inferior = new barreira(false)

    this.Elemento.appendChild(this.superior.Elemento)
    this.Elemento.appendChild(this.inferior.Elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturainferio = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturainferio)
    }
    this.getx = () =>  parseInt(this.Elemento.style.left.split('px')[0])
    this.setx = x => this.Elemento.style.left =  `${x}px`
    this.getLargura = () => this.Elemento.clientWidth  
    
    this.sortearAbertura()
    this.setx(x)
}

const b = new pardebarreira(700, 200, 800)
document.querySelector('[wm-flappy]').appendChild(b.Elemento)