import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BASE_URL, LONG_MIN_VALUE } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAvailableMetrics(jobId, vertexId) {
    return this.httpClient.get<Array<{ id: string, value: string }>>(`${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/metrics`);
  }

  getMetrics(jobId, vertexId, listOfMetricName) {
    const metricName = listOfMetricName.join(',');
    return this.httpClient.get<Array<{ id: string, value: string }>>(
      `${BASE_URL}/jobs/${jobId}/vertices/${vertexId}/metrics?get=${metricName}`
    ).pipe(
      map(arr => {
        const result = {};
        arr.forEach(item => {
          result[ item.id ] = parseInt(item.value, 10);
        });
        return {
          timestamp: Date.now(),
          values   : result
        };
      }));
  }

  getWatermarks(jobId, vertexId, parallelism) {
    const listOfMetricName = new Array(parallelism).fill(0).map((item, index) => `${index}.currentInputWatermark`);
    return this.getMetrics(jobId, vertexId, listOfMetricName).pipe(map(metrics => {
      let minValue = NaN;
      let lowWatermark = NaN;
      const watermarks = {};
      const ref = metrics.values;
      for (const key in ref) {
        const value = ref[ key ];
        const subTaskIndex = key.replace('.currentInputWatermark', '');
        watermarks[ subTaskIndex ] = value;
        if (isNaN(minValue) || value < minValue) {
          minValue = value;
        }
      }
      if (!isNaN(minValue) && minValue > LONG_MIN_VALUE) {
        lowWatermark = minValue;
      } else {
        lowWatermark = NaN;
      }
      return {
        'lowWatermark': lowWatermark,
        'watermarks'  : watermarks
      };
    }));
  }
}
