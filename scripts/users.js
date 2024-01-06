const firebaseConfig = {
    apiKey: "AIzaSyC5E8XYNymJJbP9qvYBBobZyKvumqZkd2Y",
    authDomain: "jean-designs.firebaseapp.com",
    projectId: "jean-designs",
    storageBucket: "jean-designs.appspot.com",
    messagingSenderId: "605079963145",
    appId: "1:605079963145:web:66f230d23c4476d15e5ad8"
    };
firebase.initializeApp(firebaseConfig);



    
const storage = firebase.storage();
const designsImportados = document.getElementById('designs-importados');
const addDesignForm = document.getElementById('addDesignForm');
const textDesign = document.getElementById('textDesign');

// Configurar referência para o nó 'designs' no Realtime Database
const designsRef = firebase.database().ref('designs');

// Função para criar e adicionar a estrutura HTML do design
function addDesignToPage(imageUrl, name) {
    const designDiv = document.createElement('div');
    designDiv.className = 'col-12 col-md-4';

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Imagem Carregada';
    imgElement.className = 'img-fluid';

    const bannerContentDiv = document.createElement('div');
    bannerContentDiv.className = 'banner-content';
    const h3Element = document.createElement('h3');
    h3Element.textContent = name;

    bannerContentDiv.appendChild(h3Element);
    designDiv.appendChild(imgElement);
    designDiv.appendChild(bannerContentDiv);
    
    designsImportados.appendChild(designDiv);
}


// Adicionar designs existentes do Realtime Database na página
designsRef.on('child_added', function(snapshot) {
    const design = snapshot.val();
    addDesignToPage(design.imageUrl, design.name);
});
