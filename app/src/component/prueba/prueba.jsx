import React, { useState } from 'react';

const Prueba = () => {
  const [contador, setContador] = useState(0);
  const [votos, setVotos] = useState({ Milei: 0, Massa: 0, Voto_Blanco: 0 });

  const cambiarVotosMilei = () => {
    setVotos({ ...votos, Milei: 5, Massa:4 });
    
  };
 const reiniciarVotos=()=>{
  setVotos('');
 }
 

  // Función para incrementar el contador
  const incrementarContador = () => {
    setContador(contador + 1);
  };

  // Función para reiniciar el contador
  const reiniciarContador = () => {
    setContador(0);
  };
 

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={reiniciarContador}>Reiniciar</button>
      <button onClick={cambiarVotosMilei}>Cambiar Votos de Milei</button>
      <input
        type="radio"
        checked={false}
        onChange={incrementarContador}
      />
      <p> {votos.Milei}{cambiarVotosMilei}</p>
      <button onClick={reiniciarVotos}>reiniciar</button>
      <p> {votos.Massa}{cambiarVotosMilei}</p>
     
    </div>
  );
};

export { Prueba };
