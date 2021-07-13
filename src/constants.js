import Constants from "expo-constants";

export const URLS = {
  // public URLs
  help: "ayuda",
  // && only logged out
  landing: "landing",
  formCompany: "formulario-companias",
  index: "",

  login: "entrar",
  signup: "registro",
  reset: "recuperar-contraseña",

  // only logged in
  home: "inicio",
  summary: "resumen",
  profile: "perfil",
  product: "productos",
  profileData: "datos-de-perfil",
  category: "categoria",
  cart: "carrito",
  logout: "cerrar-sesion",
  settings: "configuracion",
  profile: "perfil",
  orders: "pedidos",
  datailsOrders: "pedidos-detalles",
  history: "historial",
  details: "detalles",
  detailsHistory: "historial-detalles",
  paymentGateway: "pasarela-de-pago",
  changePassword: "cambiar-contraseña",
  // errors
  notFound: "404",
};

export const ENDPOINTS = {

  signIn: '/auth',
  recoverPassword: '/auth_recovery_pass',
  signUp: '/users',
  profile: '/profile',
  products: '/product_by_filter',
  sellers: '',
  categories: (categoryId) => `category${categoryId ? `/${categoryId}` : ''}`,
  productsById: productId => `product/${productId}`,
  userProfile: (userId) => `/profile/${userId}`

}

export const ROLES = {
  buyer: "COMPRADOR"
}

export const SEO_TITLES = {
  landing: "Tu Kitchen",
};

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const DEFAULT_API_URL = process.env.EXPO_TUKITCHEN_CORE_API_URL || "https://api.vorazkitchen.cl/";
export const DEFAULT_API_GOOGLE_MAPS = process.env.EXPO_API_GOOGLE_MAPS || "AIzaSyAkQXpukXTieZJnQxiiG2HTcyiBDe42GY8";
export const ENV = Constants.manifest.extra;
export const REFETCH_INTERVAL = process.env.EXPO_REFETCH_INTERVAL || 5000;
export const DEBUG_GATEWAY = process.env.EXPO_DEBUG_GATEWAY
