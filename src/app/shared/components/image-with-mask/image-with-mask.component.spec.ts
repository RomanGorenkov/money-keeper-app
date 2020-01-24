import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithMaskComponent } from './image-with-mask.component';

describe('ImageWithMaskComponent', () => {
  let component: ImageWithMaskComponent;
  let fixture: ComponentFixture<ImageWithMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWithMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWithMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
