const mapping: Record<string, string> = {
  administrators: 'administrator',
  contents: 'content',
  'content-managers': 'content_manager',
  subscribers: 'subscriber',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
