export const initAutocomplete = ()=> {
  // if(document.getElementById("map")){
  
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });

    function getLocality(place, area){
      return place.find(a => a.types.includes(area))?.long_name;
    }

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new window.google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        // console.log(getLocality(place.address_components, "sublocality_level_2"))
        // console.log(getLocality(place.address_components, "sublocality_level_1"))
        // console.log(getLocality(place.address_components, "locality"))
        // console.log(getLocality(place.address_components, "administrative_area_level_1"))


        sessionStorage.setItem('full_address', place.formatted_address)
        sessionStorage.setItem('city', getLocality(place.address_components, "locality"))
        sessionStorage.setItem('state', getLocality(place.address_components, "administrative_area_level_1"))
        sessionStorage.setItem('country', getLocality(place.address_components, "country"))
        sessionStorage.setItem('evtLat', place.geometry.location.lat())
        sessionStorage.setItem('evtLng', place.geometry.location.lng())

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
      
  // }
  }