import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListExperiencePromotionPage } from './list-experience-promotion.page';

describe('ListExperiencePromotionPage', () => {
  let component: ListExperiencePromotionPage;
  let fixture: ComponentFixture<ListExperiencePromotionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExperiencePromotionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListExperiencePromotionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
