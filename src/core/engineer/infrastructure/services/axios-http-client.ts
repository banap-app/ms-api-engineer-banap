import { firstValueFrom } from 'rxjs';
import { HttpClient } from 'src/core/shared/application/http-client';
import { AxiosService } from 'src/nest/common/axios/axios.service';

export class AxiosHttpClient implements HttpClient {
  constructor(private readonly axiosService: AxiosService) {}

  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.axiosService.get<T>(url, config);
    return response.data;
  }
}
