import {Loader} from 'google-maps';
import CustomLatLng from "@/ManagerBis/Common/CustomLatLng";

export default interface GoogleMapInputPort {
    getMarkers(): google.maps.Marker[];
    getCurrentLatLng(): google.maps.LatLng;
    initMarker(initMarkerPosition: CustomLatLng | undefined): void;
}
