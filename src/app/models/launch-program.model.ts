export interface LaunchProgramModel {
    image: string;
    missionName: string;
    flightNumber: number;
    missionIds: string[];
    launchYear: number;
    successfulLaunch: boolean;
    successfulLanding: boolean;
}
