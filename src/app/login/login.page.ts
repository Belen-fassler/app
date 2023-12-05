import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController} from '@ionic/angular';
import { AutheticationService } from '../authetication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  //Inicio del formulario
  formularioLogin: FormGroup;

  //Constructor con distintas llamadas a elementos que permiten el uso de formularios
  //Y controles de navegación
  constructor(public fb : FormBuilder, public navCtrl : NavController, public alertCtrl : AlertController,private auth:AutheticationService) { 
    //Asignación de elementos al formulario incluyendo validadores
    this.formularioLogin = this.fb.group({
      'email': new FormControl("",[Validators.required,Validators.email]),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  //Método que permite ingresar al home, validando al usuario
  async ingresar(){
    //Variable que utiliza los valores en el formulario
    var formulario = this.formularioLogin.value;

    if(this.formularioLogin.valid){
      await this.auth.logingUser(formulario.email,formulario.password).then(response =>{
        console.log(response)
        localStorage.setItem("userData",JSON.stringify(response));
        localStorage.setItem("ingresado","true");
        this.navCtrl.navigateRoot("home");
      }).catch(error => console.log(error))
    }

  }
}
