mapboxgl.accessToken = MapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// Force map size in case CSS is overridden
const mapDiv = document.getElementById('map');
mapDiv.style.width = '350px';
mapDiv.style.height = '250px';

const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<p>${listing.location}</p><h5>Exact location after booking!</h5>`)
    )
    .addTo(map);