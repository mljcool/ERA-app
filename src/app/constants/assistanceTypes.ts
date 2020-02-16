const srcPath = (imgName): string => `./assets/images/commons/${imgName}.png`;


export const assistTanceList: AssistanceTypes[] = [
  {
    id: 1,
    label: 'Wheels and Tires',
    imgSrc: srcPath('flatTire')
  },
  {
    id: 2,
    label: 'Battery Inspection (Jump Start)',
    imgSrc: srcPath('deadbattery')
  },
  {
    id: 3,
    label: 'Overheating',
    imgSrc: srcPath('overheat')
  },
  {
    id: 4,
    label: 'Engine Inspection',
    imgSrc: srcPath('motor')
  },
  {
    id: 5,
    label: 'Towing',
    imgSrc: srcPath('flatTire')
  },
  {
    id: 6,
    label: 'Vehicle Lockout',
    imgSrc: srcPath('lockout')
  },
  {
    id: 7,
    label: 'Fuel Delivery',
    imgSrc: srcPath('fuel')
  },
  {
    id: 8,
    label: 'General Inspection',
    imgSrc: srcPath('generalInspection')
  }
];
