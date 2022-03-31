const database = require("../models");
const s3Client = require("../service/s3Client");
const formidable = require("formidable");
const fs = require("fs");

class FileController {
  static async createFile(req, res) {
    const form = new formidable.IncomingForm();
    try {
      form.parse(req, async (err, fields, files) => {
        const url = await s3Client.uploadFile(
          files.filetoupload.newFilename,
          files.filetoupload.filepath,
          files.filetoupload.mimetype
        );
        const file = {
          url: url,
          originalFilename: files.filetoupload.originalFilename,
          newFilename: files.filetoupload.newFilename,
          bucket: process.env.AWS_S3_BUCKET,
          region: process.env.AWS_REGION,
        };
        const fileCreated = await database.file.create(file);
        return res.status(202).json(fileCreated);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
    }
  }
}

module.exports = FileController;
