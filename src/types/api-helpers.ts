import type { paths } from "./api.ts";

/**
 * 🔹 Tipo genérico para pegar a resposta (content.application/json) de qualquer endpoint
 */
export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> =
  paths[Path][Method] extends {
    responses: {
      200: {
        content: {
          "application/json": infer T;
        };
      };
    };
  }
    ? T
    : never;

/**
 * 🔹 Tipo genérico para pegar o request body de qualquer endpoint
 */
export type ApiRequest<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> =
  paths[Path][Method] extends {
    requestBody: {
      content: {
        "application/json": infer T;
      };
    };
  }
    ? T
    : never;
