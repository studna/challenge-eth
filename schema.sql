-- Adminer 4.7.1 PostgreSQL dump

DROP TABLE IF EXISTS "token_transfers";
CREATE TABLE "public"."token_transfers" (
    "token_address" character varying(42) NOT NULL,
    "from_address" character varying(42) NOT NULL,
    "to_address" character varying(42) NOT NULL,
    "value" numeric(128,20) NOT NULL,
    "transaction_hash" character varying NOT NULL,
    "log_index" bigint NOT NULL,
    "block_timestamp" timestamp NOT NULL,
    "block_number" bigint NOT NULL,
    "block_hash" character varying(66) NOT NULL
) WITH (oids = false);

CREATE INDEX "token_transfers_from_address_idx" ON "public"."token_transfers" USING btree ("from_address");

CREATE INDEX "token_transfers_to_address_idx" ON "public"."token_transfers" USING btree ("to_address");

CREATE INDEX "token_transfers_transaction_hash_idx" ON "public"."token_transfers" USING btree ("transaction_hash");


DROP TABLE IF EXISTS "tokens";
CREATE TABLE "public"."tokens" (
    "address" character varying(42) NOT NULL,
    "symbol" text,
    "name" text,
    "decimals" smallint DEFAULT '0',
    "total_supply" numeric(128,0) DEFAULT '0',
    CONSTRAINT "tokens_address" PRIMARY KEY ("address")
) WITH (oids = false);


-- 2019-08-27 20:00:58.540865+00