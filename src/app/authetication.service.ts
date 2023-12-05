import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngfireAuth: AngularFireAuth, private navCtrl: NavController) { 

    this.ngfireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  
  }

  getAuthState() {
    return this.ngfireAuth.authState;
  }

  async registerUser(email: string ,password:string){
    
    return await this.ngfireAuth.createUserWithEmailAndPassword(email,password)
  }
 
  async logingUser(email: string ,password:string){
    return await this.ngfireAuth.signInWithEmailAndPassword(email,password)
  }
  
  async changeUser(nombre: string, date: string, email:string, password: string){
    return await this.ngfireAuth.onAuthStateChanged(user=>{
      user?.updateProfile({
        displayName: nombre,
        photoURL: date
      })
      user?.updateEmail(email)
      if(password.length >= 6){
        user?.updatePassword(password)
      }
    })
  }

  async singOut(){
    return await this.ngfireAuth.signOut()
  }

  async deleteUser(){
    return this.ngfireAuth.currentUser.then(user => {
      if (user) {
        return user.delete();
      }
      throw new Error('No user logged in');
    });
  }

  async getPerfil(){
    this.ngfireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem("userData", JSON.stringify(user));
        this.navCtrl.navigateRoot("home");
        // Usuario está logueado
      } else {
        // Usuario no está logueado o la sesión no se ha inicializado aún
        localStorage.removeItem("userData");
        this.navCtrl.navigateRoot("login");
      }
    });
    return await this.ngfireAuth.currentUser
  }

 
  
}
