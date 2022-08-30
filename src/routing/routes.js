import AdminPage from "../pages/AdminPage/AdminPage"
import Auth from "../pages/Auth/Auth"
import BasketPage from "../pages/BasketPage/BasketPage"
import DevicePage from "../pages/DevicePage/DevicePage"
import Main from "../pages/Main/Main"
import PersonalAccount from "../pages/PersonalAccount/PersonalAccount";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    LK_ROUTE,
    CONTACT_ROUTE,
    CATALOGUE_ROUTE,
    DIALOG_ROUTE
} from "../utils/consts"
import Contacts from "../pages/Contacts/Contacts";
import CataloguePage from "../pages/cataloguePage/cataloguePage";
import DialogPage from "../pages/DialogPage/DialogPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Element: <AdminPage />
    },
    {
        path: BASKET_ROUTE,
        Element: <BasketPage />
    },
    {
        path: LK_ROUTE,
        Element: <PersonalAccount/>
    },
    {
        path: DIALOG_ROUTE + '/:id',
        Element: <DialogPage />
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Element: <Main />
    },
    {
        path: LOGIN_ROUTE,
        Element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Element: <Auth />
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Element: <DevicePage />
    },
    {
        path: CONTACT_ROUTE,
        Element: <Contacts/>
    },
    {
        path: CATALOGUE_ROUTE+'/:typeId',
        Element: <CataloguePage />
    }
]