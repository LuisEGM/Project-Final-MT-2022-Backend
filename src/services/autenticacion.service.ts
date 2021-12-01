import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {User} from '../models';
import {RolRepository, UserRepository} from '../repositories';

const encryptPassword = require('crypto-js');
const generatePassword = require('password-generator');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(RolRepository)
    public rolRepository: RolRepository
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

  async generarTokenJWT(user: User) {
    try {
      const rol = await this.rolRepository.findOne({where: { idRol: user.idRol }});
      if (rol) {
        const token = jwt.sign({
          data: user.idUser,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          rol: rol.rolName
        }, Llaves.claveJWT);
        return [token, rol.rolName];
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
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
