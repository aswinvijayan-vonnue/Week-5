type Route = {
  path: string;
  component: (params: Record<string, string>) => HTMLElement;
};

let routes: Route[];
type Navigate = (path: string, params?: Record<string, string>) => void;

const navigate: Navigate = (path, params) => {
  routes.forEach((route) => {
    if (route.path === path) route.component(params ? params : {});
  });
};
let target = 'https://example.com';
const params = {
  categoryName: 'home & garden/appliances',
  productId: '99',
};
navigate(target, params);
