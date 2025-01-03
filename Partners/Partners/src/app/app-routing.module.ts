import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { PersonasComponent } from './personas/personas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosPersonasComponent } from './usuarios-personas/usuarios-personas.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'personas', component: PersonasComponent, canActivate: [AuthGuard] },
  //{ path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'personas', component: PersonasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'dashboard', component: UsuariosPersonasComponent },
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
