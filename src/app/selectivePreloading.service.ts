import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({providedIn:'root'})
export class SelectivePreloading implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // if the data in route specifies preloading, use the load fn passed in
        if(route?.data?.preload){
            return load();
        }
        return of(null);
    }
    
}