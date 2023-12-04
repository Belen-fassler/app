import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngfireAuth: AngularFireAuth) { }

  async registerUser(nombre: string ,password:string){
      
    }
 
  async logingUser(nombre: string ,password:string){
     
  }
  
  async cambiarPass(correo:string){
    
  }

  async singOut(){
    return await this.ngfireAuth.signOut()
  }

  async getPerfil(){
    
  }

 
  
}
