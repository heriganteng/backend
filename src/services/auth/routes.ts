import { Request, Response } from 'express';
import AuthController from './AuthController';
import { checkJwt } from '../../middleware/checks';

export default [
  {
    path: '/api/v1/auth/login',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        await AuthController.login(req, res);
      }
    ]
  },
  {
    path: '/api/v1/auth/change-password',
    method: 'post',
    handler: [
      checkJwt,
      async (req: Request, res: Response) => {
        await AuthController.changePassword(req, res);
      }
    ]
  },
  {
    path: '/api/v1/auth/access-token',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        await AuthController.loginWithToken(req, res);
      }
    ]
  },
  {
    path: '/api/v1/auth/register',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        await AuthController.register(req, res);
      }
    ]
  }
];
