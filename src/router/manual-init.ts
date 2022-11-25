import { B_Router } from './b-router';
import { routerDomain } from './domain';
import { R_Structure } from './types';

export const manualInitRouter = routerDomain.createEffect((structure: R_Structure) => {
  try {
    const router = new B_Router(structure);
    return router;
  } catch (error) {
    throw new Error('Incorrect structure! Check your application structure.');
  }
});
