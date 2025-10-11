#!/bin/bash
cd public/gallery/photos-3
i=1
for f in $(ls -1 | grep -v images | sort); do
  num=$(printf "%03d" $i)
  if [ $i -eq 1 ]; then
    cp "$f" "hero.jpeg"
  fi
  cp "$f" "images/${num}.jpeg"
  i=$((i+1))
done
echo "Renamed $((i-1)) images"
ls images/ | head -5
