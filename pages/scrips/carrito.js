let carrito = [];

// Evento de clic para los botones "AGREGAR+"
let agregarBotones = document.querySelectorAll('.img-catalogo button');

agregarBotones.forEach(function(boton) {
  boton.addEventListener('click', function() {
    // Obtén la información del producto
    let contenedorProducto = this.closest('.img-catalogo');
    let nombreProducto = contenedorProducto.querySelector('p').innerText;
    let precioProductoTexto = contenedorProducto.querySelector('.precio-catalogo').innerText;
    let imagenProducto = contenedorProducto.querySelector('img').src;

    // Extrae el valor numérico del precio del producto
    let precioProducto = parseFloat(precioProductoTexto.replace('$', '').replace(',', ''));

    // Crea un objeto con la información del producto
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto,
      imagen: imagenProducto
    };

    // Agrega el producto al carrito
    carrito.push(producto);

    // Actualiza la vista del carrito después de agregar un producto
    actualizarVistaCarrito();

    // Muestra un mensaje de confirmación solo al agregar un producto
    mostrarSweetAlertCarrito(nombreProducto);
  });
});

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
    let total = 0; // Total de la compra

    carrito.forEach(function(producto, index) {
      let itemContainer = document.createElement('div');
      itemContainer.className = 'd-inline-block';

      // Crea la tarjeta
      let item = document.createElement('div');
      item.className = 'card mb-2';
      item.style.width = '150px';

      let imagenContainer = document.createElement('div');
      imagenContainer.className = 'card-img-top d-flex align-items-center justify-content-center';
      imagenContainer.style.height = '80px';

      // Crea la imagen del producto
      let imagen = document.createElement('img');
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;
      imagen.style.width = '80px';
      imagen.style.height = '80px';
      imagenContainer.appendChild(imagen);

      let cardBody = document.createElement('div');
      cardBody.className = 'card-body text-center';

      // Crea el botón con el nombre del producto
      let boton = document.createElement('button');
      boton.className = 'btn btn-link';
      boton.type = 'button';
      boton.textContent = producto.nombre;

      // Crea el párrafo para mostrar el precio del producto
      let precio = document.createElement('p');
      precio.textContent = 'Precio: $' + producto.precio.toFixed(2);
      precio.className = 'card-text';

      // Crea el botón de eliminar
      let botonEliminar = document.createElement('button');
      botonEliminar.className = 'btn btn-danger btn-sm mt-2';
      botonEliminar.type = 'button';
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', function() {
        // Elimina el producto del carrito
        carrito.splice(index, 1);

        // Actualiza la vista del carrito después de la eliminación
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

// Función para mostrar SweetAlert2 al abrir el carrito
function mostrarSweetAlertCarrito(nombreProductoAgregado) {
  Swal.fire({
    title: '¡Producto agregado!',
    text: `${nombreProductoAgregado} ha sido agregado correctamente al carrito.`,
    icon: 'success',
    showCancelButton: true,
    confirmButtonText: 'Seguir comprando',
    cancelButtonText: 'Finalizar compra',
    customClass: {
      confirmButton: 'btn btn-primary', // Estilo del botón "Seguir comprando"
      cancelButton: 'btn btn-danger'   // Estilo del botón "Finalizar compra"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Acción al hacer clic en "Seguir comprando"
      console.log('Seguir comprando');
    } else {
      // Acción al hacer clic en "Finalizar compra"
      mostrarFormularioCompra();
    }
  });
}

// Función para mostrar el formulario al hacer clic en "Finalizar compra"
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
      confirmButton: 'btn btn-success', // Estilo del botón "Continuar"
      cancelButton: 'btn btn-secondary' // Estilo del botón "Cancelar"
    },
    onOpen: () => {
      // Calcula y muestra el total de la compra al abrir el formulario
      calcularTotalCompra();
    },
    preConfirm: () => {
      // Validaciones personalizadas si es necesario
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const direccion = Swal.getPopup().querySelector('#direccion').value;
      const mail = Swal.getPopup().querySelector('#mail').value;
      const nroTarjeta = Swal.getPopup().querySelector('#nroTarjeta').value;
      const fechaVencimiento = Swal.getPopup().querySelector('#fechaVencimiento').value;
      const terminos = Swal.getPopup().querySelector('#terminos').checked;

      // Ejemplo de validación simple
      if (!nombre || !direccion || !mail || !nroTarjeta || !fechaVencimiento || !terminos) {
        Swal.showValidationMessage('Por favor, completa todos los campos y acepta los términos.');
      }

      // Devuelve los valores del formulario si pasa la validación
      return { nombre, direccion, mail, nroTarjeta, fechaVencimiento, terminos };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Acción al hacer clic en "Continuar"
      const { nombre, direccion, mail, nroTarjeta, fechaVencimiento, terminos } = result.value;
      console.log('Nombre:', nombre);
      console.log('Dirección:', direccion);
      console.log('Email:', mail);
      console.log('Número de Tarjeta:', nroTarjeta);
      console.log('Fecha de Vencimiento:', fechaVencimiento);
      console.log('Aceptó términos y condiciones:', terminos);

      // Muestra el mensaje de agradecimiento
      mostrarAgradecimiento();
    } else {
      // Acción al hacer clic en "Cancelar"
      console.log('Compra cancelada');
    }
  });
}

// Función para mostrar el mensaje de agradecimiento
function mostrarAgradecimiento() {
  Swal.fire({
    title: '¡Muchas gracias!',
    html: 'Por interactuar con Boreal! <i class="fas fa-heart" style="color: red;"></i>',
    icon: 'success'
  });
}

// Función para calcular y mostrar el total de la compra
function calcularTotalCompra() {
  let total = 0;

  // Suma los precios de los productos en el carrito
  carrito.forEach(function(producto) {
    total += producto.precio;
  });

  // Actualiza el elemento HTML que muestra el total de la compra
  let totalElement = Swal.getPopup().querySelector('#totalCompra');
  totalElement.textContent = `TOTAL: $${total.toFixed(2)}`;
}