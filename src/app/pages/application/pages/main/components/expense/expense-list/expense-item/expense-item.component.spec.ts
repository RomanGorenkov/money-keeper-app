import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ExpenseItemComponent } from './expense-item.component';
import { BehaviorSubject } from 'rxjs';
import { ImageWithMaskComponent } from '../../../../../../../../shared/components/image-with-mask/image-with-mask.component';
import { PresetService } from '../../../../../../../../services/preset/preset.service';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { DateService } from '../../../../../../../../services/date/date.service';
import { UserCosts } from '../../../../../../../authorization/interfaces/user-costs.interface';

describe('ExpenseItemComponent', () => {

  let component: ExpenseItemComponent;
  let componentAny: any;
  let fixture: ComponentFixture<ExpenseItemComponent>;

  const mockCostList = {
    _id: 'Test',
    costSum: 300,
    costList: [
      {
        costType: 'Test',
        costDescription: 'test',
        costValue: 300,
        costDate: Date.now(),
      },
    ],
  };
  const mockCostService = {
    _currentCostList: new BehaviorSubject<UserCosts[]>([mockCostList]),
    get currentCostList() {
      return this._currentCostList;
    },
    set currentCostList(value) {
      this._currentCostList = value;
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader},
        }),
      ],
      declarations: [
        ExpenseItemComponent,
        ImageWithMaskComponent,
      ],
      providers: [
        {
          provide: PresetService,
          useValue: {},
        },
        {
          provide: CostService,
          useValue: mockCostService,
        },
        {
          provide: DialogService,
          useValue: {},
        },
        {
          provide: DateService,
          useValue: {},
        },
      ],
    },)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseItemComponent);
    component = fixture.componentInstance;
    component.expenseItemConfig = {
      title: 'Test',
      name: 'Test',
      color: '',
      imageUrl: '',
    };
    componentAny = component;
    fixture.detectChanges();
  });


  describe('ExpenseItemComponent should create with different costList', () => {
    let currentCostListSubscribeSpy;
    let setCurrentUserCostSpy;
    let costService;


    beforeEach(() => {
      component.expenseItemConfig = {
        title: 'Test',
        name: 'Test',
        color: '',
        imageUrl: '',
      };
      componentAny.currentCostValue = 0;
      costService = fixture.debugElement.injector.get(CostService);
      setCurrentUserCostSpy = spyOn(componentAny, 'setCurrentUserCost').and.callThrough()
    });
    it('should create with costList', () => {
      currentCostListSubscribeSpy = spyOn(costService.currentCostList, 'subscribe').and.callThrough();

      component.ngOnInit();

      expect(setCurrentUserCostSpy).toHaveBeenCalledWith([mockCostList]);
      expect(componentAny.currentCostValue).toBe(mockCostList.costSum);
    });

    it('should create without costList', () => {
      costService.currentCostList = new BehaviorSubject<UserCosts[]>([]);
      currentCostListSubscribeSpy = spyOn(costService.currentCostList, 'subscribe').and.callThrough();

      component.ngOnInit();

      expect(setCurrentUserCostSpy).toHaveBeenCalledWith([]);
      expect(componentAny.currentCostValue).toBe(0);
    });

    afterEach(() => {
      expect(currentCostListSubscribeSpy).toHaveBeenCalled();
      expect(setCurrentUserCostSpy).toHaveBeenCalled();
      expect(component).toBeTruthy();
    })
  });
});
