export interface PayinInterface {
    linkUrl:                   string;
    paymentRedirectUrl:                   string;
    cashInNoveltyUuid:         string;
    cashInNoveltyDetailUuid:   string;
    notificationMethodsResult: NotificationMethodsResult;
}

export interface NotificationMethodsResult {
    EMAIL:  string;
    ONLINE: string;
}
