let carrito = [];

// clic para los botones "AGREGAR+"
let agregarBotones = document.querySelectorAll('.img-catalogo button');

agregarBotones.forEach(function(boton) {
  boton.addEventListener('click', function() {
    //info del producto
    let contenedorProducto = this.closest('.img-catalogo');
    let nombreProducto = contenedorProducto.querySelector('p').innerText;
    let precioProductoTexto = contenedorProducto.querySelector('.precio-catalogo').innerText;
    let imagenProducto = contenedorProducto.querySelector('img').src;

    //valor numérico del precio del producto
    let precioProducto = parseFloat(precioProductoTexto.replace('$', '').replace(',', ''));

    // crea un objeto con la info del producto
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto,
      imagen: imagenProducto
    };

    // agrega el producto al carrito
    carrito.push(producto);

    // actualiza la vista del carrito después de agregar un producto
    actualizarVistaCarrito();

    // muestra un mensaje de confirmación al agregar un producto
    mostrarSweetAlertCarrito(nombreProducto);
  });
});

// función para actualizar la vista del carrito
function actualizarVistaCarrito() {
  let carritoElement = document.getElementById('carrito');
  let scrollableContainer = carritoElement.querySelector('.scrollable-container');

  // limpia el contenido actual del carrito
  scrollableContainer.innerHTML = '';

  // si el carrito está vacío
  if (carrito.length === 0) {
    scrollableContainer.innerHTML = '<li><button class="dropdown-item" type="button">Tu carrito está vacío</button></li>';
  } else {
    // si hay productos, muestra c/u
    let total = 0; // Total de la compra

    carrito.forEach(function(producto, index) {
      let itemContainer = document.createElement('div');
      itemContainer.className = 'd-inline-block';

      // crea la card
      let item = document.createElement('div');
      item.className = 'card mb-2';
      item.style.width = '150px';

      let imagenContainer = document.createElement('div');
      imagenContainer.className = 'card-img-top d-flex align-items-center justify-content-center';
      imagenContainer.style.height = '80px';

      //imagen del producto
      let imagen = document.createElement('img');
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;
      imagen.style.width = '80px';
      imagen.style.height = '80px';
      imagenContainer.appendChild(imagen);

      let cardBody = document.createElement('div');
      cardBody.className = 'card-body text-center';

      // crea el nombre del producto
      let boton = document.createElement('button');
      boton.className = 'btn btn-link';
      boton.type = 'button';
      boton.textContent = producto.nombre;

      // crea el p para mostrar el precio del producto
      let precio = document.createElement('p');
      precio.textContent = 'Precio: $' + producto.precio.toFixed(2);
      precio.className = 'card-text';

      //botón de eliminar
      let botonEliminar = document.createElement('button');
      botonEliminar.className = 'btn btn-danger btn-sm mt-2';
      botonEliminar.type = 'button';
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', function() {
        // elimina el producto del carrito
        carrito.splice(index, 1);

        // actualiza la vista del carrito después de eliminar
        actualizarVistaCarrito();
      });

      cardBody.appendChild(imagenContainer);
      cardBody.appendChild(boton);
      cardBody.appendChild(precio);
      cardBody.appendChild(botonEliminar);

      item.appendChild(cardBody);
      itemContainer.appendChild(item);
      scrollableContainer.appendChild(itemContainer);

     
    });

  }
}

// función para mostrar msj de SweetAlert2 al abrir el carrito
function mostrarSweetAlertCarrito(nombreProductoAgregado) {
  Swal.fire({
    title: '¡Producto agregado!',
    text: `${nombreProductoAgregado} ha sido agregado correctamente al carrito.`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Seguir comprando',
    cancelButtonText: 'Finalizar compra',
    customClass: {
      confirmButton: 'btn btn-primary', // estilo del botón "Seguir comprando"
      cancelButton: 'btn btn-danger'   // estilo del botón "Finalizar compra"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // al hacer clic en "Seguir comprando"
      console.log('Seguir comprando');
    } else {
      // al hacer clic en "Finalizar compra"
      mostrarFormularioCompra();
    }
  });
}

// función para mostrar el formulario al hacer clic en "Finalizar compra"
function mostrarFormularioCompra() {
  Swal.fire({
    title: 'Completa tus datos',
    html:
      '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
      '<input id="direccion" class="swal2-input" placeholder="Dirección">' +
      '<input id="mail" class="swal2-input" placeholder="Email">' +
      '<input id="nroTarjeta" class="swal2-input" placeholder="Número de Tarjeta">' +
      '<input id="fechaVencimiento" class="swal2-input" placeholder="Fecha de Vencimiento">' +
      '<div id="totalCompra" class="text-right mt-3">TOTAL: $0.00</div>' +
      '<input type="checkbox" id="terminos" class="swal2-checkbox"> <label for="terminos">Acepto los términos y condiciones</label>'+
      '<p>Datos ilustrativos para el proyecto, formulario no real.</p>',    
      showCancelButton: true,
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'btn btn-success', 
      cancelButton: 'btn btn-secondary' 
    },
    onOpen: () => {
      
      calcularTotalCompra();
    },
    preConfirm: () => {
      // Validaciones 
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const direccion = Swal.getPopup().querySelector('#direccion').value;
      const mail = Swal.getPopup().querySelector('#mail').value;
      const nroTarjeta = Swal.getPopup().querySelector('#nroTarjeta').value;
      const fechaVencimiento = Swal.getPopup().querySelector('#fechaVencimiento').value;
      const terminos = Swal.getPopup().querySelector('#terminos').checked;

      
      if (!nombre || !direccion || !mail || !nroTarjeta || !fechaVencimiento || !terminos) {
        Swal.showValidationMessage('Por favor, completa todos los campos y acepta los términos.');
      }

      // devuelve los valores del formulario si pasa la validación
      return { nombre, direccion, mail, nroTarjeta, fechaVencimiento, terminos };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // al hacer clic en "Continuar"
      const { nombre, direccion, mail, nroTarjeta, fechaVencimiento, terminos } = result.value;
      console.log('Nombre:', nombre);
      console.log('Dirección:', direccion);
      console.log('Email:', mail);
      console.log('Número de Tarjeta:', nroTarjeta);
      console.log('Fecha de Vencimiento:', fechaVencimiento);
      console.log('Aceptó términos y condiciones:', terminos);

      // mensaje de agradecimiento
      mostrarAgradecimiento();
    } else {
      // al hacer clic en "Cancelar"
      console.log('Compra cancelada');
    }
  });
}

// mostrar el mensaje de agradecimiento
function mostrarAgradecimiento() {
  Swal.fire({
    title: '¡Muchas gracias!',
    html: 'Por interactuar con Boreal!',
    icon: 'success'
  });
}

// función para calcular y mostrar el total de la compra
function calcularTotalCompra() {
  let total = 0;

  // suma los precios de los productos en el carrito
  carrito.forEach(function(producto) {
    total += producto.precio;
  });

  //muestra el total de la compra
  let totalElement = Swal.getPopup().querySelector('#totalCompra');
  totalElement.textContent = `TOTAL: $${total.toFixed(2)}`;
}