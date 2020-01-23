import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WipComponent } from './wip.component';

describe('WipComponent', () => {
  let component: WipComponent;
  let fixture: ComponentFixture<WipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
