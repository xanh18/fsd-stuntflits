import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisountComponent } from './create-disount.component';

describe('EditDisountComponent', () => {
  let component: CreateDisountComponent;
  let fixture: ComponentFixture<CreateDisountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDisountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDisountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
