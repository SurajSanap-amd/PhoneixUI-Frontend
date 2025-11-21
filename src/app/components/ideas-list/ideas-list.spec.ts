import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasList } from './ideas-list';

describe('IdeasList', () => {
  let component: IdeasList;
  let fixture: ComponentFixture<IdeasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeasList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
