import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import cardsRouter from './routes/cards';
import usersRouter from './routes/users';
import { IUserRequest } from './types/userRequest';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: IUserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '68078fd9645298bc4105797b',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
