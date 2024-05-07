import { Request, Response, NextFunction } from "express";
import VetService from "../services/vet.service";
import ClientService from "../services/client.service";
import USER_TYPE from "../enums/userType";
import userJOI from "../validation/user.joi";
import AuthService from "../services/auth.service";

class UserController {

  async create(req: Request, res: Response, next: NextFunction) {

    const { error: errorJoi, value } = userJOI.validate(req.body, { allowUnknown: true, abortEarly: false });

    if (errorJoi) {
      console.log(errorJoi)
      throw new Error('Bad Request Error')
    };

    let result;
    const user = req.body;

    if (user.userType === USER_TYPE.CLIENTE) {

      const clientService = new ClientService();

      const user = req.body;

      result = await clientService.save(user);

    } else if (user.userType === USER_TYPE.VETERINARIO) {

      const vetService = new VetService();

      const user = req.body;

      result = await vetService.save(user);
    }

    return res.status(201).json(result);
  }

  async login(req: Request, res: Response, next: NextFunction) {

    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: 'Dados obrigatórios faltantes.' });
    }

    const authService = new AuthService();

    if (userType == USER_TYPE.CLIENTE) {
      const response = await authService.login(email, password, userType)
      return res.status(200).json(response)
    }

  }

}

export default UserController;