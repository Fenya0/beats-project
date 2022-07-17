let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752004, 37.576133],
    zoom: 14
  });

  const coords = [
    [55.752004, 37.576133],
    [55.744968, 37.567360],
    [55.734609, 37.611202]
  ]

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/marker.png",
    iconImageSize: [58, 73],
    iconImageOffset: [-29, -73]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);
  myMap.controls.remove('zoomControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('geolocationControl');
}

ymaps.ready(init);
