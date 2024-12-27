import { Persona } from '../models/personas.models';
export interface Usuario {
  id: number;
  usuario1: string;
  password: string;
  fechaCreacion: string;
  personaId: number;
  persona: Persona | null ;
}
