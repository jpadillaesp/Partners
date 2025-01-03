import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios-personas',
  standalone: false,
  
  templateUrl: './usuarios-personas.component.html',
  styleUrl: './usuarios-personas.component.css'
})
export class UsuariosPersonasComponent {
  personas = [
    { id: 1, nombre: 'Juan Pérez', usuario: '' },
    { id: 2, nombre: 'Ana Gómez', usuario: '' },
  ];

  usuarios = [
    { id: 1, nombre: 'admin' },
    { id: 2, nombre: 'user1' },
  ];

  asociarUsuario(persona: any): void {
    if (persona.usuario) {
      console.log(`Persona ${persona.nombre} asociada con usuario ${persona.usuario}`);
      alert(`Asociación realizada con éxito: ${persona.nombre} -> ${persona.usuario}`);
    } else {
      alert('Seleccione un usuario antes de asociar.');
    }
  }
}
