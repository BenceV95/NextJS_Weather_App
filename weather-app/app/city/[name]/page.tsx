"use client";

import { useParams } from 'next/navigation';

export default function CityName() {
  const params = useParams();
  const cityName = params.name;

  return (
    <div>
      <p>City: <strong>{cityName}</strong></p>
    </div>
  );
}
