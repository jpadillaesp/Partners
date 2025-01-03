import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPersonasComponent } from './usuarios-personas.component';

describe('UsuariosPersonasComponent', () => {
  let component: UsuariosPersonasComponent;
  let fixture: ComponentFixture<UsuariosPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosPersonasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
