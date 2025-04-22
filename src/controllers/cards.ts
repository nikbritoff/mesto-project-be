import { Request, Response } from 'express';

import Card from '../models/cards';
import HTTP_STATUS_CODE from '../constants/httpStatusCode';
import ERROR_MESSAGE from '../constants/errorMessage';
import { IUserRequest } from '../types/userRequest';

export const getCards = (req: Request, res: Response) => Card.find({})
  .catch(() => res.status(HTTP_STATUS_CODE.ServerError)
    .send({ message: ERROR_MESSAGE.onServer }));

export const deleteCardById = (req: Request, res: Response) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .then(() => res.send({ message: 'Публикация удалена' }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(HTTP_STATUS_CODE.NotFound)
          .send({ message: ERROR_MESSAGE.cardNotExist });
      }

      return res
        .status(HTTP_STATUS_CODE.ServerError)
        .send({ message: ERROR_MESSAGE.onServer });
    });
};

export const createCard = (req: IUserRequest, res: Response) => {
  const userId = req.user?._id;
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: userId,
  }).then((card) => res.send({ data: card }))
    .catch(() => res
      .status(HTTP_STATUS_CODE.ServerError)
      .send({ message: ERROR_MESSAGE.onServer }));
};

export const addLike = (req: IUserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true })
    .then((updatedCard) => res.send({ data: updatedCard }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(HTTP_STATUS_CODE.NotFound)
          .send({ message: ERROR_MESSAGE.cardNotExist });
      }

      return res
        .status(HTTP_STATUS_CODE.ServerError)
        .send({ message: ERROR_MESSAGE.onServer });
    });
};

export const removeLike = (req: IUserRequest, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $pull: { likes: userId as unknown as Object } }, { new: true })
    .then((updatedCard) => res.send({ data: updatedCard }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(HTTP_STATUS_CODE.NotFound)
          .send({ message: ERROR_MESSAGE.cardNotExist });
      }

      return res
        .status(HTTP_STATUS_CODE.ServerError)
        .send({ message: ERROR_MESSAGE.onServer });
    });
};
