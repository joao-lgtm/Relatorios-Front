import { InputComponent } from "../Input";
import { useEffect, useState } from "react";
import { api } from "../../Services/api";
import { useQuery } from "@tanstack/react-query";
import { CloseButton, ModalContent, ModalOverlay } from "./style";

type Coluna = {
  coluna: string;
  tipo: "string" | "number" | "boolean" | "date";
};

interface ModalProps {
  relatorio?: string;
  colunas: Coluna[];
  setColunas: (cols: Coluna[]) => void;
  setConsulta: (data: any[]) => void;
  closeModal: () => void;
}

export function Modal({ relatorio, colunas, setColunas, setConsulta, closeModal }: ModalProps) {
  const [filtros, setFiltros] = useState<Record<string, string>>({});

  const { data: colunasData = [] } = useQuery<Coluna[], Error>({
    queryKey: ["colunas", relatorio],
    queryFn: async () => {
      const response = await api.get(`/consultas/consultar-tipo-coluna/`, {
        params: { nome: relatorio },
      });
      return response.data.data.map((c: any) => ({
        coluna: c.coluna,
        tipo: c.tipo as "string" | "number" | "boolean" | "date",
      }));
    },
    enabled: !!relatorio,
    staleTime: 0,
  });

  useEffect(() => {
    setColunas(colunasData);
  }, [colunasData, setColunas]);

  const { refetch } = useQuery({
    queryKey: ["consulta", relatorio, filtros],
    queryFn: async () => {
      const response = await api.get(`/consultas/consultar/`, {
        params: {
          nome: relatorio,
          filtros: JSON.stringify(filtros),
        },
      });
      return response.data.data || [];
    },
    enabled: false,
  });

  const handleBuscar = async () => {
    const { data } = await refetch();
    setConsulta(data || []);
    closeModal();
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {colunas.map((filtro, index) => (
          <div key={index}>
            <h3>{filtro.coluna}</h3>
            <p>{filtro.tipo}</p>
            <InputComponent
              type={filtro.tipo}
              value={filtros[filtro.coluna] ?? ""}
              onChange={(valor: string) =>
                setFiltros(prev => ({ ...prev, [filtro.coluna]: valor }))
              }
            />
          </div>
        ))}
        <CloseButton onClick={handleBuscar}>Buscar</CloseButton>
        <CloseButton onClick={closeModal}>Fechar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}