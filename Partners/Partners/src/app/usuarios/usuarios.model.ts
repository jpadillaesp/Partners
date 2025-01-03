import { Persona } from '../personas/personas.models';
export interface Usuario {
  id: number | 0;
  usuario1: string;
  password: string;
  fechaCreacion: string;
  personaId: number;
  persona: Persona | null ;
}
