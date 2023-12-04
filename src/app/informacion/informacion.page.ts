import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  usuario: any;
  correo:any;
  nuevoNombre: string = '';
  nuevaContrasena: string = '';
  nuevaFechaNacimiento: string = '';
  editMode = false; // Add this line

   constructor(public alertCtrl: AlertController) {
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
 }
