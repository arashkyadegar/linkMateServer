import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed if running in Node.js.

@Injectable()
export class GeoLocationService {
  async getGeoInfo(ip: string): Promise<any> {
    try {

      const geoRes = await fetch(`https://ipwho.is/${ip}`);
      if (!geoRes.ok) {
        throw new Error('Failed to fetch geolocation data');
      }
      const geo = await geoRes.json();
      return geo;
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      throw error; // Optionally handle or log error based on your needs.
    }
  }
}
