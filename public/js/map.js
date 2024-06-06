
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });


     // Create a default Marker and add it to the map.
     const marker = new mapboxgl.Marker({color:"red"})
     .setLngLat(coordinates)
     .setPopup(new mapboxgl.Popup({offset: 25})
     .setHTML("<h5>Exact location provided after booking!</h5>")
     .setMaxWidth("300px")
 )
     .addTo(map);

