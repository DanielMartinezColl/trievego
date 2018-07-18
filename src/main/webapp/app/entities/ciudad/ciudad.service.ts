import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ciudad } from './ciudad.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Ciudad>;

@Injectable()
export class CiudadService {

    private resourceUrl =  SERVER_API_URL + 'api/ciudads';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/ciudads';

    constructor(private http: HttpClient) { }

    create(ciudad: Ciudad): Observable<EntityResponseType> {
        const copy = this.convert(ciudad);
        return this.http.post<Ciudad>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ciudad: Ciudad): Observable<EntityResponseType> {
        const copy = this.convert(ciudad);
        return this.http.put<Ciudad>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Ciudad>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Ciudad[]>> {
        const options = createRequestOption(req);
        return this.http.get<Ciudad[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Ciudad[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Ciudad[]>> {
        const options = createRequestOption(req);
        return this.http.get<Ciudad[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Ciudad[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Ciudad = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Ciudad[]>): HttpResponse<Ciudad[]> {
        const jsonResponse: Ciudad[] = res.body;
        const body: Ciudad[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Ciudad.
     */
    private convertItemFromServer(ciudad: Ciudad): Ciudad {
        const copy: Ciudad = Object.assign({}, ciudad);
        return copy;
    }

    /**
     * Convert a Ciudad to a JSON which can be sent to the server.
     */
    private convert(ciudad: Ciudad): Ciudad {
        const copy: Ciudad = Object.assign({}, ciudad);
        return copy;
    }
}
