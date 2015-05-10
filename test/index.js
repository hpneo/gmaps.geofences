describe('Checking geofences', function() {
  var mapWithGeofences, readyEvent, path;

  beforeEach(function() {
    mapWithGeofences = mapWithGeofences || new GMaps({
      el : '#geofences',
      lat : -12.0433,
      lng : -77.0283,
      zoom : 12
    });

    path = [
      [-12.040397656836609,-77.03373871559225],
      [-12.040248585302038,-77.03993927003302],
      [-12.050047116528843,-77.02448169303511],
      [-12.044804866577001,-77.02154422636042]
    ];
  });

  it('should check if a coordinate is inside a google.maps.Polygon', function() {
    var polygon = new google.maps.Polygon({
      paths: GMaps.arrayToLatLng(path),
      map: mapWithGeofences.map
    });

    // var marker = new google.maps.Marker({
    //   position: GMaps.coordsToLatLngs([-12.0433, -77.02833]),
    //   map: mapWithGeofences.map
    // });

    var isInside = mapWithGeofences.checkGeofence(-12.0433, -77.02833, polygon);

    expect(isInside).toBe(true);
  });

  it('should check if a coordinate is inside a google.maps.Circle', function() {
    var circle = new google.maps.Circle({
      center: GMaps.coordsToLatLngs([-12.0433, -77.02833]),
      map: mapWithGeofences.map
    });

    var isInside = mapWithGeofences.checkGeofence(-12.0433, -77.02833, circle);
    
    expect(isInside).toBe(true);
  });

  it('should check if a coordinate is inside a google.maps.LatLngBounds', function() {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < path.length; i++) {
      var coordinate = GMaps.coordsToLatLngs(path[i]);

      bounds.extend(coordinate);
    }

    var isInside = mapWithGeofences.checkGeofence(-12.0433, -77.02833, bounds);
    
    expect(isInside).toBe(true);
  });
});