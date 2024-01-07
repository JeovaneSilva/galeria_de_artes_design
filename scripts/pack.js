

// PACKS codigo
const storage = firebase.storage();
const packsImportados = document.getElementById('packs-importados');
const addPackForm = document.getElementById('addPackForm');

// Configurar referência para o nó 'packs' no Realtime Database
const packsRef = firebase.database().ref('packs');

// Função para criar e adicionar a estrutura HTML do pack
function addPackToPage(imageUrl) {
    const packDiv = document.createElement('div');
    packDiv.className = 'col-2 col-md-2';

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Imagem do Pack';
    imgElement.className = 'img-fluid';

    packDiv.appendChild(imgElement);
    
    packsImportados.appendChild(packDiv);
}

// Adicionar um ouvinte para o formulário de adição de pack
addPackForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const file = addPackForm.querySelector('input[type=file]').files[0];

    // Enviar arquivo para o Firebase Storage
    const uploadTask = storage.ref(`packs/${file.name}`).put(file);

    uploadTask.on("state_changed", function(snapshot) {
        // Atualizações de progresso, se necessário
    }, function(error) {
        console.error("Erro durante o upload:", error);
    }, function() {
        // Upload bem-sucedido
        console.log('Upload realizado com sucesso');

        // Obter a URL da imagem após o upload
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // Adicionar a informação ao Firebase Realtime Database
            packsRef.push({ imageUrl: downloadURL });
        });
    });
});

// Adicionar packs existentes do Realtime Database na página
packsRef.on('child_added', function(snapshot) {
    const pack = snapshot.val();
    addPackToPage(pack.imageUrl);
});
