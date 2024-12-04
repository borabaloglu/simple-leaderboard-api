import { Transform } from 'class-transformer';

const transformWrapper = (value: any, callback: (value: string) => any) => {
  if (typeof value === 'string') {
    return callback(value);
  }
  return value;
};

export function Trim(): PropertyDecorator {
  return Transform(({ value }: { value: string }) => transformWrapper(value, (value) => value.trim()));
}
