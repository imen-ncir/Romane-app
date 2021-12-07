import pushid from 'unique-push-id';

export const newId = (): string => {
  return pushid();
};
