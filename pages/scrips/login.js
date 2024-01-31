function login() {
    console.log('Inicio de sesión iniciado');  
  
    const email = document.getElementById('exampleDropdownFormEmail2').value;
    const password = document.getElementById('exampleDropdownFormPassword2').value;
  
    const loginData = {
      email: email,
      password: password
    };
  
    console.log('Datos de inicio de sesión:', loginData);  
  
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      console.log('Respuesta del servidor:', response);  
      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos de respuesta:', data);  
  
      document.getElementById('result').innerHTML = 'Inicio de sesión exitoso';
    })
    .catch(error => {
      console.error('Error:', error);  
  
      document.getElementById('result').innerHTML = 'Error: ' + error.message;
    });
  }