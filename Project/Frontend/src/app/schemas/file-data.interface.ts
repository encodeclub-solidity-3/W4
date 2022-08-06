import { FileDataDto } from 'src/app/dtos/file-data.dto';
import { IpfsDataDto } from 'src/app/dtos/ipfs-data.dto';
import { MetadataDto } from 'src/app/dtos/metadata.dto';

export class FileData {
  constructor(
    public file?: FileDataDto,
    public metadata?: MetadataDto,
    public ipfs?: IpfsDataDto,
  ) {}
}