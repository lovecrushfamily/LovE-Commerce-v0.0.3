/* FullCalendar Types */
import { EventApi, EventInput } from '@fullcalendar/core';

/* Chart.js Types */
import { ChartData, ChartOptions } from 'chart.js';

type InventoryStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

type Status = 'DELIVERED' | 'PENDING' | 'RETURNED' | 'CANCELLED';

export type LayoutType = 'list' | 'grid';
export type SortOrderType = 1 | 0 | -1;

export interface CustomEvent {
    name?: string;
    status?: 'Ordered' | 'Processing' | 'Shipped' | 'Delivered';
    date?: string;
    color?: string;
    icon?: string;
    image?: string;
}


interface ShowOptions {
    severity?: string;
    content?: string;
    summary?: string;
    detail?: string;
    life?: number;
}

export interface ChartDataState {
    barData?: ChartData;
    pieData?: ChartData;
    lineData?: ChartData;
    polarData?: ChartData;
    radarData?: ChartData;
}
export interface ChartOptionsState {
    barOptions?: ChartOptions;
    pieOptions?: ChartOptions;
    lineOptions?: ChartOptions;
    polarOptions?: ChartOptions;
    radarOptions?: ChartOptions;
}

export interface AppMailProps {
    mails: Demo.Mail[];
}

export interface AppMailSidebarItem {
    label: string;
    icon: string;
    to?: string;
    badge?: number;
    badgeValue?: number;
}

export interface AppMailReplyProps {
    content: Demo.Mail | null;
    hide: () => void;
}

declare namespace Demo {
    interface Task {
        id?: number;
        name?: string;
        description?: string;
        completed?: boolean;
        status?: string;
        comments?: string;
        attachments?: string;
        members?: Member[];
        startDate?: string;
        endDate?: string;
    }

    interface Member {
        name: string;
        image: string;
    }

    interface DialogConfig {
        visible: boolean;
        header: string;
        newTask: boolean;
    }

    interface Mail {
        id: number;
        from: string;
        to: string;
        email: string;
        image: string;
        title: string;
        message: string;
        date: string;
        important: boolean;
        starred: boolean;
        trash: boolean;
        spam: boolean;
        archived: boolean;
        sent: boolean;
    }

    interface User {
        id: number;
        name: string;
        image: string;
        status: string;
        messages: Message[];
        lastSeen: string;
    }

    interface Message {
        text: string;
        ownerId: number;
        createdAt: number;
    }

    //ProductService
    type Product = {
        id?: string;
        code?: string;
        name: string;
        description: string;
        image?: string;
        price?: number;
        category?: string;
        quantity?: number;
        inventoryStatus?: InventoryStatus;
        rating?: number;
        orders?: ProductOrder[];
        [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
    };

    type ProductOrder = {
        id?: string;
        productCode?: string;
        date?: string;
        amount?: number;
        quantity?: number;
        customer?: string;
        status?: Status;
    };

    type Payment = {
        name: string;
        amount: number;
        paid: boolean;
        date: string;
    };

    //CustomerService
    type Customer = {
        id?: number;
        name?: string;
        country?: ICountryObject;
        company?: string;
        date: Date;
        status?: string;
        activity?: number;
        balance?: number | string;
        verified?: boolean;
        amount?: number;
        price?: number;
        rating?: number;
        image?: string;
        orders?: Demo.Customer[];
        inventoryStatus?: string;
        representative: {
            name: string;
            image: string;
        };
    };

    interface Event extends EventInput {
        location?: string;
        description?: string;
        tag?: {
            name: string;
            color: string;
        };
    }

    // PhotoService
    type Photo = {
        title: string;
        itemImageSrc?: string | undefined;
        thumbnailImageSrc?: string | undefined;
        alt?: string | undefined;
    };

    type Country = {
        name: string;
        code: string;
    };

    // IconService
    type Icon = {
        icon?: {
            paths?: string[];
            attrs?: [{}];
            isMulticolor?: boolean;
            isMulticolor2?: boolean;
            grid?: number;
            tags?: string[];
        };
        attrs?: [{}];
        properties?: {
            order?: number;
            id: number;
            name: string;
            prevSize?: number;
            code?: number;
        };
        setIdx?: number;
        setId?: number;
        iconIdx?: number;
    };
}

export declare namespace Admin {
    type Category = {
        category_id: number;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
    }

    type Account = {
        account_id: number;
        user_name: string;
        password: string;
        email: string;
        online: 'on' | 'off';
        status: 'verify' | 'suspend';
        created_at: string;
        updated_at: string;
    }

    type Customer = {
        customer_id: number;
        customer_name: string;
        gender: 'male' | 'female' | 'other';
        phone: string;
        avatar: string | null;
        date_of_birth: string | null;
        nationality: string | null;
        address: string | null;
        created_at: string;
        updated_at: string;
    }

    type Feedback = {
        account_id: number;
        rating: number;
        content: string;
        created_at: string;
    }

    type Shop = {
        shop_id: number;
        shop_name: string;
        description: string | null;
        address: string;
        phone_no: string;
        image: string | null;
        rating: number | null;
        status: 'pending' | 'verify' | 'suspend' | 'banned';
        created_at: string;
        updated_at: string;
        seller_id: number | null;
    }

    type Product = {
        product_id: number;
        product_name: string;
        description: string | null;
        traits: string | null;
        stock: number;
        sale_off: number;
        price: number;
        images: string | null;
        status: 'pending' | 'sold-out';
        rating: number | null;
        category_id: number | null;
        shop_id: number | null;
        created_at: string;
        updated_at: string;
    }

    type Wishlist = {
        customer_id: number;
        product_id: number;
        quantity: number;
        created_at: string;
        updated_at: string;
    }

    type Review = {
        product_id: number;
        customer_id: number;
        rating: number;
        comment: string | null;
        liked: boolean;
        images: string | null;
        shop_reply: string | null;
        created_at: string;
        updated_at: string;
    }

    type Coupon = {
        coupon_id: number;
        coupon_name: string;
        discount: number;
        min_amount: number;
        max_amount: number;
        limit: number | null;
        image: string | null;
        start_day: string;
        end_day: string;
        created_at: string;
        updated_at: string;
    }

    type Order = {
        order_id: number;
        account_id: number;
        total_amount: number;
        status: 'pending' | 'delivery' | 'shipping';
        address: string;
        payment: string | null;
        coupon_id: number | null;
        created_at: string;
        updated_at: string;
    }

    type Delivery = {
        delivery_id: number;
        name: string;
        cost: number;
        category_id: number | null;
        description: string | null;
        created_at: string;
        updated_at: string;
    }

    type Voucher = {
        voucher_id: number;
        voucher_name: string;
        discount: number;
        min_amount: number;
        limit: number | null;
        delivery_id: number;
        start_day: string;
        end_day: string;
        created_at: string;
        updated_at: string;
    }

    type Item = {
        item_id: number;
        product_id: number;
        order_id: number;
        delivery_id: number | null;
        quantity: number;
        price: number;
        status: 'pending' | 'Approve' | 'Prepare' | 'Export';
        discount: number | null;
        payment: string | null;
        note: string | null;
    }

    interface AppMenuItem {
        label: string;
        icon?: string;
        to?: string;
        items?: AppMenuItem[];
        badge?: string;
        badgeClass?: string;
        class?: string;
        target?: string;
        separator?: boolean;
        disabled?: boolean;
        visible?: boolean;
    }
}
