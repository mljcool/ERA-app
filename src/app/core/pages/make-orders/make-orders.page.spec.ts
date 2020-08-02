import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MakeOrdersPage } from './make-orders.page';

describe('MakeOrdersPage', () => {
  let component: MakeOrdersPage;
  let fixture: ComponentFixture<MakeOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MakeOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
