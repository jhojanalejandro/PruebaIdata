import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient)
  {
  }

  /**
   * Get data
   */
   getAllUser(): Observable<any>
  {
      let urlEndPoint = environment.url+ environment.UserList;

      return  this._httpClient.get(urlEndPoint)
  }


  async getUser(id: any){
      let urlEndPoint = environment.GetUser;
      return await this._httpClient.get<any>(urlEndPoint + id);
  }

 async updateUser(data: any ): Promise<Observable<any>>{
  return await  this._httpClient.put<any>('/api/users/', data);
}

async deleteUser(id: any ): Promise<Observable<any>>{
  return await  this._httpClient.delete<any>('/api/users/'+ id);
}
}
