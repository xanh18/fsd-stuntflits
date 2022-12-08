import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisountComponent } from './edit-disount.component';

describe('EditDisountComponent', () => {
  let component: EditDisountComponent;
  let fixture: ComponentFixture<EditDisountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDisountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDisountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
