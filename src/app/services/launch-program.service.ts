import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { LaunchProgramModel } from "../models/launch-program.model";
import { subjectMapKeys } from "../models/subjectMapKeys";
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

    constructor(private http: HttpClient, private injector: Injector, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(platformId)) {
            const uaParser = new UAParser(window.navigator.userAgent);
            this.browserType = uaParser.getOS().name === 'Android' ? 'MOBILE' : 'DESKTOP';
        } else {
            this.browserType = this.injector.get('UserAgent');
        }
    }

    async getLaunchPrograms(limit: number, offset: number, filters: any, loadMore: boolean = false) {
        try {
            let queryParamString = '';
            if (filters) {
                queryParamString = '&' + this.getFilterQueryString(filters);
            }
            const response = await this.http.get<any[]>(`https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}${queryParamString}`).toPromise();
            const behaviorSubject = <BehaviorSubject<LaunchProgramModel[]>>this.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS);
            const prevVal = loadMore ? behaviorSubject.getValue() : [];
            behaviorSubject.next(prevVal.concat(this.responseToLaunchModel(response)));
        } catch (e) {
            return e;
        }
    }

    private getFilterQueryString(filters: any) {
        let queryString = Object.keys(filters).map((k) => `${k}=${filters[k]}`);
        return queryString.join('&');
    }

    private responseToLaunchModel(response: any[]): LaunchProgramModel[] {
        return response.map<LaunchProgramModel>(r => {
            return {
                image: r.links.mission_patch_small || r.links.mission_patch || r.flickerImages['0'],
                missionName: r.mission_name,
                flightNumber: r.flight_number,
                missionIds: r.mission_id,
                launchYear: r.launch_year,
                successfulLaunch: r.launch_success,
                successfulLanding: this.wasLandingSuccessful(r.rocket.first_stage),
            }
        });
    }

    private wasLandingSuccessful(rocket: any) {
        return rocket.cores.some((core: any) => core.land_success);
    }
}