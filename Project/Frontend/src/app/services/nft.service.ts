import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { FileDataDto } from '../dtos/file-data.dto';
import { MetadataDto } from '../dtos/metadata.dto';
import { FileData } from '../schemas/file-data.interface';
import { create } from 'ipfs-http-client';
import { createReadStream } from 'fs';
import { IPFSHTTPClient } from 'ipfs-http-client/types/src/types';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';

const DB_PATH = '../db/db.json';

@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number = 0;
  ipfsClient: IPFSHTTPClient;

  constructor() {
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));
    this.ipfsClient = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http',
    });
    const data = this.db.getData('/');
    this.lastId =
      data && Object.keys(data).length > 0
        ? Math.max(...Object.keys(data).map((key) => Number(key)))
        : -1;
  }

  getAll() {
    return this.db.getData('/');
  }

  isIpfsNodeOnline() {
    try {
      const state = this.ipfsClient.isOnline();
      return state;
    } catch (error) {
      return error;
    }
  }

  get(fileId: string) {
    return this.db.getData(`/${fileId}`);
  }

  pushFile(file: FileDataDto) {
    const obj = new FileData(file);
    const fileId = ++this.lastId;
    this.db.push(`/${fileId}`, obj);
    return fileId;
  }

  setMetadata(fileId: string, metadata: MetadataDto) {
    let file: any;
    try {
      file = this.db.getData(`/${fileId}/file`);
    } catch (error) {
      return { error };
    }
    if (!file) return false;
    this.db.push(`/${fileId}/metadata`, metadata);
    return this.get(fileId);
  }

  // async saveToIpfs(fileId: string) {
  //   const fileData: FileData = this.get(fileId);
  //   const fileLocation = `../upload/${fileData.file.storageName}`;
  //   const fileBytes = fs.readFileSync(fileLocation);
  //   const ipfsData = await this.ipfsClient.add(fileBytes);
  //   this.db.push(`/${fileId}/ipfs`, ipfsData);
  //   return this.get(fileId);
  // }
}