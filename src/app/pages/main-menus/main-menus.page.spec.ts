import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainMenusPage } from './main-menus.page';

describe('MainMenusPage', () => {
  let component: MainMenusPage;
  let fixture: ComponentFixture<MainMenusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
