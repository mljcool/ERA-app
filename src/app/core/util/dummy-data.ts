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

function getImgSrc() {
  const src =
    'https://dummyimage.com/600x400/${Math.round( Math.random() * 99999)}/fff.png';
  rotateImg++;
  if (rotateImg === images.length) {
    rotateImg = 0;
  }
  return src;
}

let rotateImg = 0;

export const getDataShopsList = (): Array<any[]> => {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      name: images[rotateImg],
      imgSrc: getImgSrc(),
      avatarSrc: getImgSrc(),
      content: lorem.substring(0, Math.random() * (lorem.length - 100) + 100),
    });

    rotateImg++;
    if (rotateImg === images.length) {
      rotateImg = 0;
    }
  }
  return items;
}