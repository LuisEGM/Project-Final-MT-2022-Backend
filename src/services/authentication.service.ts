import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
const generate_password = require("password-generator");
const encryptar_password = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
  @repository(UserRepository)
  public user_repository:UserRepository
  ) {}

  /*
   * Add service methods here
   */
GenerarPasswordFunction(){
  let password= generate_password(6,false);
  return password;
}

EncryptPasswordFunction(password:string){
  let password_encrypt = encryptar_password.MD5(password).toString();
  return password_encrypt;
}

}
