import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationFormComponent } from './authorization-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { formConfigs } from '../../constants/form-configs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { SharedModule } from '../../../../shared/shared.module';
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
    login: (FormData: FormGroup) => {
    },
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
          useValue: mockActivatedRoute,
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
      email: new FormControl(''),
      password: new FormControl(''),
    });
    fixture.detectChanges();
  });

  it('should create AuthorizationFormComponent with mock login data', () => {
    const createFormSpy = spyOn(componentAny, 'createForm');

    component.ngOnInit();

    expect(component.formTitle).toBe('login');
    expect(component.inputs).toBe(formConfigs.login.formInputs);
    expect(createFormSpy).toHaveBeenCalledWith('login');
    expect(component).toBeTruthy();
  });

  it(`should test submitHandler function use submit logic by mock rout params`, () => {
    const auth = fixture.debugElement.injector.get(AuthenticationService);
    const loginSpy = spyOn(auth, 'login');

    component.formTitle = 'login';
    component.submitHandler(component.authorizationForm);

    expect(loginSpy).toHaveBeenCalledWith(component.authorizationForm);
  });

  it(`should test getControl function`, () => {
    const controlName = 'email';
    const getControlNameSpy = spyOn(component.authorizationForm, 'get');

    component.getControl(controlName);

    expect(getControlNameSpy).toHaveBeenCalledWith(controlName);
  });

  it(`should have formTitle from RouterParam`, () => {
    expect(component.inputTypes).toEqual(InputTypes);
  });

});
