declare class AuthScopes {
    static SCOPE_DELIMITER: string;
    private compressedScopes;
    private expandedScopes;
    constructor(scopes: string | string[]);
    has(scope: string | string[] | AuthScopes): boolean;
    equals(otherScopes: string | string[] | AuthScopes): boolean;
    toString(): string;
    toArray(): string[];
    private getImpliedScopes;
}
export { AuthScopes };
//# sourceMappingURL=index.d.ts.map