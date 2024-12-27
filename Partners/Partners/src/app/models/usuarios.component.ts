import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null; // Para manejar crear/editar
  nuevoUsuario: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (error) => console.error('Error al cargar los usuarios.',error)
    });
  }

  guardarUsuario(): void {
    if (this.usuarioSeleccionado) {
      if (this.nuevoUsuario) {
        // Crear usuario
        this.usuariosService.createUsuario(this.usuarioSeleccionado).subscribe({
          next: () => {
            this.mostrarMensaje('Usuario creado correctamente.');
            this.cargarUsuarios();
            this.cancelar();
          },
          error: (err) => console.error('Error al crear persona:', err)
        });
      } else {
        // Editar usuario
        this.usuariosService.updateUsuario(this.usuarioSeleccionado.id, this.usuarioSeleccionado).subscribe({
          next: () => {
            this.mostrarMensaje('Usuario actualizado correctamente.');
            this.cargarUsuarios();
            this.cancelar();
          },
          error: (err) => console.error('Error al actualizar el usuario.')
        });
      }
    }
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => {
          this.mostrarMensaje('Usuario eliminado correctamente.');
          this.cargarUsuarios();
        },
        error: (error) => console.error('Error al eliminar el usuario.', error)
      });
    }
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
    this.nuevoUsuario = false;
  }

  nuevo(): void {
    this.usuarioSeleccionado = { id: 0, usuario1: '', password: '', fechaCreacion: '', personaId:0, persona:null };
    this.nuevoUsuario = true;
  }

  cancelar(): void {
    this.usuarioSeleccionado = null;
    this.nuevoUsuario = false;
  }

  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }
}
