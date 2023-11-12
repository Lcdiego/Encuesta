import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Voto from './models/votos.js';
import dotenv from 'dotenv';



const app = express();
const port =  3001;

app.use(cors());
app.use(express.json());
dotenv.config();


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error en la conexión a MongoDB:', error);
  });

 
app.post('/registrarVoto', async (req, res) => {
  try {
    const { nombre, email, eleccion } = req.body;
    const voto = new Voto({ nombre, email, eleccion });
    await voto.save();
    res.json({ message: 'Voto registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el voto' });
  }
});
// Ruta para obtener todos los votos
app.get('/obtenerVotos', async (req, res) => {
  try {
    const votos = await Voto.find(); // Recupera todos los votos de la base de datos
    res.json(votos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los votos' });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
