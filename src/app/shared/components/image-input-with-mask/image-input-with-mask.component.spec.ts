import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputWithMaskComponent } from './image-input-with-mask.component';

describe('ImageInputWithMaskComponent', () => {
  let component: ImageInputWithMaskComponent;
  let fixture: ComponentFixture<ImageInputWithMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageInputWithMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputWithMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
