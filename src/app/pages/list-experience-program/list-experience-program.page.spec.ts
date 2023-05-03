import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListExperienceProgramPage } from './list-experience-program.page';

describe('ListExperienceProgramPage', () => {
  let component: ListExperienceProgramPage;
  let fixture: ComponentFixture<ListExperienceProgramPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExperienceProgramPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListExperienceProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
