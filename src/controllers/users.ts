import { Request, Response } from 'express';

import User from '../models/users';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import ERROR_MESSAGE from '../constants/errorMessage';
import { IUserRequest } from '../types/userRequest';

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(HTTP_STATUS_CODE.ServerError)
    .send({ message: ERROR_MESSAGE.onServer }));

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => res.json({ data: user }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(HTTP_STATUS_CODE.NotFound)
          .send({ message: ERROR_MESSAGE.userNotExist });
      }

      return res
        .status(HTTP_STATUS_CODE.ServerError)
        .send({ message: ERROR_MESSAGE.onServer });
    });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res
      .status(HTTP_STATUS_CODE.ServerError)
      .send({ message: ERROR_MESSAGE.onServer }));
};

export const updateUser = (req: IUserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, about } = req.body;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => res.send({ data: updatedUser?.avatar }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(HTTP_STATUS_CODE.NotFound)
          .send({ message: ERROR_MESSAGE.userNotExist });
      }

      return res
        .status(HTTP_STATUS_CODE.ServerError)
        .send({ message: ERROR_MESSAGE.onServer });
    });
};

export const updateAvatar = (req: IUserRequest, res: Response) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(HTTP_STATUS_CODE.NotFound)
          .send({ message: ERROR_MESSAGE.userNotExist });
      }

      return res
        .status(HTTP_STATUS_CODE.ServerError)
        .send({ message: ERROR_MESSAGE.onServer });
    });
};
