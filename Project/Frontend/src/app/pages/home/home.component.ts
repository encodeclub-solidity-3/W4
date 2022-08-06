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
    { key: '7843', prop: 'User wallet address', url: 'Loading...', metadata: {} },
    { key: '2', prop: 'Ether balance', url: 'Loading...', metadata: {} },
    { key: '3', prop: 'Network name', url: 'Loading...', metadata: {} },
    { key: '4', prop: 'Last block number', url: 'Loading...', metadata: {} },
    { key: '5', prop: 'Token address', url: 'Loading...', metadata: {} },
    { key: '6', prop: 'Token name', url: 'Loading...', metadata: {} },
    { key: '7', prop: 'Token symbol', url: 'Loading...', metadata: {} },
    { key: '8', prop: 'Total supply', url: 'Loading...', metadata: {} },
    { key: '9', prop: 'User balance', url: 'Loading...', metadata: {} },
    { key: '10', prop: 'User balance', url: 'Loading...', metadata: {} },
  ];
  pageContents: { key: string; prop: string; url: string, metadata: {} }[] = [];

  constructor(
    private blockchainService: BlockchainService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.pageContents = this.INITIAL_CONTENTS;
    this.updateValues()
  }

  private async updateValues() {
    this.INITIAL_CONTENTS.forEach(async (token) => {
      const metadata = await this.blockchainService.tokenMetadata(token.key);
      token = {...token, metadata};
    })
    console.log(this.INITIAL_CONTENTS[0])
  }

}
