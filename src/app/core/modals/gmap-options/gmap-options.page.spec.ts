import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GmapOptionsPage } from './gmap-options.page';

describe('GmapOptionsPage', () => {
  let component: GmapOptionsPage;
  let fixture: ComponentFixture<GmapOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GmapOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
