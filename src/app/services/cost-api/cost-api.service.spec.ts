import { TestBed } from '@angular/core/testing';

import { UserCosts } from '../../pages/authorization/interfaces/user-costs.interface';
import { CostDto } from '../../pages/application/pages/main/interfaces/cost-dto.intarfece';
import { apiUrls } from '../../global-constants/api-urls';
import { environment } from '../../../environments/environment';
import { CostApiService } from './cost-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CostApiService', () => {

  let costApiService: CostApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CostApiService,
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    costApiService = TestBed.get(CostApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created costApiService', () => {
    expect(costApiService).toBeTruthy();
  });

  it('should test getTodayAllUserCosts function return full UserCosts[]', () => {
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

    costApiService.getTodayAllUserCosts()
      .subscribe(
        userCosts => {
          expect(userCosts[0]._id).toEqual(mockUserCosts[0]._id);
          expect(userCosts[0].costSum).toEqual(mockUserCosts[0].costSum);
          expect(userCosts[0].costList.length).toEqual(mockUserCosts[0].costList.length);
        }
      );

    const req = httpTestingController.expectOne(`${environment.serverUrl}/${apiUrls.getAllUserCosts}`);

    req.flush(mockUserCosts);

    expect(req.request.method).toBe('GET');
  });

  it('should test getCurrentAllUserCosts function return filtered UserCosts[] by time interval', () => {
    const mockFilteredUserCosts: UserCosts[] = [
      {
        _id: 'test',
        costSum: 800,
        costList: [
          {
            costType: 'test',
            costDescription: 'test',
            costValue: 100,
            costDate: 5,
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
    const startDate = 1;
    const endDate = 10;

    costApiService.getCurrentAllUserCosts(startDate, endDate)
      .subscribe(
        userCosts => {
          expect(userCosts[0]._id).toEqual(mockFilteredUserCosts[0]._id);
          expect(userCosts[0].costSum).toEqual(mockFilteredUserCosts[0].costSum);
        }
      );

    const req = httpTestingController.expectOne(`${environment.serverUrl}/${apiUrls.getAllUserCosts}/${startDate}/${endDate}`);

    req.flush(mockFilteredUserCosts);

    expect(req.request.method).toBe('GET');
  });

  it('should test addCost function send cost data', () => {
    const mockCost: CostDto = {
      costType: 'test',
      costValue: 100,
      costDescription: 'test',
      costDate: 3,
    };

    costApiService.addCost(mockCost)
      .subscribe();

    const req = httpTestingController.expectOne(`${environment.serverUrl}/${apiUrls.addCost}`);

    req.flush(null);

    expect(req.request.method).toBe('POST');
  });

});
