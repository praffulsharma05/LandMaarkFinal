const fs = require('fs');
const path = require('path');

const files = [
  'src/Screen/Wishlist/Wishlist.tsx',
  'src/Screen/Searching2/PropertyFilter2.tsx',
  'src/Screen/Searching2/PropertyCards2.tsx',
  'src/Screen/Seaching/PropertyFilters.tsx',
  'src/Screen/Seaching/PropertySearch.tsx',
  'src/Screen/Seaching/PropertyCards.tsx',
  'src/Screen/Navbar/Navbar.tsx',
  'src/Screen/Home/Home.tsx',
  'src/Screen/Footer/Footer.tsx',
  'src/Screen/Home/components/EnquiryFormSection.tsx',
  'src/Components/Wishlist/WishlistCard.tsx',
  'src/Components/TownShip/TownshipCard.tsx',
  'src/Components/property/AmenitiesSpecs.tsx',
  'src/Components/property/CardsDetails/PropertyListingsTable.tsx',
  'src/Components/property/PropertyTabs.tsx',
  'src/Components/property/CardsDetails/PropertyListings.tsx',
  'src/Components/property/ImageGallery.tsx',
  'src/Components/property/Overview/NearbyPlaces.tsx',
  'src/Components/property/CardsDetails/PropertyFilters.tsx',
  'src/Components/ImageGalleryModal/ImageGalleryModal.tsx'
];

for (const file of files) {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let nonCommentNonBlank = 0;
    let insideBlockComment = false;

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      if (insideBlockComment) {
        if (line.includes('*/')) {
          insideBlockComment = false;
        }
        continue;
      }

      if (line.startsWith('/*')) {
        if (!line.includes('*/')) {
          insideBlockComment = true;
        }
        continue;
      }

      if (line.startsWith('//') || line.startsWith('*')) {
        continue;
      }

      nonCommentNonBlank++;
    }

    console.log(`${file}: Total Lines = ${lines.length}, Non-empty/non-comment = ${nonCommentNonBlank}`);
  } else {
    console.log(`${file}: NOT FOUND`);
  }
}
