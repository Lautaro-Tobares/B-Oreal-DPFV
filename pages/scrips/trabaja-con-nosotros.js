document.getElementById('enviarBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
  
    // toma los valores dados por el usuario
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let acepto = document.getElementById('acepto').checked;
  
    //validaciones
    if (nombre === '' || apellido === '' || email === '' || !acepto) {
      alert('Por favor, completa todos los campos y acepta los términos y condiciones.');
    } else {
      // crea 'PostulantesBoreal' y almacena los datos
      let postulante = {
        nombre: nombre,
        apellido: apellido,
        email: email
      };
  
      // Mostrar en consola
      console.log('Postulantes Boreal:');
      console.log(postulante);

      alert('Gracias elegirnos. En los próximos días te contactaremos al correo brindado.');

  
      
      document.getElementById('miFormulario').reset(); 
    }
  });