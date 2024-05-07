import dotenv from 'dotenv';
dotenv.config();
import { VetModel } from "../schemas/user.schema";
import { VetDTO } from "../validation/user.dto";
import { Token } from "../schemas/token.schema";
import USER_TYPE from "../enums/userType";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class VetService {

  async save(vet: VetDTO) {

    const hashedPassword = await bcrypt.hash(vet.password, 10);

    vet.password = hashedPassword;

    const createdVet = await VetModel.create(vet);

    const payload = {
      userId: createdVet._id,
      userType: USER_TYPE.VETERINARIO
    }

    const newToken = await Token.create({
      userId: createdVet._id,
      token: jwt.sign(payload, process.env.JWT_SECRET as string),
      userType: USER_TYPE.VETERINARIO
    })

    const data = {
      message: 'Veterinário criado com sucesso!',
      data: newToken
    }

    return data;
  }

}

export default VetService;