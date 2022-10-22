import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

@Injectable()
export class CatcheRouteReuseStrategy implements RouteReuseStrategy {
  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  allowRetriveCache = {
    'search-results': true,
  };

  shouldReuseRoute(
    before: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (
      this.getPath(curr) === 'comments'
    ) {
      this.allowRetriveCache[ this.getPath(before)] = true;
    } else {
      this.allowRetriveCache[ this.getPath(before)] = false;
    }
    return before.routeConfig === curr.routeConfig;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(
      this.getPath(route)
    ) as DetachedRouteHandle;
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetriveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }

    return false;
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetriveCache.hasOwnProperty(path)) {
      return true;
    }
    return false;
  }
  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }
  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
      return route.routeConfig.path;
    }
    return '';
  }
}
