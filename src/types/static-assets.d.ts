declare module '*.png' {
  import type { StaticImageData } from 'next/image';

  // Create a type that behaves as StaticImageData and can be used as a string.
  // It defines a toString() method, so when used in contexts like URL templates,
  // the string value (`src`) is returned.
  type ExtendedStaticImageData = StaticImageData & {
    toString(): string;
  };

  const value: ExtendedStaticImageData;
  export default value;
}
