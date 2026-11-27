export interface CityLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utcOffset: number; // in hours
}

export const CITIES_DATABASE: CityLocation[] = [
  // Malaysia & Southeast Asia
  { city: "Kuala Lumpur", country: "Malaysia", latitude: 3.139, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "George Town (Penang)", country: "Malaysia", latitude: 5.4141, longitude: 100.3288, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "Johor Bahru", country: "Malaysia", latitude: 1.4927, longitude: 103.7414, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "Ipoh", country: "Malaysia", latitude: 4.5975, longitude: 101.0901, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "Kuching", country: "Malaysia", latitude: 1.5533, longitude: 110.3592, timezone: "Asia/Kuching", utcOffset: 8 },
  { city: "Kota Kinabalu", country: "Malaysia", latitude: 5.9804, longitude: 116.0735, timezone: "Asia/Kuching", utcOffset: 8 },
  { city: "Malacca City", country: "Malaysia", latitude: 2.1896, longitude: 102.2501, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "Shah Alam", country: "Malaysia", latitude: 3.0738, longitude: 101.5183, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "Petaling Jaya", country: "Malaysia", latitude: 3.1073, longitude: 101.6067, timezone: "Asia/Kuala_Lumpur", utcOffset: 8 },
  { city: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", utcOffset: 8 },
  { city: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018, timezone: "Asia/Bangkok", utcOffset: 7 },
  { city: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", utcOffset: 7 },
  { city: "Manila", country: "Philippines", latitude: 14.5995, longitude: 120.9842, timezone: "Asia/Manila", utcOffset: 8 },

  // Global Hubs
  { city: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", utcOffset: 0 },
  { city: "New York", country: "United States", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York", utcOffset: -5 },
  { city: "Los Angeles", country: "United States", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles", utcOffset: -8 },
  { city: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", utcOffset: -5 },
  { city: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", utcOffset: 1 },
  { city: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.405, timezone: "Europe/Berlin", utcOffset: 1 },
  { city: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", utcOffset: 4 },
  { city: "Mumbai", country: "India", latitude: 19.076, longitude: 72.8777, timezone: "Asia/Kolkata", utcOffset: 5.5 },
  { city: "New Delhi", country: "India", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata", utcOffset: 5.5 },
  { city: "Bengaluru", country: "India", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", utcOffset: 5.5 },
  { city: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", utcOffset: 9 },
  { city: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", utcOffset: 10 },
  { city: "Melbourne", country: "Australia", latitude: -37.8136, longitude: 144.9631, timezone: "Australia/Melbourne", utcOffset: 10 },
  { city: "Hong Kong", country: "China", latitude: 22.3193, longitude: 114.1694, timezone: "Asia/Hong_Kong", utcOffset: 8 },
];

export function searchCities(query: string): CityLocation[] {
  if (!query || query.trim().length < 2) return CITIES_DATABASE.slice(0, 6);
  const q = query.toLowerCase().trim();
  return CITIES_DATABASE.filter(
    (c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
  ).slice(0, 8);
}
