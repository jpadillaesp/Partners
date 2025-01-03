import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from './personas.services';
import { Persona } from './personas.models';

@Component({
  selector: 'app-personas',
  standalone: false,
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  persona: Persona = {nombre:'', id:0, edad:0, correo:''};
  personas: Persona[] = []; // Lista de personas
  personaForm: FormGroup;  // Formulario reactivo
  editMode: boolean = false; // Indica si estamos editando
  selectedPersona: Persona | null = null; // ID de la persona seleccionada para editar

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService
  ) {
    // Definimos el formulario reactivo
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Carga inicial de personas
    this.obtenerPersonas();
  }

  // Obtener todas las personas
  obtenerPersonas(): void {
    this.personasService.getPersonas().subscribe({
      next: (data) => this.personas = data,
      error: (err) => console.error('Error al obtener personas:', err)
    });
  }

  // Agregar o editar una persona
  guardarPersona(): void {
    if (this.personaForm.invalid) {
      return; // Si el formulario es inválido, no procesamos
    }
    if (this.selectedPersona = null) {
      return; // Si el formulario es inválido, no procesamos
    }
    const persona: Persona = this.personaForm.value;

    if (this.editMode && this.selectedPersona !== null) {
      // Editar persona existente
      this.personasService.updatePersona(this.selectedPersona, persona).subscribe({
        next: () => {
          this.obtenerPersonas();
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar persona:', err)
      });
    } else {
      // Crear nueva persona
      this.personasService.createPersona(persona).subscribe({
        next: () => {
          this.obtenerPersonas();
          this.personaForm.reset();
        },
        error: (err) => console.error('Error al crear persona:', err)
      });
    }
  }

  // Cargar persona en el formulario para edición
  editarPersona(persona: Persona): void {
    this.editMode = true;
    if (this.selectedPersona != null && persona != null) {
      this.selectedPersona.id = persona.id;
    }    
    this.personaForm.patchValue(persona);
  }

  // Cancelar la edición
  cancelarEdicion(): void {
    this.editMode = false;
    this.selectedPersona = null;
    this.personaForm.reset();
  }

  // Eliminar una persona
  eliminarPersona(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta persona?')) {
      this.personasService.deletePersona(id).subscribe({
        next: () => this.obtenerPersonas(),
        error: (err) => console.error('Error al eliminar persona:', err)
      });
    }
  }

  onSubmit() {
    console.log('Formulario enviado');
  }
}
