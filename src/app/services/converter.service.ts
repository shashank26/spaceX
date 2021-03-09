import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConverterService {

    public responseToLaunchModel(response: any): any {
        if (!response) {
            return [];
        }
        return response.map((r: any) => {
            return {
                image: r.image || r.links.mission_patch_small || r.links.mission_patch || r.links.flickerImages['0'],
                missionName: r.missionName || r.mission_name,
                flightNumber: r.flightNumber || r.flight_number,
                missionIds: r.missionIds || r.mission_id,
                launchYear: r.launchYear || r.launch_year,
                successfulLaunch: r.successfulLaunch || r.launch_success,
                successfulLanding: r.successfulLanding || this.wasLandingSuccessful(r.rocket.first_stage),
            };
        });
    }

    private wasLandingSuccessful(rocket: any): any {
        const success = rocket.cores.some((core: any) => core.land_success === true);
        if (success) {
            return true;
        }
        const failure = rocket.cores.some((core: any) => core.land_success === false);
        if (failure) {
            return false;
        }
        return 'NA';

    }
}
