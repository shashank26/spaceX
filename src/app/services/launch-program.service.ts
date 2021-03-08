import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LaunchProgramModel } from '../models/launch-program.model';
import { subjectMapKeys } from '../models/subjectMapKeys';
import { UAParser } from 'ua-parser-js';

@Injectable({
    providedIn: 'root',
})
export class LaunchProgramService {

    public browserType: 'DESKTOP' | 'MOBILE' = 'DESKTOP';

    public launchProgramsSubjectMap = new Map<string, BehaviorSubject<LaunchProgramModel[]>>([
        [subjectMapKeys.LAUNCH_PROGRAMS, new BehaviorSubject<LaunchProgramModel[]>([])],
        [subjectMapKeys.FILTERED_LAUNCH_PROGRAMS, new BehaviorSubject<LaunchProgramModel[]>([])],
    ]);

    constructor(private http: HttpClient, private injector: Injector, @Inject(PLATFORM_ID) private platformId: any) {
        if (isPlatformBrowser(platformId)) {
            const uaParser = new UAParser(window.navigator.userAgent);
            this.browserType =
                uaParser.getOS().name === 'Android' ||
                    uaParser.getOS().name === 'iOS'
                    ? 'MOBILE' : 'DESKTOP';
        } else {
            this.browserType = this.injector.get('UserAgent');
        }
    }

    async getLaunchPrograms(limit: number, offset: number, filters: any, loadMore: boolean = false): Promise<void> {
        try {
            let queryParamString = this.getFilterQueryString(filters);
            const response = await this.http.get<any[]>(`https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}${queryParamString}`).toPromise();
            const behaviorSubject =
                this.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS) as BehaviorSubject<LaunchProgramModel[]>;
            const prevVal = loadMore ? behaviorSubject.getValue() : [];
            behaviorSubject.next(prevVal.concat(this.responseToLaunchModel(response)));
        } catch (e) {
            return e;
        }
    }

    public responseToLaunchModel(response: any[]): LaunchProgramModel[] {
        return response.map<LaunchProgramModel>(r => {
            return {
                image: r.links.mission_patch_small || r.links.mission_patch || r.flickerImages['0'],
                missionName: r.mission_name,
                flightNumber: r.flight_number,
                missionIds: r.mission_id,
                launchYear: r.launch_year,
                successfulLaunch: r.launch_success,
                successfulLanding: this.wasLandingSuccessful(r.rocket.first_stage),
            };
        });
    }

    private getFilterQueryString(filters: any): string {
        const queryString = Reflect.ownKeys(filters).map((k) => `${String(k)}=${filters[k]}`);
        if (queryString.length > 0) {
            return '&' + queryString.join('&');
        }
        return '';
    }

    private wasLandingSuccessful(rocket: any): boolean {
        return rocket.cores.some((core: any) => core.land_success);
    }
}
