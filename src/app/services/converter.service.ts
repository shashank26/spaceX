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
                image: r.links.mission_patch_small || r.links.mission_patch || r.links.flickerImages['0'],
                missionName: r.mission_name,
                flightNumber: r.flight_number,
                missionIds: r.mission_id,
                launchYear: r.launch_year,
                successfulLaunch: r.launch_success,
                successfulLanding: this.wasLandingSuccessful(r.rocket.first_stage),
            };
        });
    }

    private wasLandingSuccessful(rocket: any): boolean {
        return rocket.cores.some((core: any) => core.land_success);
    }
}
