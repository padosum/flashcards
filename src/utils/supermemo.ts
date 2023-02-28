import { supermemo, type SuperMemoGrade } from 'supermemo';
import { TIME_ZONE } from '@/constants';
import type { Card } from '@/types/interfaces';

const practice = (flashcard: Card, grade: SuperMemoGrade): Card => {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);

  const now = new Date(Date.now() + TIME_ZONE);
  const dueDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + interval,
    now.getHours(),
    now.getMinutes()
  ).toISOString();

  return {
    ...flashcard,
    reviewDate: now.toISOString(),
    interval,
    repetition,
    efactor,
    dueDate,
  };
};

export { practice };
