'use client';

const preventBodyScroll = (preventScroll: boolean) => {
  const body = document.querySelector('body');
  if (body) body.style.overflow = preventScroll ? 'hidden' : 'auto';
};

export default preventBodyScroll;
