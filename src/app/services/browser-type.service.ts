import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BrowserType {
    browserType: 'Mobile' | 'Desktop' = 'Desktop';
}