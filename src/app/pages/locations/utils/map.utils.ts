export function findClosestMarker(lat1: any, lon1: any, markers = []) {
    const pi = Math.PI;
    const R = 6371;
    const distances = [];
    let closest = -1;

    for (let i = 0; i < markers.length; i++) {
        const lat2 = markers[i].lat;
        const lon2 = markers[i].lng;

        const chLat = lat2 - lat1;
        const chLon = lon2 - lon1;

        const dLat = chLat * (pi / 180);
        const dLon = chLon * (pi / 180);

        const rLat1 = lat1 * (pi / 180);
        const rLat2 = lat2 * (pi / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(rLat1) *
            Math.cos(rLat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        distances[i] = d;
        if (closest === -1 || d < distances[closest]) {
            closest = i;
        }
    }

    return markers[closest];
}


export function getInitials(name: string) {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}


export function calculateDistance(origin: any, destination: any, directionsServices: any) {
    const directionsService = new google.maps.DirectionsService();
    const request = {
        origin: new google.maps.LatLng(origin.lat, origin.lng), // LatLng|string
        destination: new google.maps.LatLng(destination.lat, destination.lng), // LatLng|string
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsServices(request, directionsService);
}
