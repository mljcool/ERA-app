import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssistanceService } from 'src/app/modals/assistance/assistance.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAssistance } from 'src/app/models/assistance.model';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.page.html',
    styleUrls: ['./preview.page.scss']
})
export class PreviewPage implements OnInit, OnDestroy {
    private unsubscribeAll: Subject<any>;
    assistanceData: IAssistance = {
        status: 'PENDING',
        id: '',
        mylocation: {
            longitude: null,
            latitude: null,
        },
        escalatedTime: '',
        shopId: '',
        myId: '',
        note: '',
        flatRate: '',
        assistanceType: {
            id: 0,
            imgSrc: '',
            label: ''
        }
    };
    mapSetup = {
        latitude: 7.0540778,
        longitude: 125.5731837,
        message: `I'm Here`,
        iconUrl: {
            url: `assets/images/commons/blue-moving-car.gif`,
            scaledSize: { height: 80, width: 110 }
        }
    };

    constructor(private assistanceService: AssistanceService) {
        this.unsubscribeAll = new Subject();
        this.assistanceService.onRoadSideAssistanceData
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(response => {
                this.assistanceService
                    .getAllMyPendingAssistance('e0bf2736')
                    .subscribe(responseAssistance => {
                        this.assistanceData = responseAssistance[0];
                        console.log(this.assistanceData);
                    });
            });
    }

    ngOnInit(): void {}

    clickedMarker(m: any): void {}

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
    getCurrentPosition(): void {}
}
