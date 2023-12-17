// Array para almacenar productos en el carrito
let carrito = [];

// Agrega un evento de clic a todos los botones "AGREGAR+"
let agregarBotones = document.querySelectorAll('.img-catalogo button');

agregarBotones.forEach(function(boton) {
  boton.addEventListener('click', function() {
    // Obtén la información del producto
    let contenedorProducto = this.closest('.img-catalogo');
    let nombreProducto = contenedorProducto.querySelector('p').innerText;
    let precioProducto = contenedorProducto.querySelector('.precio-catalogo').innerText;
    let imagenProducto = contenedorProducto.querySelector('img').src;

    // Crea un objeto con la información del producto
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto,
      imagen: imagenProducto
    };

    // Agrega el producto al carrito
    carrito.push(producto);

    // Actualiza la vista del carrito
    actualizarVistaCarrito();

    // Muestra un mensaje de confirmación
    alert('Producto agregado al carrito: ' + nombreProducto);
  });
});

// Modificación en el JavaScript
// Función para actualizar la vista del carrito
function actualizarVistaCarrito() {
    let carritoElement = document.getElementById('carrito');
    let scrollableContainer = carritoElement.querySelector('.scrollable-container');
  
    // Limpia el contenido actual del carrito
    scrollableContainer.innerHTML = '';
  
    // Si el carrito está vacío, muestra el mensaje correspondiente
    if (carrito.length === 0) {
      scrollableContainer.innerHTML = '<li><button class="dropdown-item" type="button">Tu carrito está vacío</button></li>';
    } else {
      // Si hay productos en el carrito, muestra cada producto
      carrito.forEach(function(producto) {
        // Crea un contenedor para cada tarjeta y agrega un estilo para colocarlas horizontalmente
        let itemContainer = document.createElement('div');
        itemContainer.className = 'd-inline-block'; // Agrega la clase 'd-inline-block' para colocar las tarjetas horizontalmente
  
        // Crea la tarjeta
        let item = document.createElement('div');
        item.className = 'card mb-2'; // Agrega la clase 'card' y un margen inferior
        item.style.width = '150px'; // Ajusta el ancho de la tarjeta
  
        // Crea un contenedor para la imagen
        let imagenContainer = document.createElement('div');
        imagenContainer.className = 'card-img-top d-flex align-items-center justify-content-center'; // Agrega clases de alineación
        imagenContainer.style.height = '80px'; // Ajusta la altura
  
        // Crea la imagen del producto
        let imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.style.width = '80px'; // Cambia el tamaño a 80x80
        imagen.style.height = '80px'; // Cambia el tamaño a 80x80
        imagenContainer.appendChild(imagen);
  
        // Crea el contenedor para el cuerpo de la card
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center'; // Alinea el texto al centro
  
        // Crea el botón con el nombre del producto
        let boton = document.createElement('button');
        boton.className = 'btn btn-link'; // Agrega la clase 'btn btn-link'
        boton.type = 'button';
        boton.textContent = producto.nombre;
  
        // Crea el párrafo para mostrar el precio del producto
        let precio = document.createElement('p');
        precio.textContent = 'Precio: ' + producto.precio;
        precio.className = 'card-text';
  
        // Agrega el imagen, el botón y el precio al contenedor del cuerpo de la card
        cardBody.appendChild(imagenContainer);
        cardBody.appendChild(boton);
        cardBody.appendChild(precio);
  
        // Agrega el contenedor del cuerpo de la card al elemento de la tarjeta
        item.appendChild(cardBody);
  
        // Agrega la tarjeta al contenedor
        itemContainer.appendChild(item);
  
        // Agrega el contenedor al elemento del carrito
        scrollableContainer.appendChild(itemContainer);
      });
    }
  }