import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb:FormBuilder, public alertCtrl: AlertController, public navCtrl: NavController) {
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl("",Validators.email),
      'nombre': new FormControl("",Validators.required),
      'fecha':new FormControl("",Validators.required ),
      'password': new FormControl("",Validators.required),
      'confirmar': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }


  async register(email: string, password: string) {
    try {
      const result = await this.register(email,password);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  async guardar() {
    var formulario = this.formularioRegistro.value;
    var birddate : String = formulario.fecha;
    var yearString : String = birddate.split("-")[0];
    var year : Number = +yearString;
    let dateRightNow : Date = new Date();
    var presentYear = dateRightNow.getFullYear()
    
    var edad: number = presentYear - +year;

    if (edad < 18) {
      const alerta = await this.alertCtrl.create({
        header: "Menor de Edad",
        message: "Debes ser mayor de 18 años para registrarte.",
        buttons: ['Aceptar']
      });
      await alerta.present();
      return;
    }

    if (this.formularioRegistro.invalid){
      const alerta = await this.alertCtrl.create({
        header: "Datos incompletos",
        message: "Tienes que llenar todos los datos",
        buttons: ['Aceptar']
      });

     // await this.alerta.present();
      return;
    }

    console.log(formulario.fecha)

    const path='usuario';

    var usuario = {
      nombre:formulario.nombre,
      password:formulario.password
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.navCtrl.navigateRoot("login");
  }



}
