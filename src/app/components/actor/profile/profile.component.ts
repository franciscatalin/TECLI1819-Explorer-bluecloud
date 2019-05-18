import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActorService } from 'src/app/services/actor.service';
import { ValidateURLOptional } from '../../shared/optionalUrl.validator';
import { existingPhoneNumValidator } from '../../shared/existingPhone.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends TranslatableComponent implements OnInit {

  // Creamos un atributo que va a ser el propio formulario (un grupo de campos formulario)
  profileForm: FormGroup;
  actor: Actor;
  // Array que indica las opciones que tendrá el combo del lenguaje dentro del formulario de edición de perfil
  langs = ['en', 'es'];

  // Para poder construir el formulario necesitamos el FormBuilder
  constructor(private fb: FormBuilder,
    private router: Router, private authService: AuthService,
    private actorService: ActorService, private translateService: TranslateService) {
    super(translateService);
  }

  // Cuando se esté inicializando el componente, lo primero que vamos a hacer es crear el formulario
  ngOnInit() {
    this.createForm();
  }

  // Método donde creamos el formulario, es decir donde definimos los campos de los que consta el formulario creando un grupo con "group"
  // El formulario se crea inicialmente vacío hasta que cargamos el actor y se indica los validadores
  createForm() {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required], // valor requerido
      surname: ['', Validators.required], // valor requerido
      email: [''],
      password: [''],
      // usamos el patrón para solamente aceptar dígitos numéricos
      // además de eso tengo otro validador asíncrono para mirar en base de datos que no tenga otro usuario con el mismo teléfono
      phone: ['', [Validators.pattern('[0-9]+')], [existingPhoneNumValidator(this.actorService)]],
      address: ['', Validators.maxLength(50)], // máximo 50 caracteres
      preferredLanguage: [''],
      photo: ['', ValidateURLOptional], // Aquí utilizaremos un validador definido por nosotros (custom)
      role: ['']
    });

    // El formulario por defecto no tiene que aparecer vacío, tiene que aparecer con los datos del usuario logueado
    // Recuperamos el actor logueado actualmente con el método getCurrentActor, y me quedo con su id
    // Ese id se lo paso al método getActor, que me devolverá los datos de un actor dado su id
    // Como es un método de servicio que llama a backend tendremos que esperar a que la promesa se resuelva
    // Cuando me llegue el actor, (si no es nulo), cargo en los campos definidos anteriormente en el formulario, los valores exactos
    // Con setValue establezco como valor del campo id del formulario, el id que nos ha devuelto el servidor backend
    // Esto solamente sirve para cargar los datos en el formulario, según como se defina el html, estos campos serán visibles o no
    const idActor = this.authService.getCurrentActor().id;
    this.actorService.getActor(idActor).then((actor) => {
      this.actor = actor;
      console.log(JSON.stringify(actor));
      if (actor) {
        this.profileForm.controls['id'].setValue(actor.id);
        this.profileForm.controls['name'].setValue(actor.name);
        this.profileForm.controls['surname'].setValue(actor.surname);
        this.profileForm.controls['email'].setValue(actor.email);
        this.profileForm.controls['password'].setValue(actor.password);
        this.profileForm.controls['phone'].setValue(actor.phone);
        this.profileForm.controls['preferredLanguage'].setValue(actor.preferredLanguage);
        this.profileForm.controls['role'].setValue(actor.role);
        this.profileForm.controls['address'].setValue(actor.address);
      }
});

  }

  // Método que se ejecuta cuando le damos al botón salvar del formulario de edición
  onSubmit() {
    // se recuperan los valores que el usuario haya podido modificar
    const formModel = this.profileForm.value;
    // Llamo a un método que vuelca al servidor los valores que ha modificado el usuario
    this.actorService.updateProfile(formModel).then((val) => {
      console.log(val);
      // Si todo va bien vuelvo a la página que hayamos definido
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.error(err);
    });
    }

    // Este método se ejecuta al pinchar en el botón cancelar y lo que hacemos es volver al menú principal
    goBack(): void {
      this.router.navigate(['/home']);
    }

}
