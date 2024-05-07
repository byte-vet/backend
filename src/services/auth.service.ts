import dotenv from 'dotenv';
dotenv.config();
import { ClientModel } from '../schemas/user.schema';
import { ClientDTO } from '../validation/user.dto';
import { VetModel } from "../schemas/user.schema";
import { VetDTO } from "../validation/user.dto";
import { Token } from "../schemas/token.schema";
import USER_TYPE from "../enums/userType";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthService {

  async login(email: string, password: string, userType: string) {

    if (userType === USER_TYPE.CLIENTE) {

      const client = await ClientModel.findOne({ email });

      if (client && bcrypt.compareSync(password, client.password || '')) {

        const payload = {
          userId: client._id,
          userType: USER_TYPE.CLIENTE
        }

        const newToken = await Token.create({
          userId: client._id,
          token: jwt.sign(payload, process.env.JWT_SECRET as string),
          userType: USER_TYPE.CLIENTE
        });

        const data = {
          message: 'Usuário logado com sucesso',
          data: newToken
        }
        return data;
      } else {
        throw new Error('Credenciais incorretas.')
      }

    }
  }
}

export default AuthService;