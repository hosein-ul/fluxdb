import type { FluxSchema } from "@fluxdb/schema-types";

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  schema: FluxSchema;
}

export const SCHEMA_TEMPLATES: TemplateDefinition[] = [
  {
    id: "ecommerce-storefront",
    name: "Modern E-Commerce",
    description: "Multi-tenant storefront with users, products, categories, orders, and payment tracking.",
    icon: "ShoppingBag",
    schema: {
      version: 1,
      tables: [
        {
          id: "tbl-users",
          name: "users",
          color: "cobalt",
          position: { x: 80, y: 100 },
          columns: [
            { id: "col-u-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-u-email", name: "email", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
            { id: "col-u-name", name: "full_name", type: "text", constraints: [] },
            { id: "col-u-role", name: "role", type: "enum", constraints: ["NOT_NULL"], defaultValue: "'customer'" },
            { id: "col-u-created", name: "created_at", type: "timestamptz", constraints: ["NOT_NULL"], defaultValue: "now()" },
          ],
        },
        {
          id: "tbl-orders",
          name: "orders",
          color: "emerald",
          position: { x: 420, y: 100 },
          columns: [
            { id: "col-o-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-o-user", name: "user_id", type: "uuid", constraints: ["NOT_NULL"] },
            { id: "col-o-status", name: "status", type: "enum", constraints: ["NOT_NULL"], defaultValue: "'pending'" },
            { id: "col-o-total", name: "total_amount", type: "decimal", constraints: ["NOT_NULL"] },
            { id: "col-o-created", name: "created_at", type: "timestamptz", constraints: ["NOT_NULL"], defaultValue: "now()" },
          ],
        },
        {
          id: "tbl-order-items",
          name: "order_items",
          color: "amber",
          position: { x: 760, y: 120 },
          columns: [
            { id: "col-oi-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-oi-order", name: "order_id", type: "uuid", constraints: ["NOT_NULL"] },
            { id: "col-oi-product", name: "product_id", type: "uuid", constraints: ["NOT_NULL"] },
            { id: "col-oi-quantity", name: "quantity", type: "integer", constraints: ["NOT_NULL"], defaultValue: "1" },
            { id: "col-oi-price", name: "unit_price", type: "decimal", constraints: ["NOT_NULL"] },
          ],
        },
        {
          id: "tbl-products",
          name: "products",
          color: "cyan",
          position: { x: 420, y: 440 },
          columns: [
            { id: "col-p-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-p-title", name: "title", type: "varchar", constraints: ["NOT_NULL"] },
            { id: "col-p-sku", name: "sku", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
            { id: "col-p-price", name: "price", type: "decimal", constraints: ["NOT_NULL"] },
            { id: "col-p-stock", name: "stock_quantity", type: "integer", constraints: ["NOT_NULL"], defaultValue: "0" },
            { id: "col-p-cat", name: "category_id", type: "uuid", constraints: [] },
          ],
        },
        {
          id: "tbl-categories",
          name: "categories",
          color: "violet",
          position: { x: 80, y: 440 },
          columns: [
            { id: "col-c-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-c-name", name: "name", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
            { id: "col-c-slug", name: "slug", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
          ],
        },
      ],
      relations: [
        {
          id: "rel-u-o",
          fromTableId: "tbl-orders",
          fromColumnId: "col-o-user",
          toTableId: "tbl-users",
          toColumnId: "col-u-id",
          type: "1:N",
          label: "places",
        },
        {
          id: "rel-o-oi",
          fromTableId: "tbl-order-items",
          fromColumnId: "col-oi-order",
          toTableId: "tbl-orders",
          toColumnId: "col-o-id",
          type: "1:N",
          label: "contains",
        },
        {
          id: "rel-p-oi",
          fromTableId: "tbl-order-items",
          fromColumnId: "col-oi-product",
          toTableId: "tbl-products",
          toColumnId: "col-p-id",
          type: "1:N",
          label: "item_of",
        },
        {
          id: "rel-c-p",
          fromTableId: "tbl-products",
          fromColumnId: "col-p-cat",
          toTableId: "tbl-categories",
          toColumnId: "col-c-id",
          type: "1:N",
          label: "categorized_in",
        },
      ],
    },
  },
  {
    id: "saas-subscription",
    name: "SaaS & Subscriptions",
    description: "Enterprise multi-tenant organizations, memberships, invitations, and billing subscriptions.",
    icon: "ShieldCheck",
    schema: {
      version: 1,
      tables: [
        {
          id: "tbl-orgs",
          name: "organizations",
          color: "cobalt",
          position: { x: 100, y: 120 },
          columns: [
            { id: "col-org-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-org-name", name: "name", type: "varchar", constraints: ["NOT_NULL"] },
            { id: "col-org-slug", name: "slug", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
            { id: "col-org-plan", name: "billing_plan", type: "varchar", constraints: ["NOT_NULL"], defaultValue: "'free'" },
            { id: "col-org-created", name: "created_at", type: "timestamptz", constraints: ["NOT_NULL"], defaultValue: "now()" },
          ],
        },
        {
          id: "tbl-members",
          name: "memberships",
          color: "rose",
          position: { x: 480, y: 120 },
          columns: [
            { id: "col-m-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-m-org", name: "org_id", type: "uuid", constraints: ["NOT_NULL"] },
            { id: "col-m-user", name: "user_id", type: "uuid", constraints: ["NOT_NULL"] },
            { id: "col-m-role", name: "role", type: "enum", constraints: ["NOT_NULL"], defaultValue: "'member'" },
          ],
        },
        {
          id: "tbl-api-keys",
          name: "api_keys",
          color: "amber",
          position: { x: 100, y: 440 },
          columns: [
            { id: "col-k-id", name: "id", type: "uuid", constraints: ["PRIMARY_KEY", "NOT_NULL"] },
            { id: "col-k-org", name: "org_id", type: "uuid", constraints: ["NOT_NULL"] },
            { id: "col-k-key", name: "key_hash", type: "varchar", constraints: ["UNIQUE", "NOT_NULL"] },
            { id: "col-k-name", name: "name", type: "varchar", constraints: ["NOT_NULL"] },
            { id: "col-k-expires", name: "expires_at", type: "timestamptz", constraints: [] },
          ],
        },
      ],
      relations: [
        {
          id: "rel-org-m",
          fromTableId: "tbl-members",
          fromColumnId: "col-m-org",
          toTableId: "tbl-orgs",
          toColumnId: "col-org-id",
          type: "1:N",
          label: "belongs_to",
        },
        {
          id: "rel-org-k",
          fromTableId: "tbl-api-keys",
          fromColumnId: "col-k-org",
          toTableId: "tbl-orgs",
          toColumnId: "col-org-id",
          type: "1:N",
          label: "owns",
        },
      ],
    },
  },
];
