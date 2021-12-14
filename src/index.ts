import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { File } from './entity/File';
import { validate } from 'class-validator';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());

//Storing file meta data;
app.post('/file-infos', async (req: Request, res: Response) => {
  const { filename, filesize, lastmodified, filetype } = req.body;
  try {
    const fileInfo = File.create({
      filename,
      filesize,
      lastmodified,
      filetype,
    });
    const errors = await validate(fileInfo);
    if (errors.length > 0) {
      console.log(errors);
      return res.status(500).json(errors);
    }

    await fileInfo.save();
    return res.status(201).json({ message: 'File created successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Could not store file', err });
  }
});

//Fetching file meta data
app.get('/file-infos', async (_: Request, res: Response) => {
  try {
    const fileInfos = await File.find();

    return res.status(200).json(fileInfos);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Could not retrieve requested files', err });
  }
});

//Deleting file meta data
app.delete('/file-infos/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  try {
    const fileInfo = await File.findOneOrFail({ uuid });
    await fileInfo.remove();

    return res.status(204).json({ message: 'File deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Could not delete file', err });
  }
});

createConnection()
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(
        `server up at http://${process.env.DB_HOST}:${process.env.PORT}`,
      ),
    );
  })
  .catch((error) => console.log(error));
