import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
export const DbNull = runtime.objectEnumValues.instances.DbNull;
export const JsonNull = runtime.objectEnumValues.instances.JsonNull;
export const AnyNull = runtime.objectEnumValues.instances.AnyNull;
export const ModelName = {
    User: 'User',
    Genre: 'Genre',
    Book: 'Book',
    Review: 'Review'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt'
};
export const GenreScalarFieldEnum = {
    id: 'id',
    name: 'name'
};
export const BookScalarFieldEnum = {
    id: 'id',
    title: 'title',
    author: 'author',
    publishedYear: 'publishedYear',
    genreId: 'genreId',
    createdAt: 'createdAt'
};
export const ReviewScalarFieldEnum = {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    bookId: 'bookId',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map