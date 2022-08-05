function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}
function Barreira(revesa = false) {
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(revesa ? corpo : borda)
    this.elemento.appendChild(revesa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}
/* const b = new Barreira(false)
b.setAltura(300)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  */ 

  function pardebarreira(altura, abertura, x) {
    this.elemento = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturainferio = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturainferio)
    }
    this.getx = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setx = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setx(x)
}

/*  const b = new pardebarreira(700, 300, 800)
document.querySelector('[wm-flappy]').appendChild(b.elemento)    */
 
 function Barreiras(altura, largura, abertura, espaco, notificaponto) {
    this.pares = [
        new pardebarreira(altura, abertura, largura),
        new pardebarreira(altura, largura, largura + espaco),
        new pardebarreira(altura, largura, largura + espaco * 2),
        new pardebarreira(altura, largura, largura + espaco * 3)
    ]
    const delocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setx(par.getx() - delocamento)

            if (par.getx() < - par.getLargura()) {
                par.setx(par.getx() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const crusarmeio = par.getx() + deslocamento >= meio
                && par.getx() < meio
            if (crusarmeio) notificaponto()
        })
    }
}
const barreiras = new Barreiras(700, 1200, 350, 400)
const ariadojogo = document.querySelector('[wm-flappy]')
barreiras.pares.forEach(par => ariadojogo.appendChild(par.elemento))
setInterval(() => {
    barreiras.animar()
}, 30)  
