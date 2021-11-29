import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js")
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerarPassword(){
    let password = generador(8, false);
    return password;

  }

  CiflarPassword(password:string){
    let passwordCifrada = cryptoJS.MD5(password).toString();
    return passwordCifrada;

  }
}
