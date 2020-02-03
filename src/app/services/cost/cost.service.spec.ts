import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

import { CostService } from './cost.service';
import { CostDto } from '../../pages/application/pages/main/interfaces/cost-dto.intarfece';
import { CostApiService } from '../cost-api/cost-api.service';
import { StorageService } from '../storage/storage.service';
import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface';

describe('CostService', () => {

  let costService;

  const mockCost: CostDto = {
    costType: 'test',
    costValue: 500,
    costDate: 5,
    costDescription: 'test',
  };
  const mockUserCosts: UserCosts[] = [
    {
      _id: 'test',
      costSum: 1200,
      costList: [
        {
          costType: 'test',
          costDescription: 'test',
          costValue: 100,
          costDate: 3,
        },
        {
          costType: 'test',
          costDescription: 'test',
          costValue: 400,
          costDate: 1,
        },
        {
          costType: 'test',
          costDescription: 'test',
          costValue: 700,
          costDate: 2,
        },
      ],
    },
  ];
  const mockCostList: CostDto[] = mockUserCosts[0].costList;
  const mockCostApiService = {
    userCosts: mockUserCosts,
    get getTodayAllUserCosts() {
      return this.userCosts;
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        CostService,
        {
          provide: CostApiService,
          useValue: mockCostApiService,
        },
        {
          provide: StorageService,
          useValue: {},
        },
      ],
    });
  }));

  beforeEach(() => {
    costService = TestBed.get(CostService);
  });

  it('should test sortCostListByDate function return correct array', () => {
    const sortCostList = CostService.sortCostListByDate([...mockCostList]);

    expect(sortCostList).toEqual([mockCostList[0], mockCostList[2], mockCostList[1]]);
  });

  it('should test setCostList function set new costList value', () => {
    costService.currentCostList = new BehaviorSubject<UserCosts[]>([]);
    costService.setCostList(mockUserCosts);

    expect(costService.currentCostList.getValue()).toBe(mockUserCosts);
  });

  it('should test addCostWithCategoryInCostList function add new costCategory in list', () => {
    costService.currentCostList = new BehaviorSubject<UserCosts[]>(mockUserCosts);
    costService.addCostWithCategoryInCostList(mockCost);
    const newCostCategory = costService.currentCostList.getValue().pop();

    expect(newCostCategory._id).toBe(mockCost.costType);
    expect(newCostCategory.costSum).toBe(mockCost.costValue);
    expect(newCostCategory.costList).toEqual([mockCost]);
  });

  describe('test isCategoryInCostList function with different parameters', () => {

    beforeEach(() => {
      costService.currentCostList = new BehaviorSubject<UserCosts[]>(mockUserCosts);
    });

    it('should test isCategoryInCostList function with existing name', () => {
      const returnValue = costService.isCategoryInCostList('test');

      expect(returnValue).toBeTrue();
    });

    it('should test isCategoryInCostList function with nonexistent name', () => {
      const returnValue = costService.isCategoryInCostList('anotherName');

      expect(returnValue).toBeFalse();
    });

  });

  it('should test filterCostListByDateInterval function return costs of correct date interval', () => {
    const costs = costService.filterCostListByDateInterval(mockCostList, 1, 3);

    expect(costs).toEqual([mockCostList[2]]);
  });

  it('should test addCostInExistingCategory function must add cost of existent category in correct cost list and update sum', () => {
    costService.currentCostList = new BehaviorSubject<UserCosts[]>(mockUserCosts);
    costService.addCostInExistingCategory(mockCost);
    const newCostInList = costService.currentCostList.getValue().pop().costList.pop();

    expect(newCostInList).toEqual(mockCost);
  });

  describe('should test addCostInCurrentCostList function must call correct add cost strategy by existing category in cost list', () => {

    it('should test addCostInCurrentCostList function with existing category in cost list', () => {
      spyOn(costService, 'isCategoryInCostList').and.returnValue(true);
      const addCostInExistingCategorySpy = spyOn(costService, 'addCostInExistingCategory');

      costService.addCostInCurrentCostList(mockCost);

      expect(addCostInExistingCategorySpy).toHaveBeenCalled();
      expect(addCostInExistingCategorySpy).toHaveBeenCalledWith(mockCost);
    });

    it('should test addCostInCurrentCostList function with nonexistent category in cost list', () => {
      spyOn(costService, 'isCategoryInCostList').and.returnValue(false);
      const addCostWithCategoryInCostListSpy = spyOn(costService, 'addCostWithCategoryInCostList');

      costService.addCostInCurrentCostList(mockCost);

      expect(addCostWithCategoryInCostListSpy).toHaveBeenCalled();
      expect(addCostWithCategoryInCostListSpy).toHaveBeenCalledWith(mockCost);
    });
  });

  it('should test setTodayCosts function must update cost list', async(() => {
    const response = mockUserCosts;
    const costApiService = TestBed.get(CostApiService);
    const getTodayAllUserCostsSpy = spyOn(costApiService, 'getTodayAllUserCosts').and.returnValue(of(response));
    const setCostListSpy = spyOn(costService, 'setCostList');

    costService.setTodayCosts();

    expect(getTodayAllUserCostsSpy).toHaveBeenCalled();
    expect(setCostListSpy).toHaveBeenCalled();
    expect(setCostListSpy).toHaveBeenCalledWith(response);
  }));

});

