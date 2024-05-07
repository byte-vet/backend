import express, { Request, Response, NextFunction } from 'express';
import USER_TYPE from '../enums/userType';

interface UserDTO {
  fullName: string;
  email: string;
  password: string;
  clinicName?: string; // Propriedade opcional para cliente
  clinicLoc?: string; // Propriedade opcional para veterinário
}

async function checkUserType(req: Request, res: Response, next: NextFunction) {

  const body = req.body;

  if (!body.fullName || !body.email || !body.password) {
    return res.status(400).json({ error: 'Dados obrigatórios faltantes!' });
  }

  let user;

  if (!!body.clinicName && !!body.clinicLoc) {
    user = {
      fullName: body.fullName,
      email: body.email,
      password: body.password,
      userType: USER_TYPE.VETERINARIO,
      clinicName: body.clinicName,
      clinicLoc: body.clinicLoc
    }
  } else {
    user = {
      fullName: body.fullName,
      email: body.email,
      password: body.password,
      userType: USER_TYPE.CLIENTE
    }
  }

  req.body = user;

  next();

}

export { checkUserType }