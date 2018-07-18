import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Genero } from './genero.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Genero>;

@Injectable()
export class GeneroService {

    private resourceUrl =  SERVER_API_URL + 'api/generos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/generos';

    constructor(private http: HttpClient) { }

    create(genero: Genero): Observable<EntityResponseType> {
        const copy = this.convert(genero);
        return this.http.post<Genero>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(genero: Genero): Observable<EntityResponseType> {
        const copy = this.convert(genero);
        return this.http.put<Genero>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Genero>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Genero[]>> {
        const options = createRequestOption(req);
        return this.http.get<Genero[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Genero[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Genero[]>> {
        const options = createRequestOption(req);
        return this.http.get<Genero[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Genero[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Genero = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Genero[]>): HttpResponse<Genero[]> {
        const jsonResponse: Genero[] = res.body;
        const body: Genero[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Genero.
     */
    private convertItemFromServer(genero: Genero): Genero {
        const copy: Genero = Object.assign({}, genero);
        return copy;
    }

    /**
     * Convert a Genero to a JSON which can be sent to the server.
     */
    private convert(genero: Genero): Genero {
        const copy: Genero = Object.assign({}, genero);
        return copy;
    }
}
