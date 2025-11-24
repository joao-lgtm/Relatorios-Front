import { useEffect, type Dispatch, type SetStateAction } from "react";
import { api } from "../../../../Services/api";
import { useQuery } from "@tanstack/react-query";
import { CloseButton, ModalContent, ModalOverlay } from "./style";
import type { ApiResponse } from "../../../../types/api-helpers";
import FiltrosDinamicos from "../FiltrosDinamicos";

type Coluna = {
  coluna: string;
  tipo: "string" | "number" | "boolean" | "date";
};

interface ModalProps {
  relatorio?: string;
  colunas: Coluna[];
  setColunas: (cols: Coluna[]) => void;
  setConsulta: (data: any[]) => void;
  setPagination: (p: PaginationData) => void;
  closeModal: () => void;
  filtros?: Record<string, string>;
  setFiltros: Dispatch<SetStateAction<Record<string, string>>>;
}

type PaginationData = {
  pagina: number;
  tamanho: number;
  total_paginas: number;
  total_registros: number;
};

type ConsultarViewsResponse = ApiResponse<"/api/consultas/consultar/", "get">;
type ListaColunasResponse = ApiResponse<"/api/consultas/consultar-tipo-coluna/", "get">;

export function Modal({
  relatorio,
  colunas,
  setColunas,
  setConsulta,
  setPagination,
  closeModal,
  setFiltros,
  filtros
}: ModalProps) {
 

  const { data: colunasData = [] } = useQuery<Coluna[], Error>({
    queryKey: ["colunas", relatorio],
    queryFn: async () => {
      const response = await api.get<ListaColunasResponse>(
        `/consultas/consultar-tipo-coluna/`,
        {
          params: { nome: relatorio },
        }
      );

      return response.data.data.map((c) => ({
        coluna: c.coluna,
        tipo: c.tipo,
      }));
    },
    enabled: !!relatorio,
  });

  useEffect(() => {
    setColunas(colunasData);
  }, [colunasData]);

  const { refetch } = useQuery({
    queryKey: ["consulta-filtros", relatorio, filtros],
    queryFn: async () => {
      const response = await api.get<ConsultarViewsResponse>(
        `/consultas/consultar/`,
        {
          params: {
            nome: relatorio,
            filtros: JSON.stringify(filtros),
            pagina: 1,
            tamanho: 15,
          },
        }
      );

      return response.data;
    },
    enabled: false,
  });

  const handleBuscar = async () => {
    const { data } = await refetch();

    if (data?.data) {
      setConsulta(data.data.resultados);

      setPagination({
        pagina: data.data.pagina,
        tamanho: data.data.tamanho,
        total_paginas: data.data.total_paginas,
        total_registros: data.data.total_registros,
      });
    }

    closeModal();
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <FiltrosDinamicos
          colunas={colunas}
          filtros={filtros}
          setFiltros={setFiltros}
        />

        <CloseButton onClick={handleBuscar}>Buscar</CloseButton>
        <CloseButton onClick={closeModal}>Fechar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}
