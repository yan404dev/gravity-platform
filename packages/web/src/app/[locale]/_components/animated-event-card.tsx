"use client";

import React, { memo } from 'react';
import { Event } from '../_types/event';
import { EventCard } from './event-card';

interface AnimatedEventCardProps {
  event: Event;
  index: number;
}

export const AnimatedEventCard = memo(({ event, index }: AnimatedEventCardProps) => (
  <div
    className="animate-fade-in"
    style={{ animationDelay: `${1.0 + (index * 0.1)}s`, animationFillMode: 'both' }}
  >
    <EventCard event={event} />
  </div>
));

AnimatedEventCard.displayName = 'AnimatedEventCard';
