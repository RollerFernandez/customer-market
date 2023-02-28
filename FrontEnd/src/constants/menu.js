import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn, Mail, Bookmark, Book,UserCheck
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Customer', icon: UserCheck, type: 'sub', active: false, children: [
            {
                title: 'Register',path: '/Customer/register', type: 'sub',type: 'link', active: false
            },
            {   
                title: 'List',path: '/Customer/list', type: 'sub',type: 'link', active: false,
            }
        ]
    }
]
