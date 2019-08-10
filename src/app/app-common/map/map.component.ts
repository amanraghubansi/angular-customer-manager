
import {
  Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'cm-map',
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  private isEnabled: boolean;
  private loadingScript: boolean;
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  mapHeight: string;
  mapWidth: string;

  @Input() height: number;
  @Input() width: number;
  @Input() latitude = 34.5133;
  @Input() longitude = -94.1629;
  @Input() markerText = 'Your Location';
  @Input() zoom = 8;

  // Necessary since a map rendered while container is hidden
  // will not load the map tiles properly and show a grey screen
  @Input() get enabled(): boolean {
    return this.isEnabled;
  }

  set enabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
    this.init();
  }

  @ViewChild('mapContainer', { static: true }) mapDiv: ElementRef;

  constructor() { }

  ngOnInit() {
    if (this.latitude && this.longitude) {
      if (this.mapHeight && this.mapWidth) {
        this.mapHeight = this.height + 'px';
        this.mapWidth = this.width + 'px';
      } else {
        const hw = this.getWindowHeightWidth(this.mapDiv.nativeElement.ownerDocument);
        this.mapHeight = hw.height / 2 + 'px';
        this.mapWidth = hw.width + 'px';
      }
    }
  }

  init() {
    // Need slight delay to avoid grey box when google script has previously been loaded.
    // Otherwise map <div> container may not be visible yet which causes the grey box.
    setTimeout(() => {
      this.ensureScript();
    }, 200);
  }

  private getWindowHeightWidth(document: HTMLDocument) {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    if (width > 900) { width = 900; }

    return { height: height, width: width };
  }

  private ensureScript() {
    this.loadingScript = true;
    const document = this.mapDiv.nativeElement.ownerDocument;
    const script = <HTMLScriptElement>document.querySelector('script[id="googlemaps"]');
    if (script) {
      if (this.isEnabled) { this.renderMap(); }
    } else {
      const mapsScript = document.createElement('script');
      mapsScript.id = 'googlemaps';
      mapsScript.type = 'text/javascript';
      mapsScript.async = true;
      mapsScript.defer = true;
      mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1KDldeF_2GzaTXrEHR0l6cyCS7AnmBw';
      mapsScript.onload = () => {
        this.loadingScript = false;
        if (this.isEnabled) { this.renderMap(); }
      };
      document.body.appendChild(mapsScript);
    }
  }

  private renderMap() {
    const latlng = this.createLatLong(this.latitude, this.longitude);
    const options = {
      zoom: this.zoom,
      center: latlng,
      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapDiv.nativeElement, options);
    this.createMarker(latlng, this.map, this.markerText);
  }

  private createLatLong(latitude: number, longitude: number) {
    return (latitude && longitude) ? new google.maps.LatLng(latitude, longitude) : null;
  }

  private createMarker(position: google.maps.LatLng, map: google.maps.Map, title: string) {
    const infowindow = new google.maps.InfoWindow({
      content: title
    });

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP
    });

    this.markers.push(marker);

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  }
}
