import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { assistTanceList } from 'src/app/constants/assistanceTypes';


@Component({
  selector: 'app-assistance-summaries',
  templateUrl: './assistance-summaries.page.html',
  styleUrls: ['./assistance-summaries.page.scss'],
})
export class AssistanceSummariesPage implements OnInit {

  serviceDetails = {};
  shopDetail = {};
  constructor(private navParams: NavParams) {
    const { shopDetail, serviceTypeParam } = this.navParams.get('assistanceDetails')
    this.serviceDetails = assistTanceList.find(detail => detail.id === parseInt(serviceTypeParam, 10));
    this.shopDetail = shopDetail;
    console.log('serviceDetails', this.serviceDetails);
    console.log('shopDetail', shopDetail);
  }

  ngOnInit() {
  }

}
