import type { Schema } from "../CoreModelType";

// A blog platform schema — covers most relation types and field features
export const mockSchema: Schema = {
  name: "BlogPlatform",
  databaseType: "postgresql",
  version: "1.0.0",
  description:
    "A blog platform with users, posts, comments, tags, and profiles",

  // ==========================================================
  // ENUMS
  // ==========================================================
  enums: [
    {
      name: "Role",
      values: ["ADMIN", "EDITOR", "VIEWER"],
      description: "User permission level",
    },
    {
      name: "PostStatus",
      values: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      description: "Lifecycle state of a post",
    },
  ],

  // ==========================================================
  // MODELS
  // ==========================================================
  models: [
    // --------------------------------------------------------
    // User
    // --------------------------------------------------------
    {
      name: "User",
      tableName: "users",
      description: "Registered user of the platform",
      fields: [
        {
          name: "id",
          type: "UUID",
          isPrimary: true,
          isNullable: false,
          default: { kind: "function", fn: "uuid()" },
        },
        {
          name: "email",
          type: "String",
          length: 255,
          isUnique: true,
          isNullable: false,
        },
        {
          name: "username",
          type: "String",
          length: 50,
          isUnique: true,
          isNullable: false,
        },
        {
          name: "passwordHash",
          type: "String",
          length: 255,
          isNullable: false,
        },
        {
          name: "role",
          type: "Enum",
          enumName: "Role",
          isNullable: false,
          default: { kind: "literal", value: "VIEWER" },
        },
        {
          name: "createdAt",
          type: "Timestamp",
          isNullable: false,
          default: { kind: "function", fn: "now()" },
        },
        {
          name: "updatedAt",
          type: "Timestamp",
          isNullable: false,
          default: { kind: "function", fn: "now()" },
        },
      ],
      indexes: [
        { fields: ["email"], isUnique: true, type: "BTREE" },
        { fields: ["username"], isUnique: true, type: "BTREE" },
      ],
    },

    // --------------------------------------------------------
    // Profile  (one-to-one with User)
    // --------------------------------------------------------
    {
      name: "Profile",
      tableName: "profiles",
      description: "Extended public info for a user",
      fields: [
        {
          name: "id",
          type: "Int",
          isPrimary: true,
          isAutoIncrement: true,
          isNullable: false,
        },
        {
          name: "userId",
          type: "UUID",
          isNullable: false,
          isUnique: true,
          isForeignKey: true,
          references: { model: "User", field: "id" },
        },
        {
          name: "bio",
          type: "Text",
          isNullable: true,
        },
        {
          name: "avatarUrl",
          type: "String",
          length: 500,
          isNullable: true,
        },
        {
          name: "website",
          type: "String",
          length: 255,
          isNullable: true,
        },
      ],
      indexes: [],
    },

    // --------------------------------------------------------
    // Post
    // --------------------------------------------------------
    {
      name: "Post",
      tableName: "posts",
      fields: [
        {
          name: "id",
          type: "Int",
          isPrimary: true,
          isAutoIncrement: true,
          isNullable: false,
        },
        {
          name: "title",
          type: "String",
          length: 255,
          isNullable: false,
        },
        {
          name: "slug",
          type: "String",
          length: 255,
          isUnique: true,
          isNullable: false,
          description: "URL-friendly version of the title",
        },
        {
          name: "content",
          type: "Text",
          isNullable: false,
        },
        {
          name: "status",
          type: "Enum",
          enumName: "PostStatus",
          isNullable: false,
          default: { kind: "literal", value: "DRAFT" },
        },
        {
          name: "viewCount",
          type: "Int",
          isNullable: false,
          default: { kind: "literal", value: 0 },
        },
        {
          name: "authorId",
          type: "UUID",
          isNullable: false,
          isForeignKey: true,
          references: { model: "User", field: "id" },
        },
        {
          name: "publishedAt",
          type: "Timestamp",
          isNullable: true,
        },
        {
          name: "createdAt",
          type: "Timestamp",
          isNullable: false,
          default: { kind: "function", fn: "now()" },
        },
        {
          name: "updatedAt",
          type: "Timestamp",
          isNullable: false,
          default: { kind: "function", fn: "now()" },
        },
      ],
      indexes: [
        { fields: ["slug"], isUnique: true, type: "BTREE" },
        { fields: ["authorId"], isUnique: false, type: "BTREE" },
        { fields: ["status", "publishedAt"], isUnique: false, type: "BTREE" },
      ],
    },

    // --------------------------------------------------------
    // Comment
    // --------------------------------------------------------
    {
      name: "Comment",
      tableName: "comments",
      fields: [
        {
          name: "id",
          type: "Int",
          isPrimary: true,
          isAutoIncrement: true,
          isNullable: false,
        },
        {
          name: "content",
          type: "Text",
          isNullable: false,
        },
        {
          name: "postId",
          type: "Int",
          isNullable: false,
          isForeignKey: true,
          references: { model: "Post", field: "id" },
        },
        {
          name: "authorId",
          type: "UUID",
          isNullable: false,
          isForeignKey: true,
          references: { model: "User", field: "id" },
        },
        {
          name: "parentId",
          type: "Int",
          isNullable: true,
          isForeignKey: true,
          references: { model: "Comment", field: "id" },
          description:
            "Null = top-level comment, set = reply to another comment",
        },
        {
          name: "createdAt",
          type: "Timestamp",
          isNullable: false,
          default: { kind: "function", fn: "now()" },
        },
      ],
      indexes: [
        { fields: ["postId"], isUnique: false, type: "BTREE" },
        { fields: ["authorId"], isUnique: false, type: "BTREE" },
      ],
    },

    // --------------------------------------------------------
    // Tag
    // --------------------------------------------------------
    {
      name: "Tag",
      tableName: "tags",
      fields: [
        {
          name: "id",
          type: "Int",
          isPrimary: true,
          isAutoIncrement: true,
          isNullable: false,
        },
        {
          name: "name",
          type: "String",
          length: 50,
          isUnique: true,
          isNullable: false,
        },
        {
          name: "slug",
          type: "String",
          length: 50,
          isUnique: true,
          isNullable: false,
        },
      ],
      indexes: [{ fields: ["slug"], isUnique: true, type: "BTREE" }],
    },

    // --------------------------------------------------------
    // PostTag  (junction table for Post <-> Tag many-to-many)
    // --------------------------------------------------------
    {
      name: "PostTag",
      tableName: "post_tags",
      description: "Junction table for the many-to-many between Post and Tag",
      fields: [
        {
          name: "postId",
          type: "Int",
          isNullable: false,
          isForeignKey: true,
          references: { model: "Post", field: "id" },
        },
        {
          name: "tagId",
          type: "Int",
          isNullable: false,
          isForeignKey: true,
          references: { model: "Tag", field: "id" },
        },
        {
          name: "assignedAt",
          type: "Timestamp",
          isNullable: false,
          default: { kind: "function", fn: "now()" },
        },
      ],
      compositePrimaryKey: ["postId", "tagId"],
      indexes: [],
    },
  ],

  // ==========================================================
  // RELATIONS
  // ==========================================================
  relations: [
    // User --1:1-- Profile
    {
      name: "userProfile",
      fromModel: "Profile",
      fromField: "userId",
      toModel: "User",
      toField: "id",
      type: "one-to-one",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      isOptional: false,
    },

    // User --1:many-- Post
    {
      name: "userPosts",
      fromModel: "Post",
      fromField: "authorId",
      toModel: "User",
      toField: "id",
      type: "many-to-one",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      isOptional: false,
    },

    // Post --1:many-- Comment
    {
      name: "postComments",
      fromModel: "Comment",
      fromField: "postId",
      toModel: "Post",
      toField: "id",
      type: "many-to-one",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      isOptional: false,
    },

    // User --1:many-- Comment
    {
      name: "userComments",
      fromModel: "Comment",
      fromField: "authorId",
      toModel: "User",
      toField: "id",
      type: "many-to-one",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      isOptional: false,
    },

    // Comment --1:many-- Comment (self-referencing replies)
    {
      name: "commentReplies",
      fromModel: "Comment",
      fromField: "parentId",
      toModel: "Comment",
      toField: "id",
      type: "many-to-one",
      onDelete: "SET_NULL",
      onUpdate: "CASCADE",
      isOptional: true,
    },

    // PostTag.postId -> Post.id
    {
      name: "postTagPost",
      fromModel: "PostTag",
      fromField: "postId",
      toModel: "Post",
      toField: "id",
      type: "many-to-one",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      isOptional: false,
    },

    // PostTag.tagId -> Tag.id
    {
      name: "postTagTag",
      fromModel: "PostTag",
      fromField: "tagId",
      toModel: "Tag",
      toField: "id",
      type: "many-to-one",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      isOptional: false,
    },
  ],
};
