/**
 *
 */
export interface MoviePickRepo {
  getByFirstLetter: (firstLetter: string) => Promise<string | null>;
  getAll: () => Promise<{} | undefined>;
  put: (title: string) => Promise<void>;
}