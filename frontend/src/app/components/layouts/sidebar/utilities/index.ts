import { IconProps } from '../../../../../features/dashboard/interface';
import * as Icons from '../../../../../icons';
export const Icon = ({ icon }: IconProps) => {
    const SvgIcon = Icons[icon];
    if (!SvgIcon) {
        return null; // or throw an error
    }
};
