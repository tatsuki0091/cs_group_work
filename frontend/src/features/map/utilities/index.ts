import { useForm } from '../../../hooks/useForm';
import { GET } from '../../../helpers/axios/constants';

export function getCurrentLocation() {
    let geolocationPromise: Promise<{
        latitude: number;
        longitude: number;
    }> | null = null;
    const getGeolocation = (): Promise<{
        latitude: number;
        longitude: number;
    }> => {
        if (!geolocationPromise) {
            geolocationPromise = new Promise((resolve, reject) => {
                // If the app can get the current use's location from browser
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            });
                        },
                        (error) => {
                            reject(error);
                        },
                    );
                } else {
                    reject(
                        new Error(
                            'Geolocation is not supported by this browser.',
                        ),
                    );
                }
            });
        }
        return geolocationPromise;
    };

    return getGeolocation();
}
