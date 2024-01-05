function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href="../index.html"
    }).catch(() => {
        alert('Erro ao fazer LogOut')
    })
}


function abrirModal() {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const slidercontainer = document.querySelector('main')
    const destaques = document.querySelector('#featured-container')
    const modal = document.querySelector('.janela-modal')
    modal.classList.add('abrir')

    header.style.display = "none"
    footer.style.display = "none"
    slidercontainer.style.display = "none"
    destaques.style.display = "none"

   

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar') {
            modal.classList.remove('abrir')

            header.style.display = "block"
            footer.style.display = "block"
            slidercontainer.style.display = "block"
            destaques.style.display = "block"
        }
    })
}

function enviarEmail() {
    window.alert('Obrigado pela sua mensagem, aguarde um momento!')
}