
function fetchRandomDogImage() {
    // Hacer una solicitud GET a la API
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            // Obtener la URL de la imagen de la respuesta
            const imageUrl = data.message;
            // Actualizar la fuente de la imagen en la página
            document.getElementById('dogImage').src = imageUrl;
        })
        .catch(error => {
            console.error('Ha ocurrido un error al obtener la imagen del perro:', error);
        });
}
