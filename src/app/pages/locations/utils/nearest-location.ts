export const getNearestPoint = (origin, destination) => {
  console.log('destination', destination);
  const PythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
    const Deg2Rad = (deg) => (deg * Math.PI) / 180;

    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    const R = 6371; // km
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = lat2 - lat1;
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  let minDif = 99999;
  let closest;

  for (let index = 0; index < destination.length; ++index) {
    const dif = PythagorasEquirectangular(
      origin.lat,
      origin.long,
      destination[index].shopLocation.latitude,
      destination[index].shopLocation.longitude
    );

    if (dif < minDif) {
      closest = index;
      minDif = dif;
    }
  }
  return destination[closest];
}

export const calculateDistanceNearest = (origin: any, destination: any) => {
  const directionsService = new google.maps.DirectionsService();
  const request = {
    origin: new google.maps.LatLng(origin.lat, origin.lng), // LatLng|string
    destination: new google.maps.LatLng(destination.lat, destination.lng), // LatLng|string
    travelMode: google.maps.TravelMode.DRIVING
  };
  return new Promise((resolve) => {
    directionsService.route(request, (response, status) => {
      if (status == 'OK') {
        const point = response.routes[0].legs[0];
        resolve({
          esitamteTravelTime: point.duration.text,
          distanceKM: point.distance.text,
          writtenAddress: point.start_address
        })
      }
    });
  })
}