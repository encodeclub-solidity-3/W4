import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { IMetadata } from '../../services/blockchain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  INITIAL_CONTENTS = [
    { key: '1', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '2', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '3', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '4', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '5', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '6', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '7', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '8', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '9', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
    { key: '10', puppyName: '', class: 'Loading...', tokenURI: '', type: 'Loading...', metadata: {}, ipfsPath: '' },
  ];
  pageContents: { key: string; puppyName: string; class: string, type: string, tokenURI: string, metadata: IMetadata | {}, ipfsPath: string }[] = [];

  constructor(
    private blockchainService: BlockchainService,
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.pageContents = this.INITIAL_CONTENTS;
    this.update();
  }

  private update() {
    this.INITIAL_CONTENTS.forEach((token) => {
      this.blockchainService.tokenURI(token.key).then((tokenURI) => {
        token.tokenURI = tokenURI;
        console.log(token.tokenURI)

        this.apiService.getMetadata(tokenURI).subscribe((res) => {
          const itemIndex = this.pageContents.findIndex(
            (obj) => obj.key === token.key
          );
          console.log(res)
          token.metadata = res as IMetadata;

          const fileId = (Number(token.key) - 1).toString()

          if (itemIndex >= 0) this.pageContents[itemIndex].puppyName = (res as IMetadata).metadata.name;
          if (itemIndex >= 0) this.pageContents[itemIndex].class = (res as IMetadata).metadata.class;
          if (itemIndex >= 0) this.pageContents[itemIndex].type = (res as IMetadata).metadata.type;
          if (itemIndex >= 0) this.pageContents[itemIndex].ipfsPath = fileId;
        });
      });
    })
  }

}
