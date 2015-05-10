# gmaps.geofences

gmaps.js module to manage geofences*.

*A geofence is a polygon that delimits a zone in a map.

## Install

For using with bundlers (as Browserify or Webpack):

`npm install gmaps.geofences --save`

Before `require()` this module you need to `require('gmaps.core')`.

For using directly in the browser, download the `gmaps.geofences.js` (or `gmaps.geofences.min.js`) in `dist`.

## Usage

You need to register a `<script>` tag with the Google Maps JavaScript API, then import gmaps.core.

Every Google Maps map needs a container (`<div id="map"></div>` in this demo), which needs to have width and height, and be visible (without `display: none`, for example):

```
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="gmaps.core.js"></script>
  <script src="gmaps.geofences.js"></script>
  <style type="text/css">
    #map {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = new GMaps({
      el : '#map',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });

    var path = [
      [-12.040397656836609,-77.03373871559225],
      [-12.040248585302038,-77.03993927003302],
      [-12.050047116528843,-77.02448169303511],
      [-12.044804866577001,-77.02154422636042]
    ];

    var polygon = new google.maps.Polygon({
      paths: GMaps.arrayToLatLng(path),
      map: mapWithGeofences.map
    });

    var isInside = mapWithGeofences.checkGeofence(-12.0433, -77.02833, polygon);

    console.log(isInside);
  </script>
</body>
</html>
```

For more examples you can check the tests in this repo.

## Documentation

### `checkGeofence(lat, lng, fence)`

Check if a coordinate (`lat` and `lng`) is inside the `fence`. A `fence` can be an instance of `google.maps.Polygon`, `google.maps.Circle` or `google.maps.LatLngBounds`. For `google.maps.Circle`, you need to load the Google Maps API with the `geometry` library.

### `checkMarkerGeofence(marker, outsideCallback)`

Check if a `google.map.Marker` marker is inside of any of its fences, triggering an `outsideCallback` if the marker is outside.

## Changelog

For pre 0.5.0 versions, check [gmaps.js changelog](https://github.com/hpneo/gmaps#changelog)

### 0.5.0

* Node module format (CommonJS)

## License

MIT License. Copyright 2015 Gustavo Leon. http://github.com/hpneo

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.