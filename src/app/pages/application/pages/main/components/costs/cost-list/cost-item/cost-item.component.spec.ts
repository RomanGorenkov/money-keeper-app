import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { UserCosts } from '../../../../../../../authorization/interfaces/user-costs.interface';
import { CostItemComponent } from './cost-item.component';
import { ImageWithMaskComponent } from '../../../../../../../../shared/components/image-with-mask/image-with-mask.component';
import { PresetService } from '../../../../../../../../services/preset/preset.service';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { DateService } from '../../../../../../../../services/date/date.service';
import { dateSwitcherConfig } from '../../../../constants/date-switcher/date-switcher-config';
import { switcherNames } from '../../../../constants/date-switcher/switcher-name';
import { Type } from '@angular/core';
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config';
import { AddCostModalWindowComponent } from '../../modal-windows/add-cost-modal-window/add-cost-modal-window.component';
import { expenseItems } from '../../../../constants/expense-items-config';
import { DateSwitcherConfig } from '../../../../interfaces/date-switcher-config.interface';
import { CostListModalWindowComponent } from '../../modal-windows/cost-list-modal-window/cost-list-modal-window.component';

describe('ExpenseItemComponent', () => {

  let component: CostItemComponent;
  let componentAny: any;
  let fixture: ComponentFixture<CostItemComponent>;

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

  const mockDateService = {
    currentElement: {},
  };

  const mockDialogService = {
    open: <C, D>(componentType: Type<C>, dialogConfig: DialogConfig<D>, overlayColor?: string) => {
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
        CostItemComponent,
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
          useValue: mockDialogService,
        },
        {
          provide: DateService,
          useValue: mockDateService,
        },
      ],
    },)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostItemComponent);
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

  describe('CostItemComponent should create with different costList', () => {

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
      setCurrentUserCostSpy = spyOn(componentAny, 'setCurrentUserCost').and.callThrough();
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
    });

  });

  describe('test openModal function should open different modal window by switcher type', () => {

    let dateService;
    let dialogService;
    let dialogOpenSpy;
    let button;
    let addCostModalConfig;
    let costListModalConfig;

    beforeEach(() => {
      component.expenseItemConfig = expenseItems[0];
      dateService = TestBed.get(DateService);
      dialogService = fixture.debugElement.injector.get(DialogService);
      button = fixture.debugElement.nativeElement.querySelector('button');
      dialogOpenSpy = spyOn(dialogService, 'open');
      addCostModalConfig = {
        data: {
          title: component.expenseItemConfig.title,
          name: component.expenseItemConfig.name,
          color: component.expenseItemConfig.color,
        },
      };
      costListModalConfig = {
        data: {
          title: component.expenseItemConfig.title,
          name: component.expenseItemConfig.name,
        },
      };
    });

    it('test openModal function should open AddCostModalWindowComponent by today\'s switcher', () => {
      dateService.currentElement = dateSwitcherConfig.timeInterval[dateSwitcherConfig.indexOfTodaySwitcher];
      button.click();

      expect(dialogOpenSpy).toHaveBeenCalledWith(AddCostModalWindowComponent, addCostModalConfig);
      expect(dialogOpenSpy).not.toHaveBeenCalledWith(CostListModalWindowComponent, costListModalConfig);
    });

    it('test openModal function should open AddCostModalWindowComponent by today\'s switcher', () => {
      dateService.currentElement = dateSwitcherConfig.timeInterval[dateSwitcherConfig.indexOfCustomSwitcher];
      button.click();

      expect(dialogOpenSpy).toHaveBeenCalledWith(CostListModalWindowComponent, costListModalConfig);
      expect(dialogOpenSpy).not.toHaveBeenCalledWith(AddCostModalWindowComponent, addCostModalConfig);
    });

  });

});
