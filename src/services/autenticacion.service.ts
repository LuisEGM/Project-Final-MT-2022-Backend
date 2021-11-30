import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {User} from '../models';
import {UserRepository} from '../repositories';

const encryptPassword = require('crypto-js');
const generatePassword = require('password-generator');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) { }

  /*
   * Add service methods here
   */
  generatePasswordFunction() {
    return generatePassword(6,false);
  }

  encryptPasswordFunction(password:string) {
    return encryptPassword.MD5(password).toString();
  }

  identificarUser(email:string, password:string) {
    try {
      const user = this.userRepository.findOne({where: {email: email, password: password}})
      if (user) {
        return user;
      }
      return false;
    }
    catch (e) {
      return false;
    }
  }

  generarTokenJWT(user: User) {
    const token = jwt.sign({
      data: user.idUser,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    }, Llaves.claveJWT);
    return token;
  }


  validarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
