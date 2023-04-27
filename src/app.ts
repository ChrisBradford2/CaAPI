const express = require('express');

const app = express();

app.use('/api/drinks', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { _id: string; name: string; description: string; imageUrl: string; price: number; userId: string; }[]): void; new(): any; }; }; }, next: any) => {
  const stuff = [
    {
      _id: '1',
      name: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: '2',
      name: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

module.exports = app;