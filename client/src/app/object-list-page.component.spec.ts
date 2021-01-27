import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectListPageComponent } from './object-list-page.component';

describe('ObjectListPageComponent', () => {
  let component: ObjectListPageComponent;
  let fixture: ComponentFixture<ObjectListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
