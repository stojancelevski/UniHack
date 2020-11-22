import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public apiKey: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    private platform: any;
    private map: any;
    private router: any;

    public constructor() { }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            "apiKey": this.apiKey
        });
        this.router = this.platform.getRoutingService();
    }

    public ngAfterViewInit() {
        setTimeout(() => {
            let defaultLayers = this.platform.createDefaultLayers();
            this.map = new H.Map(
                this.mapElement.nativeElement,
                defaultLayers.vector.normal.map,
                {
                    zoom: 10,
                    center: { lat: this.lat, lng: this.lng }
                }
            );
        }, 1000);
    }

    public isoline() { }

}
