import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LaunchProgramModel } from '../models/launch-program.model';
import { subjectMapKeys } from '../models/subjectMapKeys';
import { UAParser } from 'ua-parser-js';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ConverterService } from './converter.service';

@Injectable({
    providedIn: 'root',
})
export class LaunchProgramService {

    public browserType: 'DESKTOP' | 'MOBILE' = 'DESKTOP';

    public launchProgramsSubjectMap = new Map<string, BehaviorSubject<LaunchProgramModel[]>>([
        [subjectMapKeys.LAUNCH_PROGRAMS, new BehaviorSubject<LaunchProgramModel[]>([])],
        [subjectMapKeys.FILTERED_LAUNCH_PROGRAMS, new BehaviorSubject<LaunchProgramModel[]>([])],
    ]);

    constructor(private http: HttpClient,
                private injector: Injector,
                @Inject(PLATFORM_ID) private platformId: any,
                private converter: ConverterService,
                private state: TransferState) {
        if (isPlatformBrowser(this.platformId)) {
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
            const queryParamString = this.getFilterQueryString(filters);
            const url = `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}${queryParamString}`;
            const response = await this.http.get<any[]>(url).toPromise();
            this.emitCollatedData(response, loadMore);
        } catch (e) {
            return e;
        }
    }

    public getInitialDataFromState(limit: number, offset: number, filters: any): void {
        const queryParamString = this.getFilterQueryString(filters);
        const url = `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}${queryParamString}`;
        const behaviorSubject =
            this.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS) as BehaviorSubject<LaunchProgramModel[]>;
        behaviorSubject.next(this.state.get(makeStateKey(url), []));
    }

    private emitCollatedData(response: any, loadMore: boolean): void {
        const behaviorSubject =
            this.launchProgramsSubjectMap.get(subjectMapKeys.LAUNCH_PROGRAMS) as BehaviorSubject<LaunchProgramModel[]>;
        let prevData: LaunchProgramModel[] = [];
        const prevValue = behaviorSubject.getValue();
        if (loadMore) {
            prevData = prevValue;
        }
        behaviorSubject.next(prevData.concat(this.converter.responseToLaunchModel(response)));
    }

    private getFilterQueryString(filters: any): string {
        const queryString = Reflect.ownKeys(filters).map((k) => `${String(k)}=${filters[k]}`);
        if (queryString.length > 0) {
            return '&' + queryString.join('&');
        }
        return '';
    }
}
