import { OnlineAccessInfo } from '../oauth/types';
import { SessionInterface } from './types';
/**
 * Stores App information from logged in merchants so they can make authenticated requests to the Admin API.
 */
declare class Session implements SessionInterface {
    readonly id: string;
    static cloneSession(session: Session, newId: string): Session;
    shop: string;
    state: string;
    scope: string;
    expires?: Date;
    isOnline?: boolean;
    accessToken?: string;
    onlineAccessInfo?: OnlineAccessInfo;
    constructor(id: string);
    isActive(): boolean;
}
export { Session };
//# sourceMappingURL=session.d.ts.map