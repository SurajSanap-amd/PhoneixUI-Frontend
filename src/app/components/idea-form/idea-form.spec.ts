import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaForm } from './idea-form';

describe('IdeaForm', () => {
  let component: IdeaForm;
  let fixture: ComponentFixture<IdeaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
