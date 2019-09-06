import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabasePage } from './database.page';

describe('DatabasePage', () => {
  let component: DatabasePage;
  let fixture: ComponentFixture<DatabasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
