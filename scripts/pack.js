function voltar() {
    window.location.href="../pages/admin.html"
}


// PACKS codigo
const storage = firebase.storage();
const packsImportados = document.getElementById('packs-importados');
const addPackForm = document.getElementById('addPackForm');

// Configurar referência para o nó 'packs' no Realtime Database
const packsRef = firebase.database().ref('packs');

// Função para criar e adicionar a estrutura HTML do pack
function addPackToPage(imageUrl, downloadUrl, fileName) {
    const packDiv = document.createElement('div');
    packDiv.className = 'col-2 col-md-2';

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Imagem do Pack';
    imgElement.className = 'img-fluid';

    // Adiciona um link de download à imagem
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = fileName; // Usa o nome do arquivo fornecido
    downloadLink.appendChild(imgElement);

    // Adiciona um ouvinte de evento de clique ao link de download
    downloadLink.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = downloadUrl; // Redireciona para a URL da imagem para iniciar o download
    });

    packDiv.appendChild(downloadLink);

    packsImportados.appendChild(packDiv);
}

// Adicionar um ouvinte para o formulário de adição de pack
addPackForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const file = addPackForm.querySelector('input[type=file]').files[0];

    // Gera um UID (identificador único) para o nome do arquivo
    const uid = firebase.auth().currentUser.uid;
    const fileName = `${uid}_${Date.now()}_${file.name}`;

    // Enviar arquivo para o Firebase Storage
    const uploadTask = storage.ref(`packs/${fileName}`).put(file);

    uploadTask.on("state_changed", function (snapshot) {
        // Atualizações de progresso, se necessário
    }, function (error) {
        console.error("Erro durante o upload:", error);
    }, function () {
        // Upload bem-sucedido
        console.log('Upload realizado com sucesso');

        // Obter a URL da imagem após o upload
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            // Adicionar a informação ao Firebase Realtime Database
            packsRef.push({ imageUrl: downloadURL, downloadUrl: downloadURL, fileName: fileName });
        });
    });
});

// Adicionar packs existentes do Realtime Database na página
packsRef.on('child_added', function (snapshot) {
    const pack = snapshot.val();
    addPackToPage(pack.imageUrl, pack.downloadUrl, pack.fileName);
});