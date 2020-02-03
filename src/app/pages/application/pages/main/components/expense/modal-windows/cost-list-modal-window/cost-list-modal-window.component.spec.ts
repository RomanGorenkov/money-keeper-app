import { async, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DialogService } from '../../../../../../../dialog/services/dialog/dialog.service';
import { PresetService } from '../../../../../../../../services/preset/preset.service';
import { CostService } from '../../../../../../../../services/cost/cost.service';
import { CostCategoryService } from '../../../../../../../../services/cost-category/cost-category.service';
import { DateService } from '../../../../../../../../services/date/date.service';
import { CostListModalWindowComponent } from './cost-list-modal-window.component';
import { InformationSpanComponent } from '../../../information-span/information-span.component';
import { DialogConfig } from '../../../../../../../dialog/config/dialog-config';
import { CostDto } from '../../../../interfaces/cost-dto.intarfece';

describe('CostListModalWindowComponent', () => {

  let fixture;
  let component;
  let componentAny: any;

  const mockConfig = {
    data: {
      name: 'test',
      title: 'test',
    },
  };

  const mockCostList: CostDto[] = [
    {
      costType: 'test',
      costDescription: 'test',
      costValue: 100,
      costDate: 1,
    },
  ];

  const mockDateService = {
    currentElement: {
      startDate: 0,
      endDate: 1,
    },
  };

  const mockCostService = {
    getCostListByCategory: (categoryName: string, startDate: number, endDate: number) => {
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      declarations: [
        CostListModalWindowComponent,
        InformationSpanComponent,
      ],
      providers: [
        {
          provide: DialogService,
          useValue: {},
        },
        {
          provide: DialogConfig,
          useValue: {},
        },
        {
          provide: PresetService,
          useValue: {},
        },
        {
          provide: CostService,
          useValue: mockCostService,
        },
        {
          provide: CostCategoryService,
          useValue: {},
        },
        {
          provide: DateService,
          useValue: mockDateService,
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostListModalWindowComponent);
    component = fixture.componentInstance;
    componentAny = component;
    component.config = mockConfig;
    fixture.detectChanges();

  });

  it('should test create CostListModalWindowComponent', () => {
    const setDateLimitSpy = spyOn(component, 'setDateLimit');
    const setUserCategoryCostListSpy = spyOn(component, 'setUserCategoryCostList');

    component.ngOnInit();

    expect(setDateLimitSpy).toHaveBeenCalled();
    expect(setUserCategoryCostListSpy).toHaveBeenCalled();
    expect(component.name).toBe(mockConfig.data.name);
  });

  it('should test setUserCategoryCostList function set costList', () => {
    const costService = fixture.debugElement.injector.get(CostService);
    const getCostListByCategorySpy = spyOn(costService, 'getCostListByCategory').and.returnValue(mockCostList);

    component.setUserCategoryCostList();

    expect(getCostListByCategorySpy).toHaveBeenCalled();
    expect(component.costList).toEqual(mockCostList);
  });

  it('should test setDateLimit function set start and end date', () => {
    const dateService = fixture.debugElement.injector.get(DateService);

    component.setDateLimit();

    expect(component.startDate).toBe(dateService.currentElement.startDate);
    expect(component.endDate).toBe(dateService.currentElement.endDate);
  });

  it('should test makeFirstLetterCapital function make first later capital', () => {
    const testWord = component.makeFirstLetterCapital('test');

    expect(testWord).toBe('Test');
  })
});
