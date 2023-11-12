import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import './App.css';

function App() {
  const [votos, setVotos] = useState({ Milei: 0, Massa: 0, Voto_Blanco: 0 });
  const [eleccion, setEleccion] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Realizar una solicitud al servidor para obtener los votos al cargar la página
    obtenerVotosDesdeServidor();
  }, []); // El segundo argumento [] asegura que esto solo se ejecute una vez al cargar la página

  const obtenerVotosDesdeServidor = async () => {
    try {
      const response = await axios.get('https://encuesta-node.onrender.com/obtenerVotos');
      const votosActualizados = response.data.reduce((acc, voto) => {
        acc[voto.eleccion]++;
        return acc;
      }, { Milei: 0, Massa: 0, Voto_Blanco: 0 });
      setVotos(votosActualizados);
    } catch (error) {
      console.error('Error al obtener los votos:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emitirVoto = async () => {
    if (eleccion && nombre && email) {
      try {
        await axios.post('https://encuesta-node.onrender.com/registrarVoto', {
          nombre: nombre,
          email: email,
          eleccion: eleccion,
        });
        // Actualiza los votos desde el servidor después de emitir un voto exitosamente
        obtenerVotosDesdeServidor();
      } catch (error) {
        console.error('Error al registrar el voto:', error);
      }
      setEleccion('');
      setNombre('');
      setEmail('');
      handleClose();
    }
  };

  const calcularPorcentaje = (candidato) => {
    const totalVotos = votos.Milei + votos.Massa + votos.Voto_Blanco;
    
    return totalVotos === 0 ? 0 : ((votos[candidato] / totalVotos) * 100).toFixed(2);

  };
 


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // Crear una función que devuelve una promesa
function obtenerDatosDeAPI() {
  return new Promise((resolve, reject) => {
    // Simulamos una solicitud a una API que toma tiempo
    setTimeout(() => {
      const exito = true; // Cambia a false para simular un error
      if (exito) {
        resolve({ mensaje: "Datos obtenidos correctamente" });
      } else {
        reject("Hubo un error al obtener los datos");
      }
    }, 2000); // Simulamos un retraso de 2 segundos
  });
}

// Utilizar la promesa
obtenerDatosDeAPI()
  .then((resultado) => {
    console.log(resultado.mensaje);
  })
  .catch((error) => {
    console.error(error);
  });
  /*let mongo=[1,3]
  function sumaNumerosPares(arr) {
    let total= arr.reduce((total, num) => (num % 2 === 0) ? total + num : total, 0);
    console.log(total);
    return total
  }
 console.log(sumaNumerosPares(mongo)) */
 let mongo = [1, 3];

 function sumaNumerosPares(arr) {
   let total = 0;
 
   for (let num of arr) {
     if (num % 2 === 0) {
       total = total + num;
     } else {
       total = total;
     }
   }
 
   console.log(total);
   return total;
 }
 
 console.log(sumaNumerosPares(mongo));



 let arr=[3,10,11]
 function encontrarNumeroMayor(arr) {
  return Math.max(...arr);
}
console.log(encontrarNumeroMayor(arr));

let palabras = 'pablo';

function esPalindromo(str) {
  return str === str.split('').reverse().join('');
}

console.log(esPalindromo(palabras) );

let cadena = 'Este es un ejemplo para contar vocales en una cadena de texto.';

function contarVocales(str) {
  const vowels = str.match(/[aeiouAEIOU]/g);
  return vowels ? vowels.length : 0;
}

console.log(contarVocales(cadena));


let n =[10]

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
fizzBuzz(n);


let num=[2,3,2,3,4]
function eliminarDuplicados(arr) {
  return [...new Set(arr)];
}
console.log(eliminarDuplicados(num));




  return (
    <div className="App">
      <h1>Diego colman</h1>
      <Button onClick={handleOpen}><span className='candidatos'>Elije tu candidato</span></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Votá Bien!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h1>Votación</h1>
            <div>
              <div className='nombre-email'>
                <label className='nombre-correo'>
                  <span>
                    Nombre:
                  </span>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
                <label className='correo'>
                  <span>
                    Correo Electrónico:
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <label>
                <input
                  type="radio"
                  name="eleccion"
                  value="Milei"
                  checked={eleccion === 'Milei'}
                  onChange={(e) => setEleccion(e.target.value)}
                />
                <span>Candidato Milei</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="eleccion"
                  value="Massa"
                  checked={eleccion === 'Massa'}
                  onChange={(e) => setEleccion(e.target.value)}
                />
                <span>Candidato Massa</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="eleccion"
                  value="Voto_Blanco"
                  checked={eleccion === 'Voto_Blanco'}
                  onChange={(e) => setEleccion(e.target.value)}
                />
                <span>Blanco</span>
              </label>
            </div>
            <button onClick={emitirVoto} className='votar'>Votar</button>
          </Typography>
        </Box>
      </Modal>
      <div className='contenedor-resultados'>
        <h2 className='resultado'>Resultados:</h2>
        <div class="resultados">
          <p>
            <span class="nombre">Milei:</span>
            <span class="milei">{votos.Milei} votos</span>
            <span class="porcentaje">({calcularPorcentaje('Milei')}%)</span>
          </p>
          <p>
            <span class="nombre">Massa:</span>
            <span class="massa">{votos.Massa} votos</span>
            <span class="porcentaje">({calcularPorcentaje('Massa')}%)</span>
          </p>
          <p>
            <span class="nombre">Voto en blanco:</span>
            <span class="votos">{votos.Voto_Blanco} votos</span>
            <span class="porcentaje">({calcularPorcentaje('Voto_Blanco')}%)</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
