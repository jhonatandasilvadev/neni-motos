import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    brand: {
      50: 'var(--brand-50, #fbf1e5)',
      100: 'var(--brand-100, #f4e0c2)',
      200: 'var(--brand-200, #e9c29b)',
      300: 'var(--brand-300, #d8a56f)',
      400: 'var(--brand-400, #c48342)',
      500: 'var(--brand-500, #ad6826)',
      600: 'var(--brand-600, #8f5222)',
      700: 'var(--brand-700, #6d3d1a)',
      800: 'var(--brand-800, #4b2910)',
      900: 'var(--brand-900, #2f1808)',
    },
    surface: {
      50: '#f5f5f5',
      100: '#e8e8e8',
      200: '#d0d0d0',
      300: '#b4b4b4',
      400: '#8f8f8f',
      500: '#6f6f6f',
      600: '#4f4f4f',
      700: '#333333',
      800: '#1f1f1f',
      900: '#111111',
    },
  },
  semanticTokens: {
    colors: {
      bodyBg: {
        default: 'surface.50',
        _dark: 'surface.900',
      },
      cardBg: {
        default: 'white',
        _dark: 'surface.800',
      },
      primaryText: {
        default: 'gray.900',
        _dark: 'whiteAlpha.900',
      },
      secondaryText: {
        default: 'gray.600',
        _dark: 'whiteAlpha.700',
      },
      border: {
        default: 'gray.200',
        _dark: 'whiteAlpha.100',
      },
      surfaceBorder: {
        default: 'gray.200',
        _dark: 'whiteAlpha.100',
      },
    },
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        bg: mode('#f5f5f5', '#111111')(props),
        color: mode('gray.900', 'whiteAlpha.900')(props),
        minHeight: '100vh',
        lineHeight: '1.6',
        WebkitFontSmoothing: 'antialiased',
      },
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      a: {
        color: mode('brand.700', 'brand.300')(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
      },
      variants: {
        solid: (props: Record<string, any>) => ({
          bg: 'var(--brand-primary, var(--brand-500, #ad6826))',
          color: mode('gray.900', 'whiteAlpha.900')(props),
          _hover: {
            bg: 'var(--brand-primary-hover, var(--brand-400, #c48342))',
          },
        }),
        outline: (props: Record<string, any>) => ({
          borderColor: 'var(--brand-primary, var(--brand-500, #ad6826))',
          color: 'var(--brand-primary, var(--brand-500, #ad6826))',
          _hover: {
            bg: mode('gray.50', 'whiteAlpha.100')(props),
          },
        }),
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      baseStyle: (props: Record<string, any>) => ({
        field: {
          bg: mode('white', 'surface.900')(props),
          color: mode('gray.900', 'whiteAlpha.900')(props),
        },
      }),
    },
    Select: {
      baseStyle: (props: Record<string, any>) => ({
        field: {
          bg: mode('white', 'surface.900')(props),
          color: mode('gray.900', 'whiteAlpha.900')(props),
        },
      }),
    },
  },
})

export default theme
