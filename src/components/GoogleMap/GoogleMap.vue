<template>
  <div>
    <div class="d-flex">
      <input ref="placeAuto" id="placeAuto" type="text">
      <div>
        {{ currentAddress }}
      </div>
    </div>

    <div ref="GoogleMap" id="googleMap">
    </div>
  </div>

</template>

<script lang="ts">
import {Component, Emit, Ref, Vue} from "vue-property-decorator";
// eslint-disable-next-line no-unused-vars
import {Loader, LoaderOptions} from 'google-maps';
import Preference from "@/Preference";
// eslint-disable-next-line no-unused-vars
import GoogleMapInputPort from "@/components/GoogleMap/GoogleMapInputPort";
// eslint-disable-next-line no-unused-vars
import CustomLatLng from "@/ManagerBis/Common/CustomLatLng";

@Component
export default class GoogleMap extends Vue implements GoogleMapInputPort {

  @Ref("GoogleMap")
  googleMapElement!: HTMLElement;

  @Ref("infoWindowContent")
  infoWindowContent!: HTMLElement

  @Ref("placeAuto")
  placeAuto!: HTMLInputElement;

  loader!: Loader;

  map!: google.maps.Map;

  markers: google.maps.Marker[] = []

  apiKey = Preference.googleMapBrowserApiKey;

  autocomplete!: google.maps.places.Autocomplete;

  currentAddress = "";

  created() {
    const options: LoaderOptions = {
      language: "ko",
      region: "KR",
      libraries: ["places"]
    };
    this.loader = new Loader(this.apiKey, options);

  }

  async mounted() {
    const google = await this.loader.load();
    this.map = new google.maps.Map(this.googleMapElement, {
      center: {lat: 37.5088141, lng: 126.8890174},
      zoom: 15,
    });
    this.map.addListener('click', this.onMapClick)

    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(
        this.placeAuto
    );

    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    this.onMapLoaded();
  }

  onPlaceChanged() {
    let place = this.autocomplete.getPlace();
    if (place.geometry != undefined) {
      this._clearMarker();
      this.map.setCenter(place.geometry.location)
      this._addMarker(place.geometry.location)
    }
  }

  onMapClick(value: any) {
    const latLng = value.latLng as google.maps.LatLng;
    this._clearMarker();
    this._addMarker(latLng)
  }


  _addMarker(latLng: google.maps.LatLng) {
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    this.changeCurrentMarkerLatLng(latLng);

    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({location: latLng}, this.geocodeHandler)
    this.markers.push(marker);
  }

  geocodeHandler(results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {
    // eslint-disable-next-line no-undef
    if (status == google.maps.GeocoderStatus.OK) {
      this.currentAddress = results[0].formatted_address;
      this.changeCurrentAddress(this.currentAddress);
    }
  }

  @Emit("changeCurrentAddress")
  changeCurrentAddress(address: String) {
    return address;
  }

  @Emit("changeCurrentMarkerLatLng")
  changeCurrentMarkerLatLng(latLng: google.maps.LatLng) {
    return latLng;
  }

  @Emit("mapLoaded")
  onMapLoaded() {
    return;
  }

  _clearMarker() {
    this.markers.forEach(x => {
      x.setMap(null);
    })
    this.markers.splice(0, this.markers.length);
  }

  getMarkers(): google.maps.Marker[] {
    return this.markers;
  }

  getCurrentLatLng(): google.maps.LatLng {
    const position = this.markers[0].getPosition();
    if (position == null || position == undefined) {
      throw new Error("don't have marker")
    }
    return position;
  }

  initMarker(initMarkerPosition: CustomLatLng | undefined): void {
    this._clearMarker();
    if (initMarkerPosition != undefined && this.map != undefined) {
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        // eslint-disable-next-line no-undef
        position: new google.maps.LatLng(initMarkerPosition.lat,initMarkerPosition.lng),
        map: this.map,
      });

      this.markers.push(marker);

      if (initMarkerPosition.lat != undefined && initMarkerPosition.lng != undefined) {
        // eslint-disable-next-line no-undef
        this.map.setCenter(new google.maps.LatLng(initMarkerPosition.lat,initMarkerPosition.lng))
        this.map.setZoom(15)
      }
    }
  }

}
</script>

<style scoped>
#googleMap {
  width: 100%;
  height: 100%;
}

#placeAuto {
  width: 500px;
  border: black solid 1px;
}
</style>