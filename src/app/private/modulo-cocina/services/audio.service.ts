import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  //private apiUrl = 'http://localhost:3000/send-audio';
 private apiUrl = 'https://ia-mandatos.onrender.com/send-audio';

  constructor(private http: HttpClient) {}

  sendAudio(audioBlob: Blob): Observable<{ indice: string, intencion: string }> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    return this.http.post<{ indice: string, intencion: string }>(this.apiUrl, formData);
  }
}
