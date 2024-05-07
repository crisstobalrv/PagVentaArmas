function agregarAlCarrito(productName, productPrice, quantity) {
    // Crear un objeto que represente el producto
    var product = {
        name: productName,
        price: productPrice,
        quantity: quantity
    };
    
    // Obtener el carrito del localStorage o inicializarlo si aún no existe
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    var existingProductIndex = carrito.findIndex(p => p.name === productName);
    
    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        carrito[existingProductIndex].quantity += quantity;
    } else {
        // Si el producto no está en el carrito, agregarlo
        carrito.push(product);
    }
    
    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function generarProductosCarrito() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var html = '';
    
    carrito.forEach(function(product) {
        html += '<div class="row main align-items-center">';
        html += '<div class="col-2"><img class="img-fluid" src="img/' + product.name.toLowerCase() + '.png"></div>';
        html += '<div class="col">';
        html += '<div class="row text-muted">Pistola</div>';
        html += '<div class="row">' + product.name + '</div>';
        html += '</div>';
        html += '<div class="col">';
        html += '<a href="#">-</a><a href="#" class="border">' + product.quantity + '</a><a href="#">+</a>';
        html += '</div>';
        html += '<div class="col">&dollar; ' + (product.price * product.quantity) + ' <span class="close">&#10005;</span></div>';
        html += '</div>';
    });
    
    return html;
}

document.addEventListener('DOMContentLoaded', function() {
    // Tu código JavaScript aquí
    
    // Obtener el contenedor del carrito
    var carritoContainer = document.querySelector('.cart');
    
    // Generar el HTML de los productos en el carrito
    var productosHTML = generarProductosCarrito();
    
    // Actualizar el HTML del contenedor del carrito
    carritoContainer.innerHTML = productosHTML;
});
