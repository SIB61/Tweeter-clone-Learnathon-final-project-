
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url + req.params.toString();
    if (this.httpCacheService.get(url) && req.method === 'GET') {
      console.log(this.httpCacheService.get(url));
      return of(this.httpCacheService.get(req.url));
    }
    else 
    return next.handle(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse && req.method === 'GET')
          this.httpCacheService.put(url, res);
      })
    );
  }
