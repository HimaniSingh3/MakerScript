/*
  MakerScript Magic Box
  Created by Himani Singh
  This is a sample generated output included with the project.
*/

const makerscript_magic_box = {
  title: 'MakerScript Magic Box',
  author: 'Himani Singh',
  features: [
    'Responsive UI helpers',
    'Copy to clipboard',
    'Download generated file'
  ],

  init() {
    console.log(`${this.title} by ${this.author}`);
    this.features.forEach((feature) => console.log(`- ${feature}`));
  }
};

makerscript_magic_box.init();
