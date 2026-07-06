'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const copy = () => {
  const [source, dest] = process.argv.slice(2);

  if (!source || !dest) {
    console.error(
      'Please specify path the source and the destination file path.',
    );

    throw new Error(
      'Please specify path the source and the destination file path.',
    );
  }

  const sourcePath = path.resolve(source);
  const destPath = path.resolve(dest);

  if (!fs.existsSync(sourcePath)) {
    console.error('File not found');

    throw new Error('File not found');
  }

  const statSource = fs.statSync(sourcePath);

  if (statSource.isDirectory()) {
    console.error('Copying directories is not allowed');

    throw new Error('Copying directories is not allowed');
  }

  try {
    if (sourcePath === destPath) {
      return;
    }

    if (fs.existsSync(destPath)) {
      const statDest = fs.statSync(destPath);

      if (statDest.isDirectory()) {
        console.error(
          'Please check path an attempt to copy a directory is recorded',
        );

        return;
      }
    }

    fs.cpSync(sourcePath, destPath, { force: true });

    return 'Successfully copied';
  } catch (err) {
    console.error(err.message);

    throw new Error(err.message);
  }
};

copy();
