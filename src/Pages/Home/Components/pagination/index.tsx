export function Pagination({ pagination, setPagination }: any) {
  return (
    <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
      <button
        disabled={pagination.pagina <= 1}
        onClick={() =>
          setPagination((p: any) => ({ ...p, pagina: p.pagina - 1 }))
        }
      >
        ← Anterior
      </button>

      <span>
        Página {pagination.pagina} de {pagination.total_paginas}
      </span>

      <button
        disabled={pagination.pagina >= pagination.total_paginas}
        onClick={() =>
          setPagination((p: any) => ({ ...p, pagina: p.pagina + 1 }))
        }
      >
        Próxima →
      </button>
    </div>
  );
}
