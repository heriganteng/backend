import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../../entity/User';

import * as jwt from 'jsonwebtoken';

import config from '../../config/config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    let { email, password } = req.body.data;

    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).send();
    }

    // //Check if encrypted password match
    console.log(user);
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const user_data = {
      uuid: user.id,
      from: 'express-postgres-db',
      role: user.role,
      data: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        about: user.about,
        address: user.address,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };

    const access_token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: config.expiresIn }
    );
    const response = {
      user: user_data,
      access_token: access_token
    };
    console.log(response);

    res.send(response);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send('Password harus diisi bos');
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user!: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send('Data berhasil diupdate');
  };
}
export default AuthController;
