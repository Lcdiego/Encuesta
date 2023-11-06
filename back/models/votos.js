import mongoose from 'mongoose';

const votoSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  eleccion: String,
});

const Voto = mongoose.model('Voto', votoSchema);

export default Voto;
