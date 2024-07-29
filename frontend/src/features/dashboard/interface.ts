import * as Icons from '../../icons'

type IconName = keyof typeof Icons;
type Routes = { path: string; name: string; icon?: string }
export interface Route {
    name: string;
    path?: string;
    icon: IconName;
    routes?: Routes[];
}

export interface IconProps {
    icon: keyof typeof Icons; // Icons のキーを型として指定
    [key: string]: string;
}

export interface SidebarSubmenuProps {
    route: Route;
}

export interface WidgeContents {
    title: string;
    content: string;
}

export interface MapPoint {
    latitude: number;
    longitude: number;
}
