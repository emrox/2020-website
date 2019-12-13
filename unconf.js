class StickyNavigation {
  constructor() {
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.navElements = document.querySelectorAll('nav a[href^="#"]');

    this.navElements.forEach((navElement) => {
      navElement.addEventListener('click', (event) => this.onTabClick(event));
    });

    this.onScroll();

    window.addEventListener('scroll', () => this.onScroll());
    window.addEventListener('resize', () => this.onResize());
  }

  onTabClick(event) {
    event.preventDefault();

    const targetArticle = document.querySelector(event.currentTarget.attributes.href.value);

    window.scrollTo({
      top: targetArticle.offsetTop - this.tabContainerHeight,
      behavior: 'smooth'
    });
  }

  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  onResize() {
    this.setSliderCss();
  }

  checkTabContainerPosition() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');

    if (header.getBoundingClientRect().bottom > 0) {
      nav.classList.remove('floating')
      header.classList.remove('floating-nav')
    } else {
      nav.classList.add('floating')
      header.classList.add('floating-nav')
    }
  }

  findCurrentTabSelector(element) {
    let currentNavElement;

    this.navElements.forEach((navElement) => {
      const idSelector = navElement.attributes.href.value;
      const article = document.querySelector(idSelector);

      if (article.getBoundingClientRect().top < this.tabContainerHeight + 10) {
        currentNavElement = navElement;
      }
    });

    const fakeTab = { href: '' };
    if ((this.currentTab || fakeTab).href !== (currentNavElement || fakeTab).href) {
      this.currentTab = currentNavElement;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    const sliderElement = document.querySelector('nav .slider');
    const tabDimensions = this.currentTab ? this.currentTab.getBoundingClientRect() : { width: 0, left: 0 };

    sliderElement.style.width = tabDimensions.width;
    sliderElement.style.left = tabDimensions.left;
  }
}

new StickyNavigation();

// map
const initialiseMap = () => {
  if (!mapboxgl) { window.setTimeout(100, initialiseMap()); return }

  mapboxgl.accessToken = 'pk.eyJ1IjoiZW1yb3giLCJhIjoiY2pvMzE4dnAzMHE3dzNrcGFuajdoa2duZSJ9.qiLN60PNBVjW4pivjwVtvQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [10.03, 53.56],
    zoom: 11
  });
  map.addControl(new mapboxgl.NavigationControl());
  map.setStyle('mapbox://styles/emrox/ck3wycjf73c2m1cll16jzxbuk');

  const markerElelemt = document.createElement('div');
  markerElelemt.className = 'map__marker';

  new mapboxgl.Marker(markerElelemt).setLngLat({ lng: 10.034110, lat: 53.569130 }).addTo(map);
}

window.setTimeout(100, initialiseMap());

