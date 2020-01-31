import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationFormComponent } from './authorization-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { SharedModule } from '../../../../shared/shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { formConfigs } from '../../constants/form-configs';
import { InputTypes } from '../../../../global-constants/input-types';

describe('AuthorizationFormComponent', () => {

  let component: AuthorizationFormComponent;
  let componentAny: any;
  let fixture: ComponentFixture<AuthorizationFormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  const mockActivatedRoute = {
    get params() {
      return new BehaviorSubject({type: 'login'});
    },
  };
  const mockAuthenticationService = {
    login: (FormData: FormGroup) => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader},
        }),
      ],
      declarations: [
        AuthorizationFormComponent,
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: mockAuthenticationService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ],
    },)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationFormComponent);
    component = fixture.componentInstance;
    componentAny = component;
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    component.authorizationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create', done => {
    const sub = new Subject<any>();
    const createFormSpy = spyOn(componentAny, 'createForm');

    component.ngOnInit();
    sub.subscribe(() => {
      expect(component.formTitle).toBe('login');
      expect(component.inputs).toBe(formConfigs.login.formInputs);
      expect(createFormSpy).toHaveBeenCalled();
      expect(createFormSpy).toHaveBeenCalledWith('login');
      expect(component).toBeTruthy();
      done();
    });
    sub.next({type: 'login'});
  });

  it(`should test submitHandler function`, () => {
    const auth = fixture.debugElement.injector.get(AuthenticationService);
    const loginSpy = spyOn(auth, 'login');

    component.formTitle = 'login';
    component.submitHandler(component.authorizationForm);
    expect(loginSpy).toHaveBeenCalled();
    expect(loginSpy).toHaveBeenCalledWith(component.authorizationForm);
  });

  it(`should test getControl function`, () => {
    const controlName = 'firstName';
    const getControlNameSpy = spyOn(component.authorizationForm, 'get');

    component.getControl(controlName);
    expect(getControlNameSpy).toHaveBeenCalled();
    expect(getControlNameSpy).toHaveBeenCalledWith(controlName);
  });

  it(`should have formTitle from RouterParam`, () => {
    expect(component.inputTypes).toEqual(InputTypes);
  });

});
