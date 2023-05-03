import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListExperienceGalleryPage } from './list-experience-gallery.page';

describe('ListExperienceGalleryPage', () => {
  let component: ListExperienceGalleryPage;
  let fixture: ComponentFixture<ListExperienceGalleryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExperienceGalleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListExperienceGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
