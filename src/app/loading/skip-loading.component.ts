import { HttpContextToken } from '@angular/common/http';

/**
 * Prevent Loading Indicator from running.
 * To use on a Method (GET, POST, etc), add a configuration object
 * to the request.
 *
 * Example:
 * this.http.get<IGetCoursesResponse>(`${this.env.apiRoot}/courses`,
 *   {
 *     context: new HttpContext().set(SKIP_LOADING, true)
 *   }
 * );
 */

export const SKIP_LOADING = new HttpContextToken(() => false);
