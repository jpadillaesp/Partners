import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/personas.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private apiUrl: string = `${environment.apiUrl}/personas`; // Endpoint base para las personas

  constructor(private http: HttpClient) { }

  // Obtener todas las personas
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  // Crear una nueva persona
  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  // Actualizar una persona existente
  updatePersona(id: number, persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, persona);
  }

  // Eliminar una persona
  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
