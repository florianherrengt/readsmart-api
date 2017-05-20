CREATE TABLE "public"."posts" (
    "id" serial,
    "type" text,
    "title" text,
    "text" text,
    "url" text,
    "image" text,
    "created_at" Date,
    PRIMARY KEY ("id")
);
