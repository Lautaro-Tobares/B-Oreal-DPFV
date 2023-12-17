let carrito = []; 

//evento de clic
let agregarBotones = document.querySelectorAll('.img-catalogo button');

agregarBotones.forEach(function(boton) {
  boton.addEventListener('click', function() {
    //información del producto
    let contenedorProducto = this.closest('.img-catalogo');
    let nombreProducto = contenedorProducto.querySelector('p').innerText;
    let precioProducto = contenedorProducto.querySelector('.precio-catalogo').innerText;
    let imagenProducto = contenedorProducto.querySelector('img').src;

    // objeto a partir de la info
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto,
      imagen: imagenProducto
    };

    
    carrito.push(producto);
   
    actualizarVistaCarrito();

    // mensaje alert
    alert('Producto agregado al carrito: ' + nombreProducto);
  });
});

// actualizar carrito
function actualizarVistaCarrito() {
  let carritoElement = document.getElementById('carrito');
  let scrollableContainer = carritoElement.querySelector('.scrollable-container');

  // vaciar texto del carrito vacio
  scrollableContainer.innerHTML = '';

 
  if (carrito.length === 0) {
    scrollableContainer.innerHTML = '<li><button class="dropdown-item" type="button">Tu carrito está vacío</button></li>';
  } else {
    // si hay productos los muestra
    let total = 0; //total de compra

    carrito.forEach(function(producto) {
      
      let itemContainer = document.createElement('div');
      itemContainer.className = 'd-inline-block'; //para que se vea en horizontal

      // Crea la tarjeta
      let item = document.createElement('div');
      item.className = 'card mb-2'; 
      item.style.width = '150px'; 
     
      let imagenContainer = document.createElement('div');
      imagenContainer.className = 'card-img-top d-flex align-items-center justify-content-center'; // Agrega clases de alineación
      imagenContainer.style.height = '80px'; // ajusta el height

      // img del prodct
      let imagen = document.createElement('img');
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;
      imagen.style.width = '80px'; 
      imagen.style.height = '80px'; 
      imagenContainer.appendChild(imagen);

      
      let cardBody = document.createElement('div');
      cardBody.className = 'card-body text-center'; // centrar texto

      // boton de cada producto
      let boton = document.createElement('button');
      boton.className = 'btn btn-link'; // Agrega la clase 'btn btn-link'
      boton.type = 'button';
      boton.textContent = producto.nombre;

      // precio
      let precio = document.createElement('p');
      precio.textContent = 'Precio: ' + producto.precio;
      precio.className = 'card-text';

      
      cardBody.appendChild(imagenContainer);
      cardBody.appendChild(boton);
      cardBody.appendChild(precio);

      
      item.appendChild(cardBody);

      
      itemContainer.appendChild(item);

      
      scrollableContainer.appendChild(itemContainer);

      // suma el precio del producto al total
      total += parseFloat(producto.precio.replace('$', '').replace(',', ''));
    });

    // muestra el total
    let totalElement = document.createElement('div');
    totalElement.textContent = 'TOTAL: $' + total.toFixed(2); // Formatea el total a dos decimales
    totalElement.className = 'text-center mt-3'; // Alinea el texto al centro y agrega margen superior
    scrollableContainer.appendChild(totalElement);
  }
}