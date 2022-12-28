import { Paths } from './Paths'

export function checkExistPath(path: string) {
  return (Object.values(Paths) as string[]).includes(path);
}
