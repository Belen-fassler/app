import { Component , OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any;
  email:any;
  nuevoNombre: string = '';
  nuevoEmail: string = '';
  nuevaContrasena: string = '';
  nuevaFechaNacimiento: string = '';
  editMode = false; // Add this line

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private auth:AutheticationService) {
    this.nuevoNombre = ''; 
    this.nuevoEmail='';
    this.nuevaContrasena = ''; 
    this.nuevaFechaNacimiento = ''; 
  }

  activarEdicion() {
    this.editMode = true;
  }

  cancelarEdicion() {
    this.editMode = false;
  }

  ngOnInit() {
   
    this.auth.getAuthState().subscribe(user => {
      if (user) {
        // El usuario está logueado, usa los datos del usuario aquí
        console.log(user);
        this.usuario={
          nombre:user.displayName,
          email: user.email,
          password: '',
          fecha: user.photoURL,

        }
      } else {
        // No hay usuario logueado
      }
    });

    
  }

  async guardarCambios() {

    // Guarda los cambios en los campos editados
    if (this.nuevoNombre) {
      this.usuario.nombre = this.nuevoNombre;
    }

    if (this.nuevaContrasena) {
      this.usuario.password = this.nuevaContrasena;
    }

    if (this.nuevoEmail) {
      this.usuario.password = this.nuevoEmail;
    }

    if (this.nuevaFechaNacimiento) {
      this.usuario.fecha = this.nuevaFechaNacimiento;
    }

    // Muestra un mensaje de éxito
    const alert = await this.alertCtrl.create({
      header: 'Cambios Guardados',
      message: 'Los cambios han sido guardados exitosamente.',
      buttons: ['Aceptar'],
    });

    this.auth.changeUser(this.usuario.nombre,this.usuario.fecha,this.usuario.email,this.usuario.password).then(response=>{
      console.log(response)
      localStorage.setItem("userData",JSON.stringify(response));
    }).catch(error=> console.log(error))

    await alert.present();
  }
  
  //Variable utilizada para mostrar la alerta y su opción
  public alertButtons = ['OK'];

  
  //Para que el usuario deba loguearse nuevamente devolviendose también
  //al login
  salir(){
    this.auth.singOut().then(response=>{

      localStorage.removeItem("userData")
      //Cambia el estado "ingresado" de localstorage a "false"
      localStorage.setItem("ingresado","false");
      //redirige la aplicación a "login"
      this.navCtrl.navigateRoot("login");
    }).catch(err=>console.log(err))

  }

  eliminarCuenta() {

    // Puedes agregar lógica para confirmar la eliminación antes de proceder
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?');

    if (confirmacion) {
      // Elimina la cuenta (puedes agregar tu lógica de eliminación aquí)
      this.auth.deleteUser().then(() => {
        console.log('Cuenta eliminada con éxito');
        // Aquí puedes redirigir al usuario o actualizar la UI
      }).catch(error => {
        console.error('Error al eliminar la cuenta:', error);
      });
      // Luego, redirige al usuario a la pantalla de login
      localStorage.setItem("ingresado", "false");
      this.navCtrl.navigateRoot("login");
    }
  }

}
