import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { initializeApp, App } from '@sheetbase/client';
import { from } from 'rxjs';

import { SHEETBASE_CONFIG } from '../../../sheetbase.config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private sheetbaseApp: App;

  table: string;
  tables: string[] = [];
  items: any[];
  viewItem: string;

  constructor(
    private alertCtrl: AlertController,
  ) {
    this.sheetbaseApp = initializeApp(SHEETBASE_CONFIG);
  }

  all(sheetName: string) {
    return from(this.sheetbaseApp.database().all(sheetName));
  }

  loadItems() {
    this.all(this.table).subscribe(items => {
      this.items = items;
      // record previous loaded tables
      if (this.tables.indexOf(this.table) < 0) {
        this.tables.push(this.table);
      }
    }, async err => {
      console.error(err);
      const { code, message } = err.error;
      const alert = await this.alertCtrl.create({
        header: 'Data',
        message: `
          Errors getting data for table name "<strong>${this.table}</strong>".
          <ul>
            <li>Code: <strong>${code}</strong></li>
            <li>Message: <strong>${message}</strong></li>
          </ul>
        `,
        buttons: ['OK']
      });
      await alert.present();
    });
  }

  logItem(item: any) {
    this.viewItem = JSON.stringify(item, null, 3);
    console.log('Log for item: "' + item.title + '".');
    console.log(item);
  }

  test() {
    console.time();
    from(this.sheetbaseApp.database().items('posts')).subscribe(data => {
      console.log(data);
      console.timeEnd();
    });
  }

}
