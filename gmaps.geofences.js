'use strict';

var _forEach = require('lodash-compat/collection/forEach'),
    _extend = require('lodash-compat/object/extend'),
    geofencesModule = {};

geofencesModule.checkGeofence = function(lat, lng, fence) {
  return fence.containsLatLng(new google.maps.LatLng(lat, lng));
};

geofencesModule.checkMarkerGeofence = function(marker, outsideCallback) {
  var self = this;

  if (marker.fences) {
    _forEach(marker.fences, function(fence) {
      var position = marker.getPosition(),
          isInside = self.checkGeofence(position.lat(), position.lng(), fence);

      if (!isInside) {
        outsideCallback.call(self, marker, fence);
      }
    });
  }
};

if (window.google.maps) {
  //==========================
  // Polygon containsLatLng
  // https://github.com/tparkin/Google-Maps-Point-in-Polygon
  // Poygon getBounds extension - google-maps-extensions
  // http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
  if (!google.maps.Polygon.prototype.getBounds) {
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds(),
          paths = this.getPaths(),
          path;

      for (var p = 0; p < paths.getLength(); p++) {
        path = paths.getAt(p);

        for (var i = 0; i < path.getLength(); i++) {
          bounds.extend(path.getAt(i));
        }
      }

      return bounds;
    };
  }

  if (!google.maps.Polygon.prototype.containsLatLng) {
    // Polygon containsLatLng - method to determine if a latLng is within a polygon
    google.maps.Polygon.prototype.containsLatLng = function(latLng) {
      // Exclude points outside of bounds as there is no way they are in the poly
      var bounds = this.getBounds(),
          inPoly = false,
          numPaths = this.getPaths().getLength();

      if (bounds && !bounds.contains(latLng)) {
        return false;
      }

      // Raycast point in polygon method

      for (var p = 0; p < numPaths; p++) {
        var path = this.getPaths().getAt(p),
            numPoints = path.getLength(),
            j = numPoints - 1;

        for (var i = 0; i < numPoints; i++) {
          var vertex1 = path.getAt(i),
              vertex2 = path.getAt(j);

          if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng()) {
            if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
              inPoly = !inPoly;
            }
          }

          j = i;
        }
      }

      return inPoly;
    };
  }

  if (!google.maps.Circle.prototype.containsLatLng) {
    google.maps.Circle.prototype.containsLatLng = function(latLng) {
      if (google.maps.geometry) {
        return (google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius());
      }
      else {
        return true;
      }
    };
  }

  google.maps.LatLngBounds.prototype.containsLatLng = google.maps.LatLngBounds.prototype.contains;

  google.maps.Marker.prototype.setFences = function(fences) {
    this.fences = fences;
  };

  google.maps.Marker.prototype.addFence = function(fence) {
    this.fences.push(fence);
  };
}

if (window.GMaps) {
  // GMaps.customEvents.push();

  _extend(GMaps.prototype, geofencesModule);
}

module.exports = geofencesModule;