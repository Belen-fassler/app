import { Component , OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any;
  correo:any;
  nuevoNombre: string = '';
  nuevaContrasena: string = '';
  nuevaFechaNacimiento: string = '';
  editMode = false; // Add this line

  constructor(public alertCtrl: AlertController, public navCtrl: NavController) {
    this.nuevoNombre = ''; 
    this.correo='';
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
    // Aquí puedes obtener la información del usuario desde el servicio o localStorage
    this.usuario = {
      nombre: 'John Doe',
      correo:'john@gmail.com',
      password: 'qwe',
      fecha: '01/01/1990',  // Ajusta la fecha según tus necesidades
      
    };
  }

  async guardarCambios() {

    // Guarda los cambios en los campos editados
    if (this.nuevoNombre) {
      this.usuario.nombre = this.nuevoNombre;
    }

    if (this.nuevaContrasena) {
      this.usuario.password = this.nuevaContrasena;
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

    await alert.present();
  }
  
  //Variable utilizada para mostrar la alerta y su opción
  public alertButtons = ['OK'];

  //Función llamada desde el HTML, que permite cambiar el estado de ingresado
  //Para que el usuario deba loguearse nuevamente devolviendose también
  //al login
  salir(){
    //Cambia el estado "ingresado" de localstorage a "false"
    localStorage.setItem("ingresado","false");
    //redirige la aplicación a "login"
    this.navCtrl.navigateRoot("login");
  }

  eliminarCuenta() {
    // Puedes agregar lógica para confirmar la eliminación antes de proceder
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?');

    if (confirmacion) {
      // Elimina la cuenta (puedes agregar tu lógica de eliminación aquí)

      // Luego, redirige al usuario a la pantalla de login
      localStorage.setItem("ingresado", "false");
      this.navCtrl.navigateRoot("login");
    }
  }

}
