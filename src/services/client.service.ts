import dotenv from 'dotenv';
dotenv.config();
import { ClientModel } from '../schemas/user.schema';
import { ClientDTO } from '../validation/user.dto';
import { Token } from "../schemas/token.schema";
import USER_TYPE from "../enums/userType";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class ClientService {

  async save(client: ClientDTO) {

    const hashedPassword = await bcrypt.hash(client.password, 10);

    client.password = hashedPassword;

    const createdClient = await ClientModel.create(client);

    const payload = {
      userId: createdClient._id,
      userType: USER_TYPE.CLIENTE
    }

    const newToken = await Token.create({
      userId: createdClient._id,
      token: jwt.sign(payload, process.env.JWT_SECRET as string),
      userType: USER_TYPE.CLIENTE
    })

    const data = {
      message: 'Perfil criado com sucesso!',
      data: newToken
    }

    return data;
  }

}

export default ClientService;