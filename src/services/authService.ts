// Stubbed auth service standing in for real Entra ID integration.
// Swap the internals of these two functions for your MSAL/Entra ID
// token acquisition and sign-out logic - the mount contract passed
// to remote apps (see RemoteAppView.vue) doesn't need to change.
export async function getAccessToken(): Promise<string> {
  return 'poc-mock-access-token';
}

export async function signOut(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('signOut() called - wire this up to real Entra ID sign-out.');
}
