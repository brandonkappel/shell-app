// Registry of remote apps the shell knows how to mount.
// In production these URLs point at the platform's own domain,
// e.g. https://summit-platform.summitcreditunion.io/assets/app-one/remoteEntry.js
// which CloudFront routes to that app's S3 bucket (see README).
export interface RemoteAppDefinition {
  label: string;
  url: string;
}

export const APP_REGISTRY: Record<string, RemoteAppDefinition> = {
  'app-one': {
    label: 'App One',
    url:
      import.meta.env.VITE_APP_ONE_URL ??
      'http://localhost:5174/src/remoteEntry.ts',
  },
  'app-two': {
    label: 'App Two',
    url:
      import.meta.env.VITE_APP_TWO_URL ??
      'http://localhost:5175/src/remoteEntry.ts',
  },
};
