function login() {
    console.log('Inicio de sesión iniciado');  // Agrega este log para verificar si la función se está ejecutando
  
    const email = document.getElementById('exampleDropdownFormEmail2').value;
    const password = document.getElementById('exampleDropdownFormPassword2').value;
  
    const loginData = {
      email: email,
      password: password
    };
  
    console.log('Datos de inicio de sesión:', loginData);  // Agrega este log para verificar los datos que se están enviando
  
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      console.log('Respuesta del servidor:', response);  // Agrega este log para verificar la respuesta del servidor
  
      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos de respuesta:', data);  // Agrega este log para verificar los datos de respuesta
  
      document.getElementById('result').innerHTML = 'Inicio de sesión exitoso';
    })
    .catch(error => {
      console.error('Error:', error);  // Agrega este log para verificar los errores
  
      document.getElementById('result').innerHTML = 'Error: ' + error.message;
    });
  }