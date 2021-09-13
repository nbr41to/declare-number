import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from 'styled-components';

const theme = {
  colors: {},
  mixins: {
    box: () => css`
      border: 1px solid #444;
      border-radius: 8px;
      padding: 8px;
      margin: 8px;
    `,
  },
  media: {
    sp: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ): FlattenSimpleInterpolation => css`
      @media (max-width: 768px) {
        ${css(first, ...interpolations)}
      }
    `,
  },
} as const;

type AppTheme = typeof theme;

// declare module 'styled-components' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   type DefaultTheme = {} & AppTheme;
// }

export { theme };
