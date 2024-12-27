import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';  // Importar el modelo Usuario
import { environment } from '../../environments/environment';  // Asegúrate de tener este archivo para la URL de la API

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private apiUrl = `${environment.apiUrl}/api/Usuarios`;  // URL de la API

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener un usuario por su ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, this.getHeaders());
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, this.getHeaders());
  }

  // Eliminar un usuario
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // Configurar los encabezados para JWT
  private getHeaders() {
    const token = localStorage.getItem('token');  // Recuperar el token de autenticación del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado
    });
    return { headers };
  }
}
