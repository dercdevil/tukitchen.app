import * as auth from "./services/Auth";
import * as categories from "./services/Categories";
import * as gateway from "./services/Gateway";
import * as orders from "./services/Orders";
import * as users from "./services/Users";
import * as coupons from "./services/Coupons";
import * as products from "./services/Products";
import * as base from "./base";

export default {
    auth,
    categories,
    coupons,
    gateway,
    orders,
    users,
    products,
    ...base
};
