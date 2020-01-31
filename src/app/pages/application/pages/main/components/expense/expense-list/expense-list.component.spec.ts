import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ExpenseItemConfig } from '../../../interfaces/expense-item-config.interface';
import { ExpenseListComponent } from './expense-list.component';
import { CostCategoryService } from '../../../../../../../services/cost-category/cost-category.service';
import { CostService } from '../../../../../../../services/cost/cost.service';
import { AddExpenseItemComponent } from './add-expense-item/add-expense-item.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ImageWithMaskComponent } from '../../../../../../../shared/components/image-with-mask/image-with-mask.component';
import { DialogService } from '../../../../../../dialog/services/dialog/dialog.service';
import { expenseItems } from '../../../constants/expense-items-config';
import { PresetService } from '../../../../../../../services/preset/preset.service';
import { DateService } from '../../../../../../../services/date/date.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expense-item',
  template: '<div></div>',
})
class ExpenseItemComponent {

  @Input() expenseItemConfig: ExpenseItemConfig;
  @Input() iconId: string;
}

describe('ExpenseListComponent', () => {

  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

  const mockCostCategoryService = {
    setCostCategoryListByNameList: (categoryNameList: string[]) => {},
    get costCategoryList() {
      return new BehaviorSubject(expenseItems);
    },
  };
  const mockCostService = {
    getAllCostsNames: () => {},
  };
  const translations: any = {
    test: 'This is a test',
  };

  class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      return of(translations);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [
        ExpenseListComponent,
        ExpenseItemComponent,
        AddExpenseItemComponent,
        ImageWithMaskComponent,
      ],
      providers: [
        {
          provide: CostCategoryService,
          useValue: mockCostCategoryService,
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
          provide: PresetService,
          useValue: {},
        },
        {
          provide: DateService,
          useValue: {},
        }
      ],
    },)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', done => {
    const sub = new Subject<ExpenseItemConfig[]>();
    const costCategoryService = fixture.debugElement.injector.get(CostCategoryService);
    const costService = fixture.debugElement.injector.get(CostService);
    const setCostCategoryListByNameListSpy = spyOn(costCategoryService, 'setCostCategoryListByNameList');
    const costCategoryListSubscribeSpy = spyOn(costCategoryService.costCategoryList, 'subscribe');
    const getAllCostsNamesSpy = spyOn(costService, 'getAllCostsNames').and.returnValue(['test']);

    component.ngOnInit();

    sub.subscribe(() => {
      expect(getAllCostsNamesSpy).toHaveBeenCalled();
      expect(setCostCategoryListByNameListSpy).toHaveBeenCalled();
      expect(setCostCategoryListByNameListSpy).toHaveBeenCalledWith(['test']);
      expect(component).toBeTruthy();
      expect(costCategoryListSubscribeSpy).toHaveBeenCalled();
      expect(component.categoryList).toEqual(expenseItems);
      done();
    });
    sub.next(expenseItems);
  });

});
