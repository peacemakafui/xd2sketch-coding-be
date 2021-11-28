import "reflect-metadata";
import { createConnection } from "typeorm";
import { File } from "./entity/File";
// import { validate } from "class-validator";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
//Create file meta data;
app.post("/file-infos", async (req: Request, res: Response) => {
  const { filename, filesize, lastmodified, filetype } = req.body;
  try {
    const fileInfo = File.create({
      filename,
      filesize,
      lastmodified,
      filetype,
    });

    await fileInfo.save();
    return res.status(201).json(fileInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//getting all the data back
app.get("/file-infos", async (_: Request, res: Response) => {
  try {
    const fileInfos = await File.find();

    return res.status(200).json(fileInfos);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//deleting fileINfo
app.delete("/file-infos/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  try {
    const fileInfo = await File.findOneOrFail({ uuid });
    await fileInfo.remove();

    return res.status(204).json({ message: "file deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
createConnection()
  .then(async () => {
    app.listen(5000, () => console.log("server up at http://localhost:5000"));
  })
  .catch((error) => console.log(error));
