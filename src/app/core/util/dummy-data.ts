const lorem = 'Lorem ipsum dolor sit amet,rum.';

const images = [
  'bandit',
  'batmobile',
  'blues-brothers',
  'bueller',
  'delorean',
  'eleanor',
  'general-lee',
  'ghostbusters',
  'knight-rider',
  'mirth-mobile',
];

const latLong = [
  { lat: 7.054035, long: 125.572535 },
  { lat: 7.051171, long: 125.570691 },
  { lat: 7.050143, long: 125.571288 },
  { lat: 7.050606, long: 125.572522 },
  { lat: 7.051772, long: 125.573359 },
  { lat: 7.053353, long: 125.574191 },
  { lat: 7.051788, long: 125.573359 },
  { lat: 7.053428, long: 125.571669 },
  { lat: 7.052704, long: 125.568889 },
  { lat: 7.050830, long: 125.568654 },
]


let rotateImg = 0;

export const getDataShopsList = (): Array<any[]> => {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      id: i + 3,
      name: images[rotateImg],
      location: latLong[i],
      content: lorem.substring(0, Math.random() * (lorem.length - 100) + 100),
      iconUrl: {
        url: 'assets/images/svg/guage.svg',
        scaledSize: {
          height: 50,
          width: 40
        }
      }
    });

    rotateImg++;
    if (rotateImg === images.length) {
      rotateImg = 0;
    }
  }
  return items;
}

